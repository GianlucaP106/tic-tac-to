"use client"

import { Game, User } from "@prisma/client"
import { TableCell, TableRow } from "./ui/table"
import CopyInviteBtn from "./copy-invite-btn";

type Props = {
    game: Game;
    myTurn: boolean
    turnString: string
    home: boolean
    op: User | null
}

export default function TableRowWrapper(props: Props) {

    const goToGame = () => {
        window.location.href = `/games/${props.game.id}`
    }

    return (
        <>
            <TableRow key={props.game.id}>
                <TableCell onClick={goToGame} className="font-medium cursor-pointer">{props.game.id}</TableCell>
                <TableCell onClick={goToGame} className="cursor-pointer" >{props.home ? "Home" : "Away"}</TableCell>
                <TableCell onClick={props.op ? goToGame : undefined} className="cursor-pointer" >{props.op ? (props.op.name || props.op.email) : <CopyInviteBtn gameId={props.game.id} />}</TableCell>
                <TableCell onClick={goToGame} className="text-right cursor-pointer">{props.turnString}</TableCell>
            </TableRow>
        </>
    )
}
