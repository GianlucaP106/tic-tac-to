import getAuth from "@/controllers/user-controller"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default async function Nav(props: Props) {
    const auth = await getAuth()

    return (
        <div>
            {auth.user &&
                <div className="w-full bg-neutral-900 flex justify-end items-center px-5">
                    <p>Logged in as {auth.user.email}</p>
                </div>
            }
            {props.children}
        </div>
    )
}
