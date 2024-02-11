import getAuth from "@/controllers/user-controller"
import { ReactNode } from "react"
import LoginBtn from "./login-btn"

type Props = {
    children: ReactNode
}

export default async function Nav(props: Props) {
    const auth = await getAuth()

    return (
        <div>
            <div className="w-full bg-neutral-900 flex justify-end items-center p-5 gap-5">
                <LoginBtn />
                {auth.user &&
                    <p>Logged in as {auth.user.email}</p>
                }
            </div>
            {props.children}
        </div>
    )
}
