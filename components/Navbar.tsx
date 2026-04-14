"use client";

import { useEffect, useState, useRef, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import {
    Home, Menu, X, Info, Newspaper, Globe, Contact, HatGlasses,
    User, LogOut, UserCircle, LayoutDashboard, ChevronDown, ChevronUp,
    Settings, HelpCircle, Search, History, BookOpen,
    FileText, ChevronRight, type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ROUTE_PATHS } from "@/lib/routes";

// ─── Types ────────────────────────────────────────────────────────────────────

type NavigationItem = {
    path: string;
    label: string;
    icon: LucideIcon;
};

type SearchResult = {
    id: number;
    title: string;
    category: string;
    path: string;
    icon: LucideIcon;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockSearchResults: SearchResult[] = [
    { id: 1, title: "Getting Started Guide",  category: "Documentation", path: "/docs/getting-started", icon: BookOpen },
    { id: 2, title: "Project Profile",        category: "Features",      path: "/features/profile",     icon: LayoutDashboard },
    { id: 3, title: "Team Collaboration",     category: "Features",      path: "/features/team",        icon: Globe },
    { id: 4, title: "API Documentation",      category: "Documentation", path: "/docs/api",             icon: FileText },
    { id: 5, title: "Recent Updates",         category: "Blog",          path: "/blog/updates",         icon: Newspaper },
    { id: 6, title: "Contact Support",        category: "Help",          path: "/contact-us",           icon: Contact },
    { id: 7, title: "Privacy Policy",         category: "Legal",         path: "/privacy",              icon: HatGlasses },
    { id: 8, title: "User Settings",          category: "Account",       path: "/settings",             icon: Settings },
];

const mockRecentSearches = [
    "profile setup",
    "team management",
    "API integration",
    "project templates",
];

// ─── Search Overlay ───────────────────────────────────────────────────────────

const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [query,   setQuery]   = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router   = useRouter();

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setQuery("");
            setResults([]);
            setTimeout(() => inputRef.current?.focus(), 80);
        }
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const filter = (q: string) => {
        const trimmed = q.trim().toLowerCase();
        if (!trimmed) return setResults([]);
        setLoading(true);
        setTimeout(() => {
            setResults(
                mockSearchResults.filter(
                    (r) => r.title.toLowerCase().includes(trimmed) || r.category.toLowerCase().includes(trimmed)
                )
            );
            setLoading(false);
        }, 200);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        filter(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        filter(query);
    };

    const go = (path: string) => {
        router.push(path);
        onClose();
    };

    const quickSearch = (q: string) => {
        setQuery(q);
        filter(q);
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="w-full max-w-155 rounded-2xl border border-border/60 bg-background shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Input row */}
                <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-border/40">
                    <Search size={17} className="shrink-0 text-muted-foreground" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={handleChange}
                        placeholder="Search documentation, features, help…"
                        className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/60"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => { setQuery(""); setResults([]); }}
                            className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                    <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-[11px] font-medium bg-muted rounded-md border border-border/50 text-muted-foreground">
                        Esc
                    </kbd>
                </form>

                {/* Body */}
                <div className="max-h-105 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                    ) : query && results.length === 0 ? (
                        <div className="py-12 text-center">
                            <Search size={32} className="mx-auto mb-3 text-muted-foreground/30" />
                            <p className="text-sm font-medium text-foreground/70">No results for &ldquo;{query}&rdquo;</p>
                            <p className="text-xs text-muted-foreground mt-1">Try different keywords</p>
                        </div>
                    ) : query && results.length > 0 ? (
                        <ul className="p-2">
                            {results.map((r) => {
                                const Icon = r.icon;
                                return (
                                    <li key={r.id}>
                                        <button
                                            onClick={() => go(r.path)}
                                            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 group-hover:bg-primary/12 transition-colors">
                                                <Icon size={16} className="text-primary" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium truncate">{r.title}</p>
                                                <p className="text-xs text-muted-foreground">{r.category}</p>
                                            </div>
                                            <ChevronRight size={14} className="shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        /* Empty state — recent + trending */
                        <div className="p-4 space-y-5">
                            <div>
                                <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                                    Recent searches
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {mockRecentSearches.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => quickSearch(s)}
                                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs bg-muted/60 hover:bg-muted text-foreground/70 hover:text-foreground transition-colors"
                                        >
                                            <History size={11} />
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                                    Trending
                                </p>
                                <ul className="space-y-0.5">
                                    {mockSearchResults.slice(0, 4).map((r) => {
                                        const Icon = r.icon;
                                        return (
                                            <li key={r.id}>
                                                <button
                                                    onClick={() => go(r.path)}
                                                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-muted/50 transition-colors"
                                                >
                                                    <Icon size={15} className="shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                                                    <span className="flex-1 text-sm">{r.title}</span>
                                                    <span className="text-xs text-muted-foreground/50">{r.category}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer hints */}
                <div className="flex items-center gap-4 px-5 py-3 border-t border-border/30 bg-muted/20 text-[11px] text-muted-foreground/60">
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-background border border-border/50">↑</kbd>
                        <kbd className="px-1.5 py-0.5 rounded bg-background border border-border/50">↓</kbd>
                        navigate
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-background border border-border/50">Enter</kbd>
                        select
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-background border border-border/50">Esc</kbd>
                        close
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Auth Hook ────────────────────────────────────────────────────────────────

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username,        setUsername]        = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const check = () => {
            if (typeof window === "undefined") return;
            const token          = localStorage.getItem("token");
            const storedUsername = localStorage.getItem("username");
            if (token) {
                setIsAuthenticated(true);
                if (storedUsername) {
                    setUsername(storedUsername);
                } else {
                    try {
                        const payload = JSON.parse(atob(token.split(".")[1]));
                        if (payload.username) {
                            setUsername(payload.username);
                            localStorage.setItem("username", payload.username);
                        }
                    } catch { /* ignore decode errors */ }
                }
            } else {
                setIsAuthenticated(false);
                setUsername(null);
            }
        };
        check();
        window.addEventListener("storage", check);
        return () => window.removeEventListener("storage", check);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUsername(null);
        router.push(ROUTE_PATHS.PUBLIC.MAINPAGE);
    };

    return { isAuthenticated, username, logout };
};

// ─── NavLink ──────────────────────────────────────────────────────────────────

const NavLink = ({
                     item,
                     currentPath,
                     onClick,
                     mobile = false,
                 }: {
    item: NavigationItem;
    currentPath: string;
    onClick?: () => void;
    mobile?: boolean;
}) => {
    const Icon     = item.icon;
    const isActive = currentPath === item.path;

    if (mobile) {
        return (
            <Link
                href={item.path}
                onClick={onClick}
                className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                        ? "bg-primary/8 text-primary"
                        : "text-foreground/70 hover:bg-muted/60 hover:text-foreground"
                )}
            >
                <Icon size={16} className="shrink-0" />
                {item.label}
            </Link>
        );
    }

    return (
        <Link
            href={item.path}
            className={cn(
                "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors",
                isActive
                    ? "text-primary"
                    : "text-foreground/65 hover:text-foreground hover:bg-muted/50"
            )}
        >
            <Icon size={14} className="shrink-0" />
            {item.label}
            {isActive && (
                <span className="absolute -bottom-px left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
            )}
        </Link>
    );
};

// ─── User Dropdown ────────────────────────────────────────────────────────────

const UserDropdown = ({ username, logout }: { username: string; logout: () => void }) => {
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
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary/80 to-primary text-[12px] font-semibold text-primary-foreground">
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

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
    const [mobileOpen,  setMobileOpen]  = useState(false);
    const [scrolled,    setScrolled]    = useState(false);
    const [searchOpen,  setSearchOpen]  = useState(false);

    const pathname                              = usePathname();
    const { isAuthenticated, username, logout } = useAuth();
    const navbarRef                             = useRef<HTMLDivElement>(null);

    // Scroll shadow
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => { setScrolled(window.scrollY > 8); ticking = false; });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setMobileOpen(false); }, [pathname]);

    // Body scroll lock
    useEffect(() => {
        if (mobileOpen) {
            const y = window.scrollY;
            document.body.style.cssText = `overflow:hidden;position:fixed;width:100%;top:-${y}px`;
        } else {
            const top = document.body.style.top;
            document.body.style.cssText = "";
            if (top) window.scrollTo(0, parseInt(top) * -1);
        }
        return () => { document.body.style.cssText = ""; };
    }, [mobileOpen]);

    // Click outside to close
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (mobileOpen && navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
                setMobileOpen(false);
            }
        };
        if (mobileOpen) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [mobileOpen]);

    // Keyboard shortcuts
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
            if (e.key === "/" && !searchOpen && !mobileOpen)  { e.preventDefault(); setSearchOpen(true); }
            if (e.key === "Escape" && mobileOpen)              setMobileOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [searchOpen, mobileOpen]);

    // Navigation config
    const primaryNav: NavigationItem[] = [
        { path: ROUTE_PATHS.PUBLIC.MAINPAGE,           label: "Home",     icon: Home },
        { path: ROUTE_PATHS.PUBLIC?.ABOUT,             label: "About",    icon: Info },
        { path: ROUTE_PATHS.PUBLIC?.CONTACT,           label: "Contact",  icon: Contact },
    ];

    const secondaryNav: NavigationItem[] = [
        { path: ROUTE_PATHS.PUBLIC?.PRIVACY || "/privacy", label: "Privacy", icon: HatGlasses },
    ];

    const authNav: NavigationItem[] = isAuthenticated ? [] : [
        { path: ROUTE_PATHS.AUTH?.SIGN_IN, label: "Sign in", icon: User },
        { path: ROUTE_PATHS.AUTH?.SIGN_UP, label: "Sign up", icon: UserCircle },
    ];

    const allNav = [...primaryNav, ...secondaryNav, ...authNav];

    return (
        <>
            <div ref={navbarRef}>
                <header
                    className={cn(
                        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
                        scrolled
                            ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm shadow-black/[0.04]"
                            : "bg-background border-b border-transparent"
                    )}
                >
                    {/* Announcement banner */}
                    <div className="hidden md:flex items-center justify-center gap-2 py-1.5 bg-primary/5 border-b border-primary/10 text-[12px] font-medium text-primary/80">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                        Welcome to Project-ARSHA — next-gen E-Sports platform
                    </div>

                    <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">

                        {/* Logo */}
                        <Link href={ROUTE_PATHS.PUBLIC.MAINPAGE} className="group mr-2 flex shrink-0 items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-[11px] font-bold text-primary-foreground shadow-sm shadow-primary/30 transition-transform group-hover:scale-105">
                                AE
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-[15px] font-semibold tracking-tight">Arsha Esports</span>
                                <span className="text-[10px] text-muted-foreground">Competitive Esports Platform</span>
                            </div>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden lg:flex items-center gap-0.5 flex-1">
                            {primaryNav.map((item) => (
                                <NavLink key={item.path} item={item} currentPath={pathname} />
                            ))}
                        </nav>

                        {/* Right controls */}
                        <div className="ml-auto flex items-center gap-2">

                            {/* Search button */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="hidden md:flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-border hover:bg-muted/60 hover:text-foreground"
                            >
                                <Search size={13} className="shrink-0" />
                                <span className="hidden lg:inline">Search…</span>
                                <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-border/60 bg-background px-1.5 py-0.5 text-[10px]">
                                    ⌘K
                                </kbd>
                            </button>

                            {/* Auth state */}
                            {isAuthenticated ? (
                                <UserDropdown username={username ?? "User"} logout={logout} />
                            ) : (
                                <div className="hidden lg:flex items-center gap-1.5">
                                    <Link
                                        href={ROUTE_PATHS.AUTH?.SIGN_IN || "/signin"}
                                        className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href={ROUTE_PATHS.AUTH?.SIGN_UP || "/signup"}
                                        className="rounded-lg bg-primary px-3.5 py-2 text-[13.5px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                    >
                                        Get started
                                    </Link>
                                </div>
                            )}

                            {/* Hamburger */}
                            <button
                                aria-label="Toggle menu"
                                aria-expanded={mobileOpen}
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-transparent transition-colors hover:bg-muted/60"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {mobileOpen ? (
                                        <motion.span key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}>
                                            <X size={17} />
                                        </motion.span>
                                    ) : (
                                        <motion.span key="m" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
                                            <Menu size={17} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>

                    {/* ── Mobile menu ── */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    key="backdrop"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="fixed inset-0 top-[calc(theme(spacing.14)+theme(spacing.6))] bg-background/70 backdrop-blur-sm lg:hidden"
                                    onClick={() => setMobileOpen(false)}
                                />

                                {/* Panel */}
                                <motion.div
                                    key="panel"
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.18, ease: "easeOut" }}
                                    className="absolute inset-x-0 top-full z-40 border-b border-border/50 bg-background px-4 pb-6 pt-3 shadow-lg lg:hidden"
                                >
                                    {/* Search */}
                                    <button
                                        onClick={() => { setMobileOpen(false); setTimeout(() => setSearchOpen(true), 200); }}
                                        className="mb-4 flex w-full items-center gap-3 rounded-xl border border-border/50 bg-muted/30 px-4 py-2.5 text-[13.5px] text-muted-foreground transition-colors hover:bg-muted/50"
                                    >
                                        <Search size={14} />
                                        Search…
                                        <kbd className="ml-auto rounded border border-border/50 bg-background px-1.5 py-0.5 text-[11px]">/</kbd>
                                    </button>

                                    {/* Primary nav */}
                                    <div className="mb-4">
                                        <p className="mb-1.5 px-3 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                                            Navigation
                                        </p>
                                        <div className="space-y-0.5">
                                            {primaryNav.map((item) => (
                                                <NavLink key={item.path} item={item} currentPath={pathname} onClick={() => setMobileOpen(false)} mobile />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Secondary nav */}
                                    <div className="mb-4">
                                        <p className="mb-1.5 px-3 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                                            Company
                                        </p>
                                        <div className="space-y-0.5">
                                            {secondaryNav.map((item) => (
                                                <NavLink key={item.path} item={item} currentPath={pathname} onClick={() => setMobileOpen(false)} mobile />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-px bg-border/40 mb-4" />

                                    {/* Auth section */}
                                    {isAuthenticated ? (
                                        <div>
                                            <p className="mb-1.5 px-3 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                                                Your account
                                            </p>
                                            <div className="space-y-0.5">
                                                {[
                                                    { path: ROUTE_PATHS.ARSHAAPP.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
                                                    { path: ROUTE_PATHS.ARSHAAPP?.PROFILE || "/profile", label: "Profile", icon: UserCircle },
                                                ].map((item) => (
                                                    <NavLink key={item.path} item={item} currentPath={pathname} onClick={() => setMobileOpen(false)} mobile />
                                                ))}
                                                <button
                                                    onClick={() => { logout(); setMobileOpen(false); }}
                                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/8"
                                                >
                                                    <LogOut size={16} className="shrink-0" />
                                                    Sign out
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2.5">
                                            <Link
                                                href={ROUTE_PATHS.AUTH?.SIGN_IN || "/signin"}
                                                onClick={() => setMobileOpen(false)}
                                                className="flex-1 rounded-xl border border-border/60 py-2.5 text-center text-[13.5px] font-medium transition-colors hover:bg-muted/50"
                                            >
                                                Sign in
                                            </Link>
                                            <Link
                                                href={ROUTE_PATHS.AUTH?.SIGN_UP || "/signup"}
                                                onClick={() => setMobileOpen(false)}
                                                className="flex-1 rounded-xl bg-primary py-2.5 text-center text-[13.5px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                            >
                                                Get started
                                            </Link>
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="mt-6 flex items-center gap-4 pt-4 border-t border-border/30">
                                        <Link href={ROUTE_PATHS.PUBLIC.HELPPAGE} className="flex items-center gap-1 text-[11.5px] text-muted-foreground hover:text-foreground">
                                            <HelpCircle size={12} /> Help
                                        </Link>
                                        <Link href={ROUTE_PATHS.PUBLIC.PRIVACY}   className="text-[11.5px] text-muted-foreground hover:text-foreground">Terms</Link>
                                        <Link href={ROUTE_PATHS.PUBLIC.PRIVACY}  className="text-[11.5px] text-muted-foreground hover:text-foreground">Cookies</Link>
                                        <span className="ml-auto text-[11px] text-muted-foreground/40">
                                            © {new Date().getFullYear()} Proj-Ariel
                                        </span>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </header>

                {/* Height spacer */}
                <div className="h-14" />
            </div>

            {/* Search overlay (outside header so it renders above everything) */}
            <AnimatePresence>
                {searchOpen && <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default Navbar;