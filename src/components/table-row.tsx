"use client"

import { Game, User } from "@prisma/client"
import { TableCell, TableRow } from "./ui/table"
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {
    game: Game;
    myTurn: boolean
    turnString: string
    home: boolean
    op: User | null
}

export default function TableRowWrapper(props: Props) {
    const Copy = () => {
        const [copied, setCopied] = useState(false)
        const handleCopyClick = async () => {
            const url = new URL(`${window.location.href}`)
            url.pathname = `/games/${props.game.id}`
            try {
                await navigator.clipboard.writeText(url.toString());
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                }, 5000)
            } catch (err) {
                console.error('Error copying to clipboard', err);
            }
        };

        return <Button onClick={handleCopyClick}>{copied ? "Copied" : "Copy invite link"}</Button>
    }

    const goToGame = () => {
        window.location.href = `/games/${props.game.id}`
    }

    return (
        <>
            <TableRow key={props.game.id}>
                <TableCell onClick={goToGame} className="font-medium cursor-pointer">{props.game.id}</TableCell>
                <TableCell onClick={goToGame} className="cursor-pointer" >{props.home ? "Home" : "Away"}</TableCell>
                <TableCell onClick={props.op ? goToGame : undefined} className="cursor-pointer" >{props.op ? (props.op.name || props.op.email) : <Copy />}</TableCell>
                <TableCell onClick={goToGame} className="text-right cursor-pointer">{props.turnString}</TableCell>
            </TableRow>
        </>
    )
}
