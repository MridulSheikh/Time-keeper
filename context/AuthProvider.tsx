'use client'
import useFirebase from '@/hooks/useFirebase';
import React, {ReactNode, createContext } from 'react';

interface ContextType {
  user : any;
  authLoading : boolean;
  LoginWithGoogle : () => void;
  sign_out : () => void;
}

// @ts-ignore
export const AuthContext = createContext<ContextType>();

interface PropsType {
  children : ReactNode
}

const AuthProvider = ({children} : PropsType) => {
    const allContext = useFirebase()
    return (
        <div>
        <AuthContext.Provider value={allContext}>
            {children}
         </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;