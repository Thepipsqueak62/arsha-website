import {type FormEvent, useEffect, useRef, useState} from "react";
import {SearchResult} from "@/types/SearchResult.types";
import {useRouter} from "next/navigation";
import {mockSearchResults} from "@/mock-data/mockSearchResults";
import {motion} from "framer-motion";
import {ChevronRight, History, Search} from "lucide-react";
import {mockRecentSearches} from "@/mock-data/mockRecentSearches";

export const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [query,   setQuery]   = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router   = useRouter();

    useEffect(() => {
        if (isOpen) {
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