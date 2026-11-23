"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
     Menu, X, LogOut, UserCircle, LayoutDashboard, ChevronDown,Search,Swords
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ROUTE_PATHS } from "@/lib/routes";
import { authClient } from "@/lib/auth-client";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";

import {UserDropdown} from "@/components/navbar/userDropDown";
import {SearchOverlay} from "@/components/navbar/searchOverLay";
import NavbarFooter from "@/components/navbar/footer";
import {NavLink} from "@/components/navbar/navLink";
import {primaryNav} from "@/mock-data/primaryNavData";
import {esportsNav} from "@/mock-data/esportsNavData";
import {protectedNav} from "@/mock-data/protectedNavData";



// ─── Auth Hook ────────────────────────────────────────────────────────────────
// Uses better-auth's built-in reactive hook so the navbar updates automatically
// on sign-in and sign-out without needing manual events or polling.

const useAuth = () => {
    const { data: session, isPending: loading } = authClient.useSession();
    const router = useRouter();

    const isAuthenticated = !!session?.user;
    const username = session?.user?.name || session?.user?.email || null;

    const logout = async () => {
        await authClient.signOut();
        window.dispatchEvent(new Event("auth:signout")); // keep for sidebar compatibility
        router.push(ROUTE_PATHS.PUBLIC.MAINPAGE);
    };

    return { isAuthenticated, username, logout, loading };
};

// ─── List Item ────────────────────────────────────────────────────────────────

function ListItem({
                      title,
                      children,
                      href,
                      ...props
                  }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                        <div className="line-clamp-2 text-muted-foreground">{children}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}


// ─── NavLink ──────────────────────────────────────────────────────────────────



// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
    const [mobileOpen,  setMobileOpen]  = useState(false);
    const [scrolled,    setScrolled]    = useState(false);
    const [searchOpen,  setSearchOpen]  = useState(false);

    const pathname                                       = usePathname();
    const { isAuthenticated, username, logout, loading } = useAuth();
    const navbarRef                                      = useRef<HTMLDivElement>(null);

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
            if (e.key === "`" && !searchOpen && !mobileOpen)  { e.preventDefault(); setSearchOpen(true); }
            if (e.key === "Escape" && mobileOpen)              setMobileOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [searchOpen, mobileOpen]);
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
                            <div className="w-px h-5 bg-gradient-to-b from-transparent via-border to-transparent mx-2" />
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem className="hidden md:flex">
                                        <NavigationMenuTrigger>Arsha Esports</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {esportsNav.map((item) => (
                                                    <ListItem href={item.path} title={item.label} key={item.path}>
                                                        {item.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    {isAuthenticated && (
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger>Arsha App</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="w-96">
                                                    {protectedNav.map((item) => (
                                                        <ListItem href={item.path} title={item.label} key={item.path}>
                                                            {item.description}
                                                        </ListItem>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    )}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </nav>

                        {/* Right controls */}
                        <div className="ml-auto flex items-center gap-2">

                            {/* Search */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="hidden lg:flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-border hover:bg-muted/60 hover:text-foreground"
                            >
                                <Search size={13} className="shrink-0" />
                                <span className="hidden lg:inline">Search…</span>
                                <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-border/60 bg-background px-1.5 py-0.5 text-[10px]">
                                    ⌘K
                                </kbd>
                            </button>

                            {/* Auth state — hidden while session is loading to prevent flash */}
                            {!loading && (
                                isAuthenticated ? (
                                    <div className="hidden lg:flex items-center gap-2">
                                        <UserDropdown username={username ?? "User"} logout={logout} />
                                    </div>
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
                                )
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
                                <motion.div
                                    key="backdrop"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="fixed inset-0 top-[calc(theme(spacing.14)+theme(spacing.6))] bg-background/70 backdrop-blur-sm lg:hidden"
                                    onClick={() => setMobileOpen(false)}
                                />

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

                                    {/* Authenticated: collapsible Arsha app links */}
                                    {!loading && isAuthenticated && (
                                        <div className="mb-4">
                                            <Collapsible>
                                                <CollapsibleTrigger className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-muted/60 hover:text-foreground transition-colors">
                                                    <Swords size={16} className="shrink-0" />
                                                    Arsha
                                                    <ChevronDown size={14} className="ml-auto text-muted-foreground" />
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="pl-4">
                                                    <div className="space-y-0.5 border-l border-border/40 pl-3 py-1">
                                                        {protectedNav.map((item) => (
                                                            <NavLink key={item.path} item={item} currentPath={pathname} onClick={() => setMobileOpen(false)} mobile />
                                                        ))}
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </div>
                                    )}
                                    <div className="h-px bg-border/40 mb-4" />

                                    {/* Auth section */}
                                    {!loading && (
                                        isAuthenticated ? (
                                            <div>
                                                <p className="mb-1.5 px-3 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                                                    Your account
                                                </p>
                                                <div className="space-y-0.5">
                                                    {[
                                                        { path: ROUTE_PATHS.ARSHAAPP.DASHBOARD,             label: "Dashboard", icon: LayoutDashboard },
                                                        { path: ROUTE_PATHS.ARSHAAPP?.PROFILE || "/profile", label: "Profile",   icon: UserCircle },
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
                                        )
                                    )}
                                    <NavbarFooter/>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </header>

                {/* Height spacer */}
                <div className="h-14" />
            </div>

            {/* Search overlay */}
            <AnimatePresence>
                {searchOpen && <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default Navbar;