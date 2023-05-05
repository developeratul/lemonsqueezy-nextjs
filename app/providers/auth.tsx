"use client";
import React from "react";

export type User = {
  id: string;
  email: string;
} | null;

type AuthContextInitialState = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: Boolean;
};

const AuthContext = React.createContext<AuthContextInitialState | null>(null);

export default function AuthProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [user, setUser] = React.useState<User>(null);

  const value: AuthContextInitialState = {
    user,
    isAuthenticated: !!user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const authContext = React.useContext(AuthContext);

  if (!authContext) throw new Error("This hook must be called within 'AuthContext'");

  return authContext;
}
