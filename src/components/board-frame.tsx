"use client"

import { Game, GameStatus, GameToken, User } from "@prisma/client"
import { useState } from "react"
import { Button } from "./ui/button";
import { getTurnString } from "@/controllers/game-controller";

type FrameProps = {
    game: Game;
    principal: User
    myToken: GameToken
    myTurn: boolean
    makeMove: (gameId: string, index: number) => Promise<void>
}

export function BoardFrame(props: FrameProps) {
    const [selected, setSelected] = useState<number | null>(null)
    const turnString = getTurnString(props.principal, props.game)
    return (
        <div className="grid grid-cols-3">
            {props.game.gameState.map((token, index) => {
                return (
                    <div className="col-span-1 border-solid border-black border-2" key={index}>
                        <BoardItem gameStatus={props.game.gameStatus} myTurn={props.myTurn} token={token} myToken={props.myToken} selected={selected !== null} toggle={() => {
                            setSelected(selected === null ? index : null)
                        }} />
                    </div>
                )
            })}
            {selected !== null &&
                <div className="col-span-3 flex justify-center py-5">
                    <Button onClick={async () => {
                        await props.makeMove(props.game.id, selected)
                        window.location.reload()
                    }} className="">Make move</Button>
                </div>
            }
        </div>
    )
}



type Props = {
    token: GameToken;
    myToken: GameToken;
    selected: boolean;
    toggle: () => void
    myTurn: boolean;
    gameStatus: GameStatus
}

export function BoardItem(props: Props) {
    const [set, setSet] = useState(false)
    const isEmpty = props.token === GameToken.E;
    const toggle = () => {
        props.toggle();
        setSet(p => !p)
    }
    const showToggle = props.gameStatus === GameStatus.ongoing && props.myTurn && (set || (isEmpty && !props.selected))
    return (
        <div onClick={showToggle ? toggle : undefined} className={`w-[150px] h-[150px] flex justify-center items-center bg-lime-100 ${showToggle && "hover:bg-lime-200 cursor-pointer"}`}>
            {isEmpty && set &&
                <p className="text-black text-6xl">{props.myToken}</p>
            }
            {!isEmpty &&
                <p className="text-black text-6xl">{props.token !== GameToken.E && props.token}</p>
            }

        </div>
    )
}

