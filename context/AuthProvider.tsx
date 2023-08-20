"use client";
import useFirebase from "@/hooks/useFirebase";
import React, { ReactNode, createContext } from "react";

interface ContextType {
  user: any;
  authLoading: boolean;
  LoginWithGoogle: () => void;
  sign_out: () => void;
  Signup_password: (email: string, name: null, password: string) => void;
  error: string | null | undefined;
  loginpassword: (email: string, password: string) => void;
  token: any;
}

// @ts-ignore
export const AuthContext = createContext<ContextType>();

interface PropsType {
  children: ReactNode;
}

const AuthProvider = ({ children }: PropsType) => {
  const allContext = useFirebase();

  return (
    <div>
      <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
