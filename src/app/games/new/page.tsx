import { Button } from "@/components/ui/button"
import { createGame } from "@/controllers/game-controller"
import getAuth, { getPrincipal } from "@/controllers/user-controller"
import { redirect } from "next/navigation"

type Props = {}

export default async function page(props: Props) {
    const auth = await getAuth()

    if (!auth.loggedIn) {
        redirect("/")
    }

    const create = async () => {
        "use server"
        const game = await createGame(auth.user?.email as string)
        redirect(`/games/${game.id}`)
    }

    return (
        <div className="flex flex-col justify-center items-center p-24">
            <div>
                <form action={create}>
                    <Button type="submit" variant={"outline"} className="text-black">Create a new game</Button>
                </form>
            </div>
        </div>
    )
}
