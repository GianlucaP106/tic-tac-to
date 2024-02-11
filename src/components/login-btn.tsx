"use client"

import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import useAuth from "@/hooks/useAuth"

type Props = {}

export default function LoginBtn(props: Props) {
    const auth = useAuth()
    return (
        <div>
            {auth.loggedIn &&
                <div>
                    <Button className="text-black" onClick={() => signOut()} variant="outline">Log out</Button>
                </div>
            }
            {!auth.loggedIn &&
                <div>
                    <Button onClick={() => signIn()} className="text-black" variant="outline">Log in</Button>
                </div>
            }
        </div>
    )
}
