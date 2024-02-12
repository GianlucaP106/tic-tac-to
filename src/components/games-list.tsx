import { computeTurn, getGamesByPrincipal, getOponent, getTurnString } from "@/controllers/game-controller"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "./ui/table"
import { getPrincipal } from "@/controllers/user-controller"
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
            const op = await getOponent(principal, game)
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
