// components/AuthProvider.tsx
"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ session, children }: any) {
    return (
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);