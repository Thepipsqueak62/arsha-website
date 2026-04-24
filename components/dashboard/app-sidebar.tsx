"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    RiHome5Fill,
    RiUserFill,
    RiTrophyFill,
    RiTeamFill,
    RiSettings4Fill,
    RiFlashlightFill,
    RiBarChartFill,
    RiMenuFill,
} from "react-icons/ri"
import { PiCaretDoubleLeftBold } from "react-icons/pi"
import { LogOut } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useIsMobile} from "@/hooks/use-mobile";


// ─── Types ─────────────────────────────────

interface NavItem {
    label: string
    icon: React.ElementType
    href: string
    badge?: number
    color?: string
    live?: boolean
}

interface NavSection {
    label: string
    items: NavItem[]
}

// ─── Navigation Config ─────────────────────

const NAV: NavSection[] = [
    {
        label: "Main",
        items: [
            { label: "Dashboard", icon: RiHome5Fill, href: "/arsha/app" },
            { label: "Tournaments", icon: RiTrophyFill, href: "/arsha/app/esports/tournaments" },
            { label: "Teams", icon: RiTeamFill, href: "/arsha/app/esports/teams" },
            { label: "Profile", icon: RiUserFill, href: "/arsha/app/profile" },
        ],
    },
    {
        label: "Competitive",
        items: [
            { label: "Matches", icon: RiFlashlightFill, href: "/arsha/app/matches", live: true },
            { label: "Leaderboard", icon: RiBarChartFill, href: "/arsha/app/leaderboard" },
        ],
    },
]

const SETTINGS: NavItem = {
    label: "Settings",
    icon: RiSettings4Fill,
    href: "/arsha/app/settings",
}

// ─── Hook: User Session ────────────────────

interface User {
    email?: string
    name?: string
    image?: string | null
}

function useUser() {
    const [user, setUser] = React.useState<User | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<Error | null>(null)

    React.useEffect(() => {
        let cancelled = false

        const fetchUser = async () => {
            try {
                const { data } = await authClient.getSession()
                if (!cancelled) setUser(data?.user ?? null)
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err : new Error("Session fetch failed"))
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchUser()
        return () => { cancelled = true }
    }, [])

    return { user, loading, error }
}

// ─── Get User Initials ─────────────────────

function getInitials(name?: string, email?: string): string {
    if (name) {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    }
    if (email) {
        return email[0].toUpperCase()
    }
    return "?"
}

// ─── Nav Button ────────────────────────────

interface NavBtnProps {
    item: NavItem
    isActive: boolean
    isOpen: boolean
    onClick?: () => void
}

function NavBtn({ item, isActive, isOpen, onClick }: NavBtnProps) {
    const Icon = item.icon
    const accent = item.color ?? "#8b5cf6"

    const content = (
        <Link
            href={item.href}
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                "group relative flex items-center gap-3 rounded-xl transition-all duration-200 outline-none",
                "focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080815]",
                isOpen ? "h-11 px-3" : "h-11 w-11 justify-center mx-auto",
                isActive
                    ? "text-white"
                    : "text-white/30 hover:text-white/70 hover:bg-white/[0.04]"
            )}
        >
            {/* Active left accent bar */}
            {isActive && (
                <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                    style={{ backgroundColor: accent }}
                />
            )}

            {/* Active background glow */}
            {isActive && (
                <span
                    className="absolute inset-0 rounded-xl"
                    style={{
                        background: `${accent}12`,
                        boxShadow: `0 0 0 1px ${accent}40, 0 0 12px ${accent}30`,
                    }}
                />
            )}

            {/* Icon with hover micro-interaction */}
            <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            >
                <Icon size={16} />
            </motion.span>

            {/* Label */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.span
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className="relative flex flex-1 items-center justify-between text-sm font-semibold overflow-hidden whitespace-nowrap"
                    >
                        {item.label}

                        {item.live && (
                            <span className="ml-2 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                <span className="text-[9px] font-bold tracking-widest text-red-400">
                  LIVE
                </span>
              </span>
                        )}

                        {item.badge != null && item.badge > 0 && (
                            <span className="ml-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-bold text-white">
                {item.badge > 99 ? "99+" : item.badge}
              </span>
                        )}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Collapsed state indicators */}
            {!isOpen && item.live && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
            )}

            {!isOpen && item.badge != null && item.badge > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[9px] font-bold text-white">
          {item.badge > 9 ? "9+" : item.badge}
        </span>
            )}
        </Link>
    )

    // Wrap in tooltip when collapsed
    if (!isOpen) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    {content}
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[#1a1a2e] text-white border-white/10">
          <span className="flex items-center gap-2">
            {item.label}
              {item.live && <span className="text-red-400 text-[9px] font-bold">LIVE</span>}
              {item.badge != null && item.badge > 0 && (
                  <span className="text-violet-400 text-[10px] font-bold">{item.badge}</span>
              )}
          </span>
                </TooltipContent>
            </Tooltip>
        )
    }

    return content
}

// ─── Mobile Navigation Content ─────────────

interface MobileNavContentProps {
    pathname: string
    isActive: (href: string) => boolean
    user: User | null
    loading: boolean
    loggingOut: boolean
    onLogout: () => void
    onNavClick: () => void
}

function MobileNavContent({
                              isActive,
                              user,
                              loading,
                              loggingOut,
                              onLogout,
                              onNavClick,
                          }: MobileNavContentProps) {
    return (
        <div className="flex flex-col h-full bg-[#080815]">
            <SheetHeader className="border-b border-white/5 px-4 py-4">
                <SheetTitle className="flex items-center gap-3 text-white">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold">
                        A
                    </div>
                    Arsha
                </SheetTitle>
            </SheetHeader>

            <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
                {NAV.map((section) => (
                    <div key={section.label}>
                        <p className="text-xs text-white/20 px-2 mb-2 uppercase tracking-wider">
                            {section.label}
                        </p>
                        {section.items.map((item) => (
                            <NavBtn
                                key={item.href}
                                item={item}
                                isActive={isActive(item.href)}
                                isOpen={true}
                                onClick={onNavClick}
                            />
                        ))}
                    </div>
                ))}
            </nav>

            <div className="p-3 border-t border-white/5">
                <NavBtn
                    item={SETTINGS}
                    isActive={isActive(SETTINGS.href)}
                    isOpen={true}
                    onClick={onNavClick}
                />

                <button
                    onClick={onLogout}
                    disabled={loggingOut}
                    className={cn(
                        "mt-2 flex w-full items-center justify-center gap-2 rounded-lg h-10 transition",
                        "text-red-400 hover:bg-red-500/10",
                        "outline-none focus-visible:ring-2 focus-visible:ring-red-500",
                        "disabled:opacity-40 disabled:cursor-not-allowed"
                    )}
                >
                    <LogOut size={14} className={loggingOut ? "animate-spin" : ""} />
                    <span className="text-sm font-semibold">
            {loggingOut ? "Logging out..." : "Log out"}
          </span>
                </button>

                {/* User info with avatar */}
                <div className="mt-3 flex items-center gap-3 px-1">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? user?.email ?? "User"} />
                        <AvatarFallback className="bg-violet-600/20 text-violet-400 text-xs font-semibold">
                            {getInitials(user?.name, user?.email)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        {loading ? (
                            <span className="inline-block w-24 h-3 rounded bg-white/10 animate-pulse" />
                        ) : (
                            <>
                                {user?.name && (
                                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                )}
                                <p className="text-xs text-white/40 truncate">{user?.email}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Sidebar ───────────────────────────────

export function ArshaAppSidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(true)
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [loggingOut, setLoggingOut] = React.useState(false)
    const { user, loading } = useUser()
    const isMobile = useIsMobile()

    // Keyboard shortcut: Cmd/Ctrl + B to toggle
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "b") {
                e.preventDefault()
                if (isMobile) {
                    setMobileOpen(prev => !prev)
                } else {
                    setIsOpen(prev => !prev)
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isMobile])

    // Matches active item, including nested routes
    const isActive = React.useCallback(
        (href: string) => {
            if (href === "/arsha/app") return pathname === href
            return pathname === href || pathname.startsWith(href + "/")
        },
        [pathname]
    )

    const handleLogout = async () => {
        if (loggingOut) return
        setLoggingOut(true)
        try {
            await authClient.signOut()
            window.location.href = "/"
        } catch {
            setLoggingOut(false)
        }
    }

    // Mobile: render sheet drawer
    if (isMobile) {
        return (
            <>
                {/* Mobile trigger button */}
                <button
                    onClick={() => setMobileOpen(true)}
                    className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-[#080815] border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors md:hidden"
                    aria-label="Open navigation"
                >
                    <RiMenuFill size={18} />
                </button>

                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger className="sr-only">Open navigation</SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72 border-white/5 bg-[#080815]">
                        <MobileNavContent
                            pathname={pathname}
                            isActive={isActive}
                            user={user}
                            loading={loading}
                            loggingOut={loggingOut}
                            onLogout={handleLogout}
                            onNavClick={() => setMobileOpen(false)}
                        />
                    </SheetContent>
                </Sheet>
            </>
        )
    }

    // Desktop: render collapsible sidebar
    return (
        <TooltipProvider delayDuration={100}>
            <div className="relative flex h-full">
                {/* Edge Toggle */}
                <div className="absolute -right-[6px] top-8 bottom-8 z-40 flex items-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <motion.button
                                onClick={() => setIsOpen((o) => !o)}
                                aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                                aria-expanded={isOpen}
                                className={cn(
                                    "group relative flex h-12 w-3 items-center justify-center",
                                    "rounded-l-md border border-white/5 bg-white/[0.02] backdrop-blur-sm",
                                    "transition-all hover:w-5 hover:bg-white/[0.05]",
                                    "outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                                )}
                            >
                                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-violet-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <motion.span
                                    animate={{ rotate: isOpen ? 0 : 180 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className="text-white/30 group-hover:text-white/70 transition-colors"
                                >
                                    <PiCaretDoubleLeftBold size={10} />
                                </motion.span>
                            </motion.button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-[#1a1a2e] text-white border-white/10">
              <span className="flex items-center gap-2">
                {isOpen ? "Collapse" : "Expand"}
                  <kbd className="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded">
                  {typeof navigator !== "undefined" && navigator.platform?.includes("Mac") ? "Cmd" : "Ctrl"}+B
                </kbd>
              </span>
                        </TooltipContent>
                    </Tooltip>
                </div>

                <motion.aside
                    animate={{ width: isOpen ? 260 : 72 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="flex flex-col overflow-hidden bg-[#080815] border-r border-white/5"
                >
                    {/* Header */}
                    <div className="h-16 flex items-center px-4 shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-10 w-10 shrink-0 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold select-none cursor-pointer"
                        >
                            A
                        </motion.div>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -6 }}
                                    transition={{ duration: 0.15 }}
                                    className="ml-3 font-bold text-white whitespace-nowrap overflow-hidden"
                                >
                                    Arsha
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-2 space-y-4 overflow-y-auto overflow-x-hidden">
                        {NAV.map((section) => (
                            <div key={section.label}>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.1 }}
                                            className="text-xs text-white/20 px-2 mb-1 uppercase tracking-wider whitespace-nowrap"
                                        >
                                            {section.label}
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                {section.items.map((item) => (
                                    <NavBtn
                                        key={item.href}
                                        item={item}
                                        isActive={isActive(item.href)}
                                        isOpen={isOpen}
                                    />
                                ))}
                            </div>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-3 border-t border-white/5 shrink-0">
                        <NavBtn
                            item={SETTINGS}
                            isActive={isActive(SETTINGS.href)}
                            isOpen={isOpen}
                        />

                        {/* Logout button with tooltip when collapsed */}
                        {isOpen ? (
                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className={cn(
                                    "mt-2 flex w-full items-center justify-center gap-2 rounded-lg h-10 transition",
                                    "text-red-400 hover:bg-red-500/10",
                                    "outline-none focus-visible:ring-2 focus-visible:ring-red-500",
                                    "disabled:opacity-40 disabled:cursor-not-allowed"
                                )}
                            >
                                <LogOut size={14} className={loggingOut ? "animate-spin" : ""} />
                                <motion.span
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-sm font-semibold whitespace-nowrap"
                                >
                                    {loggingOut ? "Logging out..." : "Log out"}
                                </motion.span>
                            </button>
                        ) : (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={handleLogout}
                                        disabled={loggingOut}
                                        className={cn(
                                            "mt-2 flex w-full items-center justify-center gap-2 rounded-lg h-10 transition",
                                            "text-red-400 hover:bg-red-500/10",
                                            "outline-none focus-visible:ring-2 focus-visible:ring-red-500",
                                            "disabled:opacity-40 disabled:cursor-not-allowed"
                                        )}
                                    >
                                        <LogOut size={14} className={loggingOut ? "animate-spin" : ""} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="bg-[#1a1a2e] text-white border-white/10">
                                    Log out
                                </TooltipContent>
                            </Tooltip>
                        )}

                        {/* User info with avatar */}
                        <AnimatePresence initial={false}>
                            {isOpen ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="mt-3 flex items-center gap-3 px-1"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? user?.email ?? "User"} />
                                        <AvatarFallback className="bg-violet-600/20 text-violet-400 text-xs font-semibold">
                                            {getInitials(user?.name, user?.email)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        {loading ? (
                                            <span className="inline-block w-24 h-3 rounded bg-white/10 animate-pulse" />
                                        ) : (
                                            <>
                                                {user?.name && (
                                                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                                )}
                                                <p className="text-xs text-white/40 truncate">{user?.email}</p>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-3 flex justify-center"
                                >
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Avatar className="h-8 w-8 cursor-pointer">
                                                <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? user?.email ?? "User"} />
                                                <AvatarFallback className="bg-violet-600/20 text-violet-400 text-xs font-semibold">
                                                    {getInitials(user?.name, user?.email)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="bg-[#1a1a2e] text-white border-white/10">
                                            <div>
                                                {user?.name && <p className="font-medium">{user.name}</p>}
                                                <p className="text-white/60">{user?.email}</p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.aside>
            </div>
        </TooltipProvider>
    )
}
