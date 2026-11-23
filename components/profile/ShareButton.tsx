import * as React from "react";
import {cn} from "@/lib/utils";
import {RiShareLine} from "react-icons/ri";

export function ShareButton({ username }: { username?: string }) {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
        const url = username
            ? `${window.location.origin}/arsha/app/user/${username}`
            : window.location.href
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
    className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
        "border border-white/10 hover:border-white/20 hover:bg-white/5",
        copied ? "text-green-400 border-green-500/30" : "text-white/60"
)}
>
    <RiShareLine size={14} />
    {copied ? "Copied!" : "Share"}
    </button>
)
}
