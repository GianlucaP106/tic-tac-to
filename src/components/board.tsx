import { Game, GameToken } from "@prisma/client"
import { BoardFrame } from "./board-frame"
import { computeTurn, makeMove } from "@/controllers/game-controller"
import { getPrincipal } from "@/controllers/user-controller"
import { Button } from "./ui/button"
import Link from "next/link"
import { revalidatePath } from "next/cache"

type Props = {
    game: Game
}

export default async function Board(props: Props) {
    const principal = await getPrincipal()
    const move = async (gameId: string, index: number) => {
        "use server"
        await makeMove(gameId, index)
        revalidatePath(`/games/${gameId}`)
    }

    const myTurn = computeTurn(principal, props.game)
    return (
        <div>
            <div className="my-10">
                <Link href={"/games"}>
                    <Button variant={"outline"} className="text-black">Go to games</Button>
                </Link>
            </div>
            <BoardFrame makeMove={move} myToken={principal.id === props.game.player1Id ? GameToken.O : GameToken.X} myTurn={myTurn} game={props.game} />
        </div>
    )
}


