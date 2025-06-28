import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Driver, Client, UserRole } from '../types/user';
import AuthService, { RegisterPayload } from '../services/AuthService';

interface AuthContextType {
  user: Driver | Client | null;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Driver | Client | null>(null);

  const register = async (payload: RegisterPayload) => {
    const newUser = await AuthService.register(payload);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
