import { computeTurn, getGamesByPrincipal, getTurnString } from "@/controllers/game-controller"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "./ui/table"
import { getPrincipal, getUserById } from "@/controllers/user-controller"
import { User } from "@prisma/client"
import TableRowWrapper from "./table-row"

type Props = {}

export default async function GamesList(props: Props) {
    const principal = await getPrincipal()
    const games = await getGamesByPrincipal()

    const gameComp = await (async () => {
        let out = []
        for (let game of games) {
            const home: boolean = principal.id === game.player1Id
            const myTurn = computeTurn(principal, game)
            const op: User | null = home ? (game.player2Id ? await getUserById(game.player2Id as string) : null) : await getUserById(game.player1Id)
            out.push(
                <TableRowWrapper key={game.id} game={game} op={op} home={home} myTurn={myTurn} turnString={getTurnString(principal, game)} />
            )
        }
        return out
    })()

    return (
        <div>
            <Table>
                <TableCaption>Your games</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Game ID</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Oponnent</TableHead>
                        <TableHead className="text-right">Turn</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {gameComp}
                </TableBody>
            </Table>
        </div>
    )
}
