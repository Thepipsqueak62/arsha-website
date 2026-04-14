"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import {
    RiHome5Fill,
    RiUserFill,
    RiTrophyFill,
    RiTeamFill,
    RiSettings4Fill,
    RiFlashlightFill
} from "react-icons/ri"
import { PiCaretDoubleLeftBold } from "react-icons/pi"
import { HiSparkles } from "react-icons/hi2"
import { MdKeyboardCommandKey } from "react-icons/md"

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
    label: string
    icon: React.ElementType
    href: string
    badge?: number
    color?: string
}

interface NavSection {
    label: string
    items: NavItem[]
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const NAV: NavSection[] = [
    {
        label: "Main",
        items: [
            { label: "Feed",    icon: RiHome5Fill,  href: "/arsha/app/feed",    badge: 12 },
            { label: "Profile", icon: RiUserFill,   href: "/arsha/app/profile" },
        ],
    },
    {
        label: "Compete",
        items: [
            { label: "Tournaments", icon: RiTrophyFill, href: "/arsha/app/tournaments", badge: 3, color: "#f59e0b" },
            { label: "Teams",       icon: RiTeamFill,   href: "/arsha/app/teams" },
        ],
    },
]

const SETTINGS: NavItem = {
    label: "Settings",
    icon: RiSettings4Fill,
    href: "/arsha/app/settings"
}

const W_OPEN      = 264
const W_COLLAPSED = 72

// ─── NavBtn Component (Unchanged from your original) ──────────────────────────

function NavBtn({ item, isActive, isOpen, onClick }: {
    item: NavItem
    isActive: boolean
    isOpen: boolean
    onClick: () => void
}) {
    const Icon   = item.icon
    const accent = item.color ?? "#8b5cf6"

    return (
        <li className="relative">
            <button
                onClick={onClick}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                    "group relative flex w-full items-center gap-3 rounded-[14px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40",
                    isOpen ? "h-11 px-2.5" : "h-11 w-11 mx-auto justify-center px-0",
                    isActive ? "text-white" : "text-white/25 hover:text-white/60",
                )}
                style={{
                    background: isActive
                        ? `linear-gradient(135deg, ${accent}22 0%, ${accent}10 100%)`
                        : undefined,
                }}
                onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"
                }}
                onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = ""
                }}
            >
                {isActive && (
                    <motion.span
                        layoutId="activeBg"
                        className="pointer-events-none absolute inset-0 rounded-[14px]"
                        style={{ border: `1px solid ${accent}40` }}
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                )}

                {isActive && (
                    <motion.span
                        layoutId="activeBar"
                        className="absolute -left-3 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full"
                        style={{ background: accent }}
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                )}

                <span
                    className="relative flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-xl transition-all duration-200"
                    style={{
                        background: isActive ? `${accent}28` : undefined,
                        color: isActive ? accent : "currentColor",
                    }}
                >
                    <Icon size={16} />
                    {!isOpen && item.badge !== undefined && (
                        <span
                            className="absolute -right-1 -top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full px-[3px] text-[8px] font-black leading-none text-white"
                            style={{ background: accent }}
                        >
                            {item.badge}
                        </span>
                    )}
                </span>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.13 }}
                            className="flex flex-1 items-center justify-between overflow-hidden"
                        >
                            <span className="truncate text-[13px] font-semibold tracking-[-0.02em]">
                                {item.label}
                            </span>
                            {item.badge !== undefined && (
                                <span
                                    className="ml-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-[5px] text-[9.5px] font-black leading-none text-white"
                                    style={{ background: accent }}
                                >
                                    {item.badge}
                                </span>
                            )}
                        </motion.span>
                    )}
                </AnimatePresence>

                {!isOpen && (
                    <span className="pointer-events-none absolute left-[calc(100%+14px)] top-1/2 z-[100] -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/8 bg-[#0f0f20]/95 px-3 py-1.5 text-[12px] font-semibold text-white/90 opacity-0 shadow-2xl backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100">
                        {item.label}
                        {item.badge !== undefined && (
                            <span
                                className="ml-1.5 rounded-full px-1.5 py-px text-[8.5px] font-black text-white"
                                style={{ background: accent }}
                            >
                                {item.badge}
                            </span>
                        )}
                    </span>
                )}
            </button>
        </li>
    )
}

// ─── Main Sidebar Component ───────────────────────────────────────────────────

export function ArshaAppSidebar() {
    const pathname = usePathname()
    const router   = useRouter()
    const [open, setOpen] = React.useState(true)
    const [isMac, setIsMac] = React.useState(false)

    // Detect OS for keyboard shortcut display
    React.useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
    }, [])

    // Keyboard shortcut handler
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(o => !o)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return (
        <div className="relative flex h-full shrink-0">
            {/* ─── Professional Integrated Edge Handle ─── */}
            <div className="absolute -right-px top-8 bottom-8 z-40 flex items-center">
                <motion.button
                    onClick={() => setOpen(o => !o)}
                    aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
                    className="group relative flex h-12 w-5 items-center justify-center rounded-l-lg border border-r-0 border-white/[0.06] bg-[#0c0c1a] shadow-xl transition-all duration-200 hover:bg-[#111128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
                    whileHover={{ width: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    {/* Animated gradient edge on hover */}
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-violet-500/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                    <motion.span
                        animate={{ rotate: open ? 0 : 180 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="text-white/20 transition-colors duration-200 group-hover:text-white/50"
                    >
                        <PiCaretDoubleLeftBold size={10} />
                    </motion.span>
                </motion.button>
            </div>

            {/* ─── Sidebar Container ─── */}
            <motion.aside
                animate={{ width: open ? W_OPEN : W_COLLAPSED }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative flex h-full flex-col overflow-hidden"
                style={{
                    background: "#080815",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                {/* Noise texture overlay */}
                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.015]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
                        <feColorMatrix type="saturate" values="0"/>
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)"/>
                </svg>

                {/* Ambient glows */}
                <div
                    className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
                    style={{ background: "radial-gradient(circle, #6d28d9 0%, transparent 65%)" }}
                />
                <div
                    className="pointer-events-none absolute bottom-0 left-0 h-[160px] w-[160px] -translate-x-1/3 translate-y-1/3 rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #4f46e5 0%, transparent 65%)" }}
                />

                {/* ─── Header ─── */}
                <div
                    className="relative flex h-[68px] shrink-0 items-center gap-3 overflow-hidden px-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}
                >
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 scale-150 rounded-xl bg-violet-600/40 blur-xl" />
                        <div
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[11px] font-black tracking-widest text-white"
                            style={{
                                background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
                                boxShadow: "0 0 0 1px rgba(139,92,246,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                            }}
                        >
                            AE
                        </div>
                    </div>

                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.16 }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-baseline gap-[3px]">
                                    <span className="text-[17px] font-black tracking-[-0.05em] text-white">
                                        arsha
                                    </span>
                                    <span className="text-[17px] font-black text-violet-400">.</span>
                                    <span
                                        className="ml-1 rounded-md px-1.5 py-px text-[8.5px] font-black uppercase tracking-widest"
                                        style={{
                                            background: "rgba(139,92,246,0.2)",
                                            color: "#a78bfa",
                                            border: "1px solid rgba(139,92,246,0.3)",
                                        }}
                                    >
                                        PRO
                                    </span>
                                </div>
                                <div className="mt-0.5 flex items-center gap-1">
                                    <HiSparkles size={9} className="text-violet-400/70" />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                                        Esports Platform
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ─── Navigation ─── */}
                <nav className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className={cn("flex flex-col gap-0.5", open ? "px-3" : "px-[10px]")}>
                        {NAV.map((section, si) => (
                            <div key={section.label} className={cn(si > 0 && "mt-3")}>
                                <AnimatePresence initial={false}>
                                    {open && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.1 }}
                                            className="mb-1.5 px-3 text-[9px] font-black uppercase tracking-[0.2em] text-white/20"
                                        >
                                            {section.label}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                                {!open && si > 0 && (
                                    <div className="mx-auto mb-3 h-px w-6 bg-white/8" />
                                )}

                                <ul className="space-y-0.5">
                                    {section.items.map(item => (
                                        <NavBtn
                                            key={item.href}
                                            item={item}
                                            isActive={pathname === item.href}
                                            isOpen={open}
                                            onClick={() => router.push(item.href)}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1" />

                    {/* Settings */}
                    <div className={cn("mb-1 mt-3 h-px bg-white/6", open ? "mx-3" : "mx-[10px]")} />
                    <div className={cn(open ? "px-3" : "px-[10px]")}>
                        <NavBtn
                            item={SETTINGS}
                            isActive={pathname === SETTINGS.href}
                            isOpen={open}
                            onClick={() => router.push(SETTINGS.href)}
                        />
                    </div>
                </nav>

                {/* ─── Footer ─── */}
                <div
                    className="relative shrink-0 p-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
                >
                    <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 opacity-30"
                        style={{ background: "linear-gradient(to top, #4c1d9520, transparent)" }}
                    />

                    {/* Keyboard shortcut hint */}
                    {open && (
                        <div className="mb-2 flex items-center justify-between px-1">
                            <span className="text-[9px] font-medium uppercase tracking-wider text-white/15">
                                Quick Actions
                            </span>
                            <kbd className="flex items-center gap-0.5 rounded-md border border-white/10 bg-white/[0.02] px-1.5 py-0.5 text-[9px] font-mono text-white/25">
                                {isMac ? (
                                    <>
                                        <MdKeyboardCommandKey size={10} />
                                        <span>B</span>
                                    </>
                                ) : (
                                    <span>Ctrl+B</span>
                                )}
                            </kbd>
                        </div>
                    )}

                    <button
                        className={cn(
                            "group relative flex w-full items-center gap-3 rounded-[14px] p-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40",
                            !open && "justify-center",
                        )}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "")}
                        aria-label="User menu"
                    >
                        <div className="relative shrink-0">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-[10px] font-black text-white"
                                style={{
                                    background: "linear-gradient(135deg, #7c3aed 0%, #312e81 100%)",
                                    boxShadow: "0 0 0 1.5px rgba(139,92,246,0.5), 0 0 16px rgba(124,58,237,0.3)",
                                }}
                            >
                                JD
                            </div>
                            <span
                                className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-[2px]"
                                style={{
                                    background: "#34d399",
                                    borderColor: "#080815",
                                    boxShadow: "0 0 6px #34d39980",
                                }}
                            />
                        </div>

                        <AnimatePresence initial={false}>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.13 }}
                                    className="flex flex-1 flex-col overflow-hidden"
                                >
                                    <span className="truncate text-[13px] font-bold tracking-[-0.02em] text-white/90">
                                        JDoe_Val
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <RiFlashlightFill size={9} className="text-violet-400/70" />
                                        <span className="text-[10px] font-semibold tracking-tight text-white/30">
                                            VALORANT · Pro
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.aside>
        </div>
    )
}