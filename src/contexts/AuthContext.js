// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUser } from '../services/demoData';
import { ENV, logger } from '../config/environment';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

// Утилиты безопасности
const TokenManager = {
    setToken: (token) => {
        try {
            // Проверяем JWT формат (basic validation)
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid token format');
            }
            
            sessionStorage.setItem('authToken', token);
            // Убираем из localStorage для безопасности
        } catch (error) {
            logger.error('Invalid token:', error);
            throw new Error('Invalid authentication token');
        }
    },
    
    getToken: () => {
        return sessionStorage.getItem('authToken');
    },
    
    removeToken: () => {
        sessionStorage.removeItem('authToken');
        localStorage.removeItem('authToken'); // Очищаем legacy
        localStorage.removeItem('user');
    },

    // Проверка истечения токена
    isTokenExpired: (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    }
};

// CSRF токен для форм
const CSRFManager = {
    getToken: () => {
        let token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!token) {
            token = crypto.randomUUID();
            const meta = document.createElement('meta');
            meta.name = 'csrf-token';
            meta.content = token;
            document.head.appendChild(meta);
        }
        return token;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDemoMode, setIsDemoMode] = useState(() => {
        return localStorage.getItem('demoMode') === 'true';
    });

    // Проверка токена при загрузке приложения
    useEffect(() => {
        checkAuthStatus();
        
        // Автоматический logout при неактивности (30 минут)
        const activityTimeout = setTimeout(() => {
            if (!isDemoMode && isAuthenticated) {
                logger.warn('Auto logout due to inactivity');
                logout();
            }
        }, 30 * 60 * 1000);

        // Обновляем токен периодически
        const tokenRefreshInterval = setInterval(() => {
            if (!isDemoMode && isAuthenticated) {
                refreshToken();
            }
        }, 15 * 60 * 1000); // Каждые 15 минут

        return () => {
            clearTimeout(activityTimeout);
            clearInterval(tokenRefreshInterval);
        };
    }, []);

    const checkAuthStatus = async () => {
        try {
            // Проверяем сначала демо-режим
            if (localStorage.getItem('demoMode') === 'true') {
                setUser(demoUser);
                setIsAuthenticated(true);
                setLoading(false);
                return;
            }

            const token = TokenManager.getToken();
            if (!token) {
                setLoading(false);
                return;
            }

            // Проверяем истечение токена
            if (TokenManager.isTokenExpired(token)) {
                TokenManager.removeToken();
                setLoading(false);
                return;
            }

            // Проверяем валидность токена на сервере
            const response = await fetch(`${ENV.API_URL}/user/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': CSRFManager.getToken()
                },
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                // Токен невалиден, очищаем
                TokenManager.removeToken();
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            logger.error('Auth check failed:', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        // Input validation
        if (!email || !password) {
            return { success: false, error: 'Email and password are required' };
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Invalid email format' };
        }

        // В демо-режиме просто устанавливаем демо-пользователя
        if (isDemoMode) {
            setUser(demoUser);
            setIsAuthenticated(true);
            return { success: true, user: demoUser };
        }

        try {
            const response = await fetch(`${ENV.API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': CSRFManager.getToken()
                },
                body: JSON.stringify({ 
                    email: email.toLowerCase().trim(), 
                    password,
                    timestamp: Date.now() // Защита от replay атак
                }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Сохраняем токен безопасно
            TokenManager.setToken(data.access_token);

            setUser(data.user);
            setIsAuthenticated(true);

            logger.info('User logged in successfully');
            return { success: true, user: data.user };
        } catch (error) {
            logger.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const refreshToken = async () => {
        try {
            const token = TokenManager.getToken();
            if (!token) return;

            const response = await fetch(`${ENV.API_URL}/refresh-token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': CSRFManager.getToken()
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                TokenManager.setToken(data.access_token);
                logger.debug('Token refreshed successfully');
            }
        } catch (error) {
            logger.error('Token refresh failed:', error);
        }
    };

    const logout = async () => {
        try {
            const token = TokenManager.getToken();
            
            // В демо-режиме просто устанавливаем режим в false
            if (isDemoMode) {
                localStorage.setItem('demoMode', 'false');
                setIsDemoMode(false);
                setUser(null);
                setIsAuthenticated(false);
                return;
            }

            if (token) {
                // Уведомляем сервер о логауте
                await fetch(`${ENV.API_URL}/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': CSRFManager.getToken()
                    },
                    credentials: 'include'
                });
            }
        } catch (error) {
            logger.error('Logout API call failed:', error);
        } finally {
            // Очищаем все данные
            TokenManager.removeToken();
            setUser(null);
            setIsAuthenticated(false);
            logger.info('User logged out');
        }
    };

    const toggleDemoMode = () => {
        const newDemoMode = !isDemoMode;
        localStorage.setItem('demoMode', String(newDemoMode));
        setIsDemoMode(newDemoMode);
    };

    // Проверка ролей пользователя
    const hasRole = (role) => {
        return user?.roles?.includes(role) || false;
    };

    const isPremium = () => {
        // В демо-режиме всегда предоставляем премиум-доступ
        if (isDemoMode) return true;
        return user?.subscription === 'premium' || hasRole('premium');
    };

    const isAdmin = () => {
        // В демо-режиме тоже даем админские права
        if (isDemoMode) return true;
        return hasRole('admin');
    };

    // Проверка доступа к курсу
    const canAccessCourse = (course) => {
        // В демо-режиме даем доступ ко всем курсам
        if (isDemoMode) return true;
        
        if (!course) return false;

        // Публичные курсы доступны всем авторизованным
        if (course.type === 'free') return isAuthenticated;

        // Премиум курсы только для премиум пользователей
        if (course.type === 'premium') return isPremium();

        // По умолчанию требуем авторизацию
        return isAuthenticated;
    };

    const contextValue = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        hasRole,
        isPremium,
        isAdmin,
        canAccessCourse,
        checkAuthStatus,
        isDemoMode,
        toggleDemoMode
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};