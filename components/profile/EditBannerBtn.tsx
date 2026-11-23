"use client"

import { RiEditLine } from "react-icons/ri"

type Props = {
    onClick: () => void
}

export function EditBannerButton({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-xs text-white/50 hover:text-white/80 transition-all"
        >
            <RiEditLine size={11} />
            Edit banner
        </button>
    )
}