import { Game, GameStatus, GameToken } from "@prisma/client"
import { BoardFrame } from "./board-frame"
import { computeTurn, getTurnString, makeMove } from "@/controllers/game-controller"
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
    const turnString = getTurnString(principal, props.game)
    const showNewGameBtn = props.game.gameStatus !== GameStatus.ongoing
    return (
        <div>
            <div className="my-10 flex flex-col">
                <Link href={"/games"}>
                    <Button variant={"outline"} className="text-black">Go back</Button>
                </Link>
                <div className="mt-6">
                    <p className="text-xl font-semibold">Game ID: {props.game.id}</p>
                </div>
                <div className="mt-6">
                    <p className="text-xl font-semibold">{turnString}</p>
                </div>
            </div>
            <BoardFrame makeMove={move} principal={principal} myToken={principal.id === props.game.player1Id ? GameToken.O : GameToken.X} myTurn={myTurn} game={props.game} />
            {showNewGameBtn &&
                <div className="mt-10">
                    <Link href={"/games/new"}>
                        <Button className="text-black" variant={"outline"}>New game</Button>
                    </Link>
                </div>
            }
        </div>
    )
}


