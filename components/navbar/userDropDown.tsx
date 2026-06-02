import {useEffect, useRef, useState} from "react";
import {ChevronDown, ChevronUp, LayoutDashboard, LogOut, LucideIcon, Settings, UserCircle} from "lucide-react";
import {ROUTE_PATHS} from "@/lib/routes";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";

export const UserDropdown = ({ username, logout }: { username: string; logout: () => void }) => {
    const [open, setOpen] = useState(false);
    const ref             = useRef<HTMLDivElement>(null);

    const initials = username ? username.charAt(0).toUpperCase() : "U";

    const menuItems: { label: string; icon: LucideIcon; path: string }[] = [
        { label: "Dashboard", icon: LayoutDashboard, path: ROUTE_PATHS.ARSHAAPP.DASHBOARD },
        { label: "Profile",   icon: UserCircle,      path: ROUTE_PATHS.ARSHAAPP?.PROFILE  || "/profile" },
        { label: "Settings",  icon: Settings,        path: ROUTE_PATHS.ARSHAAPP?.SETTINGS || "/settings" },
    ];

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-xl border border-border/50 bg-background px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-muted/50"
            >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary text-[11px] font-semibold text-primary-foreground">
                    {initials}
                </div>
                <span className="hidden sm:block max-w-25 truncate text-[13.5px]">{username}</span>
                {open ? <ChevronUp size={13} className="text-muted-foreground" /> : <ChevronDown size={13} className="text-muted-foreground" />}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.14, ease: "easeOut" }}
                        className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-border/50 bg-background p-1.5 shadow-xl"
                    >
                        {/* Account header */}
                        <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 mb-1">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary text-[12px] font-semibold text-primary-foreground">
                                {initials}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{username}</p>
                                <p className="text-[11px] text-muted-foreground">Free plan</p>
                            </div>
                        </div>

                        <div className="h-px bg-border/40 mb-1" />

                        {menuItems.map(({ label, icon: Icon, path }) => (
                            <Link
                                key={label}
                                href={path}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] text-foreground/80 transition-colors hover:bg-muted/60 hover:text-foreground"
                            >
                                <Icon size={14} className="shrink-0 text-muted-foreground" />
                                {label}
                            </Link>
                        ))}

                        <div className="h-px bg-border/40 my-1" />

                        <button
                            onClick={() => { logout(); setOpen(false); }}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] text-destructive transition-colors hover:bg-destructive/8"
                        >
                            <LogOut size={14} className="shrink-0" />
                            Sign out
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};