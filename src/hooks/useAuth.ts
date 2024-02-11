import { useSession } from "next-auth/react";


export type Auth = {
    loggedIn: boolean;
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

export default function useAuth(): Auth {
    const { data } = useSession()

    return {
        loggedIn: !!data?.user,
        user: data?.user
    }

}
