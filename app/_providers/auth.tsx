"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider;



//precisamos disso para gerenciar a autenticaçao e etc. context API