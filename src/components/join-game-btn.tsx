"use client"

import { Button } from './ui/button'

type Props = {
    join: () => void
}

export default function JoinGameBtn(props: Props) {
    return (
        <div>
            <Button onClick={() => {
                props.join()
                window.location.href = "/games"
            }}>Join game</Button>
        </div>
    )
}
