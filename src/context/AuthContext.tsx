import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Driver, Client, UserRole } from '../types/user';
import AuthService, { RegisterPayload, LoginPayload } from '../services/AuthService';

interface AuthContextType {
  user: Driver | Client | null;
  register: (payload: RegisterPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Driver | Client | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      const newUser = await AuthService.register(payload);
      setUser(newUser);
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    try {
      const user = await AuthService.login(payload);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
