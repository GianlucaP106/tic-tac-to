
"use client"

import { useState } from "react";
import { Button } from "./ui/button";

type Props = {
    gameId: string
}

export default function CopyInviteBtn(props: Props) {
    const [copied, setCopied] = useState(false)
    const handleCopyClick = async () => {
        const url = new URL(`${window.location.href}`)
        url.pathname = `/games/${props.gameId}`
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
