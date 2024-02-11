"use client"

import { Button } from './ui/button'

type Props = {
    gameId: string
    join: () => void
}

export default function JoinGameBtn(props: Props) {
    return (
        <div>
            <Button onClick={() => {
                props.join()
                setTimeout(() => {
                    window.location.href = `/games/${props.gameId}`
                }, 1000)
            }}>Join game</Button>
        </div>
    )
}
