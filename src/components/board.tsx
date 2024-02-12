import { Game, GameStatus, GameToken } from "@prisma/client"
import { BoardFrame } from "./board-frame"
import { computeTurn, getOponent, getTurnString, makeMove } from "@/controllers/game-controller"
import { getPrincipal } from "@/controllers/user-controller"
import { Button } from "./ui/button"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import CopyInviteBtn from "./copy-invite-btn"

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
    const oponent = await getOponent(principal, props.game)
    return (
        <div>
            <div className="my-10 flex flex-col">
                <Link href={"/games"}>
                    <Button variant={"outline"} className="text-black">Go back</Button>
                </Link>
                <div className="mt-6">
                    <p className="text-3xl font-semibold">Game:</p>
                    <p className="text-lg">{props.game.id}</p>
                </div>
                <div className="mt-6">
                    <p className="text-3xl font-semibold">Turn:</p>
                    <p className="text-xl mt-2 font-semibold">{turnString}</p>
                </div>
                <div className="mt-6">
                    <p className="text-3xl font-semibold">Oponent</p>
                    <p className="text-xl font-semibold">{oponent?.name || oponent?.email ||
                        <div className="flex flex-col items-start gap-3 mt-2">
                            <CopyInviteBtn gameId={props.game.id} />
                        </div>
                    }
                    </p>
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


