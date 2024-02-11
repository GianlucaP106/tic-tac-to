"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export default function AuthLayout(props: Props) {
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    )
}
