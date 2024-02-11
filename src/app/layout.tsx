import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthLayout from "@/components/auth-layout";
import { cn } from "@/lib/utils";
import Nav from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Demo tic-tac-to",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "bg-neutral-800", "text-white")}>
                <AuthLayout>
                    <Nav>
                        {children}
                    </Nav>
                </AuthLayout>
            </body>
        </html>
    );
}
