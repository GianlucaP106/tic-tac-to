import { User } from "@prisma/client";
import { prisma } from "../../prisma/prisma";
import { getServerSession } from "next-auth";
import { Auth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth/nextauth";


export async function getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

export async function getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}

export async function getPrincipal(): Promise<User> {
    const { user } = await getAuth()

    if (!user || !user.email) {
        redirect("/")
    }

    const principal = await getUserByEmail(user?.email as string)
    if (!principal) {
        redirect("/")
    }

    return principal
}


export default async function getAuth(): Promise<Auth> {
    const session = await getServerSession(authOptions)

    return {
        loggedIn: !!session?.user,
        user: session?.user
    }
}
