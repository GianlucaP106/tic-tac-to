import Board from "@/components/board"
import JoinGameBtn from "@/components/join-game-btn"
import { getGameById, joinGame } from "@/controllers/game-controller"
import { getPrincipal } from "@/controllers/user-controller"

type Props = {
    params: {
        game: string
    }
}

export default async function page(props: Props) {
    const gameId = props.params.game
    const game = await getGameById(gameId)
    const principal = await getPrincipal()


    if (!game) {
        return (
            <div>
                No game found
            </div>
        )
    }


    const join = async () => {
        "use server"
        await joinGame(game.id)
    }

    if (principal.id !== game.player1Id && principal.id !== game.player2Id) {
        return (
            <div className="p-24">
                <JoinGameBtn join={join} />
            </div>
        )
    }

    return (
        <div className="flex justify-center p-24">
            <Board game={game} />
        </div>
    )
}
