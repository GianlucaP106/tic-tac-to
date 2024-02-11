import GamesList from "@/components/games-list"
import { Button } from "@/components/ui/button"
import { getGamesByPrincipal } from "@/controllers/game-controller"
import Link from "next/link"

type Props = {}

export default async function page(props: Props) {
    const games = await getGamesByPrincipal()
    return (
        <div className="p-24 flex flex-col items-center">
            <GamesList />
            <div className="mt-10 flex flex-col gap-3 items-center">
                <Link href={"/games/new"}>
                    <Button>Create a Game</Button>
                </Link>

                <Link href={"/"}>
                    <Button>Home</Button>
                </Link>
            </div>
        </div>
    )
}
