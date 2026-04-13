"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Home,
    User,
    Trophy,
    Users,
    Settings,
    ChevronLeft,
    Wifi,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
    label: string
    icon: React.ElementType
    href: string
    badge?: number
}

interface NavSection {
    label: string
    items: NavItem[]
}

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV: NavSection[] = [
    {
        label: "Main",
        items: [
            { label: "Feed",    icon: Home,   href: "/arsha/app/feed",    badge: 12 },
            { label: "Profile", icon: User,   href: "/arsha/app/profile" },
        ],
    },
    {
        label: "Compete",
        items: [
            { label: "Tournaments", icon: Trophy, href: "/arsha/app/tournaments", badge: 3 },
            { label: "Teams",       icon: Users,  href: "/arsha/app/teams" },
        ],
    },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const sidebarVariants = {
    open:      { width: 240 },
    collapsed: { width: 60 },
}

const fadeOut = {
    open:      { opacity: 1, x: 0,  transition: { duration: 0.15 } },
    collapsed: { opacity: 0, x: -6, transition: { duration: 0.1  } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ArshaAppSidebar() {
    const pathname = usePathname()
    const router   = useRouter()
    const [open, setOpen] = React.useState(true)

    // Ctrl/Cmd + B to toggle
    React.useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(o => !o)
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    return (
        <motion.aside
            variants={sidebarVariants}
            animate={open ? "open" : "collapsed"}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="relative flex h-full flex-col overflow-hidden border-r"
            style={{
                background: "#0f0f18",
                borderColor: "rgba(127,119,221,0.12)",
            }}
        >
            {/* ── Toggle button ── */}
            <button
                onClick={() => setOpen(o => !o)}
                aria-label="Toggle sidebar"
                className="absolute right-0 top-[30px] z-20 flex h-5 w-5 translate-x-1/2 items-center justify-center rounded-full border"
                style={{
                    background: "#1a1a2e",
                    borderColor: "rgba(127,119,221,0.3)",
                    color: "#7F77DD",
                }}
            >
                <motion.span
                    animate={{ rotate: open ? 0 : 180 }}
                    transition={{ duration: 0.28 }}
                    className="flex items-center justify-center"
                >
                    <ChevronLeft size={10} />
                </motion.span>
            </button>

            {/* ── Header / logo ── */}
            <div
                className="flex h-[60px] min-h-[60px] items-center gap-2.5 overflow-hidden border-b px-3.5"
                style={{ borderColor: "rgba(127,119,221,0.12)" }}
            >
                {/* Logo mark */}
                <div
                    className="flex h-[34px] w-[34px] min-w-[34px] items-center justify-center rounded-lg text-[13px] font-semibold text-white"
                    style={{ background: "#7F77DD" }}
                >
                    AE
                </div>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            variants={fadeOut}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            className="overflow-hidden"
                        >
                            <p className="text-[14px] font-semibold leading-none text-white">Arsha</p>
                            <p className="mt-0.5 text-[11px]" style={{ color: "rgba(127,119,221,0.7)" }}>
                                Esports Platform
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Nav ── */}
            <div className="flex flex-1 flex-col gap-0 overflow-y-auto overflow-x-hidden py-2">
                {NAV.map((section, si) => (
                    <div key={section.label}>
                        {si > 0 && (
                            <div
                                className="mx-3 my-1.5 h-px"
                                style={{ background: "rgba(127,119,221,0.1)" }}
                            />
                        )}

                        {/* Section label */}
                        <AnimatePresence initial={false}>
                            {open && (
                                <motion.p
                                    variants={fadeOut}
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest"
                                    style={{ color: "rgba(127,119,221,0.45)" }}
                                >
                                    {section.label}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Items */}
                        <ul className="space-y-0.5 px-1.5">
                            {section.items.map(item => {
                                const Icon     = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <li key={item.href} className="relative">
                                        <button
                                            onClick={() => router.push(item.href)}
                                            title={!open ? item.label : undefined}
                                            className={cn(
                                                "group relative flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-[13.5px] transition-colors",
                                                isActive
                                                    ? "text-white"
                                                    : "text-white/45 hover:text-white/80"
                                            )}
                                            style={{
                                                background: isActive
                                                    ? "rgba(127,119,221,0.15)"
                                                    : undefined,
                                            }}
                                            onMouseEnter={e => {
                                                if (!isActive)
                                                    (e.currentTarget as HTMLElement).style.background =
                                                        "rgba(127,119,221,0.07)"
                                            }}
                                            onMouseLeave={e => {
                                                if (!isActive)
                                                    (e.currentTarget as HTMLElement).style.background = ""
                                            }}
                                        >
                                            {/* Active bar */}
                                            {isActive && (
                                                <motion.span
                                                    layoutId="activeBar"
                                                    className="absolute -left-1.5 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-r"
                                                    style={{ background: "#7F77DD" }}
                                                />
                                            )}

                                            {/* Icon */}
                                            <span
                                                className="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-lg transition-colors"
                                                style={{
                                                    background: isActive
                                                        ? "rgba(127,119,221,0.25)"
                                                        : undefined,
                                                    color: isActive ? "#a49ef0" : "currentColor",
                                                }}
                                            >
                        <Icon size={16} />
                      </span>

                                            {/* Label */}
                                            <AnimatePresence initial={false}>
                                                {open && (
                                                    <motion.span
                                                        variants={fadeOut}
                                                        initial="collapsed"
                                                        animate="open"
                                                        exit="collapsed"
                                                        className="flex flex-1 items-center justify-between overflow-hidden"
                                                    >
                                                        <span className="truncate">{item.label}</span>
                                                        {item.badge !== undefined && (
                                                            <span
                                                                className="ml-2 rounded-full px-1.5 py-px text-[10px] font-semibold text-white"
                                                                style={{ background: "#7F77DD" }}
                                                            >
                                {item.badge}
                              </span>
                                                        )}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>

                                            {/* Tooltip when collapsed */}
                                            {!open && (
                                                <span
                                                    className="pointer-events-none absolute left-full ml-2.5 whitespace-nowrap rounded-md border px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                    style={{
                                                        background: "#1a1a2e",
                                                        borderColor: "rgba(127,119,221,0.3)",
                                                    }}
                                                >
                          {item.label}
                                                    {item.badge !== undefined && ` (${item.badge})`}
                        </span>
                                            )}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}

                {/* Settings — at bottom of nav body */}
                <div
                    className="mx-3 my-1.5 h-px"
                    style={{ background: "rgba(127,119,221,0.1)" }}
                />
                <ul className="px-1.5">
                    <li className="relative">
                        <button
                            onClick={() => router.push("/arsha/app/settings")}
                            title={!open ? "Settings" : undefined}
                            className={cn(
                                "group relative flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-[13.5px] transition-colors",
                                pathname === "/arsha/app/settings"
                                    ? "text-white"
                                    : "text-white/45 hover:text-white/80"
                            )}
                            style={{
                                background:
                                    pathname === "/arsha/app/settings"
                                        ? "rgba(127,119,221,0.15)"
                                        : undefined,
                            }}
                            onMouseEnter={e => {
                                if (pathname !== "/arsha/app/settings")
                                    (e.currentTarget as HTMLElement).style.background =
                                        "rgba(127,119,221,0.07)"
                            }}
                            onMouseLeave={e => {
                                if (pathname !== "/arsha/app/settings")
                                    (e.currentTarget as HTMLElement).style.background = ""
                            }}
                        >
                            {pathname === "/arsha/app/settings" && (
                                <motion.span
                                    layoutId="activeBar"
                                    className="absolute -left-1.5 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-r"
                                    style={{ background: "#7F77DD" }}
                                />
                            )}
                            <span
                                className="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-lg"
                                style={{
                                    background:
                                        pathname === "/arsha/app/settings"
                                            ? "rgba(127,119,221,0.25)"
                                            : undefined,
                                    color:
                                        pathname === "/arsha/app/settings"
                                            ? "#a49ef0"
                                            : "currentColor",
                                }}
                            >
                <Settings size={16} />
              </span>
                            <AnimatePresence initial={false}>
                                {open && (
                                    <motion.span
                                        variants={fadeOut}
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        className="truncate"
                                    >
                                        Settings
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {!open && (
                                <span
                                    className="pointer-events-none absolute left-full ml-2.5 whitespace-nowrap rounded-md border px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    style={{
                                        background: "#1a1a2e",
                                        borderColor: "rgba(127,119,221,0.3)",
                                    }}
                                >
                  Settings
                </span>
                            )}
                        </button>
                    </li>
                </ul>
            </div>

            {/* ── Footer / user ── */}
            <div
                className="border-t p-2"
                style={{ borderColor: "rgba(127,119,221,0.1)" }}
            >
                <button
                    className="group flex w-full items-center gap-2.5 overflow-hidden rounded-lg p-2 transition-colors"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={e =>
                        ((e.currentTarget as HTMLElement).style.background =
                            "rgba(127,119,221,0.07)")
                    }
                    onMouseLeave={e =>
                        ((e.currentTarget as HTMLElement).style.background = "")
                    }
                >
                    {/* Avatar */}
                    <div
                        className="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-full border-[1.5px] text-xs font-semibold text-white"
                        style={{
                            background: "linear-gradient(135deg, #7F77DD, #534AB7)",
                            borderColor: "rgba(127,119,221,0.4)",
                        }}
                    >
                        JD
                    </div>

                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                variants={fadeOut}
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                className="flex flex-1 items-center justify-between overflow-hidden"
                            >
                                <div className="overflow-hidden">
                                    <p className="truncate text-[13px] font-medium text-white">
                                        JDoe_Val
                                    </p>
                                    <p className="text-[11px]" style={{ color: "rgba(127,119,221,0.6)" }}>
                                        #VALORANT · Pro
                                    </p>
                                </div>
                                <Wifi size={13} className="ml-2 text-green-400 opacity-80" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.aside>
    )
}