"use client";

import { useState } from "react";
import { Search, Clock, Trophy, Flame, ChevronRight, Shield, Swords } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ── Types ────────────────────────────────────────────────────────────────────

type MatchStatus = "LIVE" | "UPCOMING" | "COMPLETED";

interface Match {
    id: number;
    teamA: string;
    teamB: string;
    tagA: string;
    tagB: string;
    scoreA: number | null;
    scoreB: number | null;
    game: string;
    tournament: string;
    status: MatchStatus;
    time: string;        // e.g. "Now", "3:00 PM EST", "Ended"
    map?: string;
    bestOf: number;
    accentA: string;
    accentB: string;
    viewers?: number;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const MATCHES: Match[] = [
    {
        id: 1,
        teamA: "Natus Vincere", teamB: "Team Vitality",
        tagA: "NAVI", tagB: "VIT",
        scoreA: 13, scoreB: 9,
        game: "CS2", tournament: "IEM Cologne 2026",
        status: "LIVE", time: "Live · Map 2",
        map: "Mirage", bestOf: 3,
        accentA: "#F97316", accentB: "#FFD700",
        viewers: 196200,
    },
    {
        id: 2,
        teamA: "T1", teamB: "Gen.G",
        tagA: "T1", tagB: "GEN",
        scoreA: 1, scoreB: 0,
        game: "League of Legends", tournament: "LCK Summer 2026",
        status: "LIVE", time: "Live · Game 2",
        bestOf: 3,
        accentA: "#EF4444", accentB: "#22C55E",
        viewers: 284500,
    },
    {
        id: 3,
        teamA: "Paper Rex", teamB: "NRG",
        tagA: "PRX", tagB: "NRG",
        scoreA: null, scoreB: null,
        game: "Valorant", tournament: "VCT Masters Bangkok",
        status: "UPCOMING", time: "Today, 6:00 PM EST",
        bestOf: 5,
        accentA: "#38BDF8", accentB: "#F97316",
    },
    {
        id: 4,
        teamA: "G2 Esports", teamB: "Fnatic",
        tagA: "G2", tagB: "FNC",
        scoreA: null, scoreB: null,
        game: "League of Legends", tournament: "LEC Spring 2026 Grand Final",
        status: "UPCOMING", time: "Jun 1, 5:00 PM CET",
        bestOf: 5,
        accentA: "#EC4899", accentB: "#F97316",
    },
    {
        id: 5,
        teamA: "Team Falcons", teamB: "MOUZ",
        tagA: "FAL", tagB: "MOUZ",
        scoreA: null, scoreB: null,
        game: "CS2", tournament: "ESL Pro League S21",
        status: "UPCOMING", time: "Jun 1, 8:00 PM EST",
        bestOf: 3,
        accentA: "#A855F7", accentB: "#6366F1",
    },
    {
        id: 6,
        teamA: "Team Spirit", teamB: "FaZe Clan",
        tagA: "SPR", tagB: "FaZe",
        scoreA: 2, scoreB: 1,
        game: "CS2", tournament: "IEM Cologne 2026",
        status: "COMPLETED", time: "Ended · 2h ago",
        bestOf: 3,
        accentA: "#38BDF8", accentB: "#FFD700",
    },
    {
        id: 7,
        teamA: "Bilibili Gaming", teamB: "Anyone's Legend",
        tagA: "BLG", tagB: "AL",
        scoreA: 3, scoreB: 1,
        game: "League of Legends", tournament: "LPL Summer 2026",
        status: "COMPLETED", time: "Ended · 5h ago",
        bestOf: 5,
        accentA: "#38BDF8", accentB: "#F59E0B",
    },
    {
        id: 8,
        teamA: "Fnatic", teamB: "G2 Esports",
        tagA: "FNC", tagB: "G2",
        scoreA: null, scoreB: null,
        game: "Valorant", tournament: "VCT EMEA 2026",
        status: "UPCOMING", time: "Jun 2, 3:00 PM CET",
        bestOf: 3,
        accentA: "#F97316", accentB: "#EC4899",
    },
];

const GAMES = ["All", "CS2", "League of Legends", "Valorant", "Dota 2"] as const;
type GameFilter = (typeof GAMES)[number];

const STATUSES: { id: MatchStatus | "ALL"; label: string }[] = [
    { id: "ALL", label: "All" },
    { id: "LIVE", label: "Live" },
    { id: "UPCOMING", label: "Upcoming" },
    { id: "COMPLETED", label: "Completed" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatViewers(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
}

function StatusBadge({ status }: { status: MatchStatus }) {
    if (status === "LIVE") return (
        <div className="flex items-center gap-1.5 bg-red-600 rounded-md px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-black tracking-wider text-white">LIVE</span>
        </div>
    );
    if (status === "UPCOMING") return (
        <div className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.1] rounded-md px-2 py-0.5">
            <Clock size={9} className="text-white/50" />
            <span className="text-[10px] font-black tracking-wider text-white/60">UPCOMING</span>
        </div>
    );
    return (
        <div className="flex items-center gap-1.5 bg-white/[0.04] rounded-md px-2 py-0.5">
            <span className="text-[10px] font-black tracking-wider text-white/30">ENDED</span>
        </div>
    );
}

// ── Match Card ────────────────────────────────────────────────────────────────

function MatchCard({ match }: { match: Match }) {
    const isLive = match.status === "LIVE";
    const isCompleted = match.status === "COMPLETED";

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer
                ${isLive
                ? "border-red-500/30 bg-red-500/[0.04] hover:border-red-500/50"
                : "border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
            }`}
        >
            {/* live glow strip */}
            {isLive && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
            )}

            <div className="p-4 sm:p-5">
                {/* Top row: tournament + status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 min-w-0">
                        <Trophy size={11} className="text-white/30 flex-shrink-0" />
                        <span className="text-[11px] text-white/40 font-medium truncate">{match.tournament}</span>
                        <span className="text-white/20 text-[10px]">·</span>
                        <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
                        >
                            BO{match.bestOf}
                        </span>
                    </div>
                    <StatusBadge status={match.status} />
                </div>

                {/* VS row */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    {/* Team A */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-[11px]"
                            style={{ background: `${match.accentA}22`, border: `1.5px solid ${match.accentA}44`, color: match.accentA }}
                        >
                            {match.tagA.slice(0, 4)}
                        </div>
                        <div className="min-w-0">
                            <div className={`font-extrabold text-sm leading-tight truncate
                                ${isCompleted && match.scoreA! > match.scoreB! ? "text-white" : isCompleted ? "text-white/40" : "text-white"}`}>
                                {match.teamA}
                            </div>
                            <div className="text-[10px] text-white/30 mt-0.5">{match.tagA}</div>
                        </div>
                    </div>

                    {/* Score / VS */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
                        {match.scoreA !== null ? (
                            <div className="flex items-center gap-2">
                                <span className={`text-2xl font-black tabular-nums leading-none
                                    ${isCompleted ? (match.scoreA > match.scoreB! ? "text-white" : "text-white/30") : "text-white"}`}>
                                    {match.scoreA}
                                </span>
                                <span className="text-white/20 text-lg font-black">:</span>
                                <span className={`text-2xl font-black tabular-nums leading-none
                                    ${isCompleted ? (match.scoreB! > match.scoreA ? "text-white" : "text-white/30") : "text-white"}`}>
                                    {match.scoreB}
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <Swords size={14} className="text-white/20" />
                            </div>
                        )}
                        {match.map && (
                            <span className="text-[9px] text-white/30 font-medium">{match.map}</span>
                        )}
                        {!match.map && (
                            <span className="text-[9px] text-white/30 font-medium">{match.game}</span>
                        )}
                    </div>

                    {/* Team B */}
                    <div className="flex flex-col sm:flex-row-reverse items-end sm:items-center gap-2 sm:gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-[11px]"
                            style={{ background: `${match.accentB}22`, border: `1.5px solid ${match.accentB}44`, color: match.accentB }}
                        >
                            {match.tagB.slice(0, 4)}
                        </div>
                        <div className="min-w-0 text-right">
                            <div className={`font-extrabold text-sm leading-tight truncate
                                ${isCompleted && match.scoreB! > match.scoreA! ? "text-white" : isCompleted ? "text-white/40" : "text-white"}`}>
                                {match.teamB}
                            </div>
                            <div className="text-[10px] text-white/30 mt-0.5">{match.tagB}</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <Clock size={10} className="text-white/30" />
                            <span className={`text-[11px] font-medium ${isLive ? "text-red-400" : "text-white/40"}`}>
                                {match.time}
                            </span>
                        </div>
                        {isLive && match.viewers && (
                            <div className="flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-red-500" />
                                <span className="text-[11px] text-white/40 font-medium">{formatViewers(match.viewers)} watching</span>
                            </div>
                        )}
                    </div>
                    <button className="flex items-center gap-1 text-[11px] font-bold text-white/30 hover:text-white/70 transition-colors">
                        Details <ChevronRight size={11} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TournamentMatchesPage() {
    const [search, setSearch] = useState("");
    const [activeGame, setActiveGame] = useState<GameFilter>("All");
    const [activeStatus, setActiveStatus] = useState<MatchStatus | "ALL">("ALL");

    const filtered = MATCHES.filter((m) => {
        const matchesGame = activeGame === "All" || m.game === activeGame;
        const matchesStatus = activeStatus === "ALL" || m.status === activeStatus;
        const matchesSearch =
            m.teamA.toLowerCase().includes(search.toLowerCase()) ||
            m.teamB.toLowerCase().includes(search.toLowerCase()) ||
            m.tournament.toLowerCase().includes(search.toLowerCase());
        return matchesGame && matchesStatus && matchesSearch;
    });

    const live = filtered.filter((m) => m.status === "LIVE");
    const upcoming = filtered.filter((m) => m.status === "UPCOMING");
    const completed = filtered.filter((m) => m.status === "COMPLETED");

    const showSections = activeStatus === "ALL" && search === "" && activeGame === "All";

    return (
        <div className="min-h-screen bg-[#080b12] text-white">
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* ── Header ── */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-emerald-400 to-teal-600" />
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/40">Season 2026</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                        Match{" "}
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                            Centre
                        </span>
                    </h1>
                    <p className="mt-3 text-white/40 text-sm max-w-lg">
                        Live scores, upcoming fixtures, and results across all major esports titles.
                    </p>
                </div>

                {/* ── Stats bar ── */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                        { icon: <Flame size={13} />, label: "Live Now", value: String(MATCHES.filter(m => m.status === "LIVE").length), color: "text-red-400" },
                        { icon: <Clock size={13} />, label: "Upcoming", value: String(MATCHES.filter(m => m.status === "UPCOMING").length), color: "text-emerald-400" },
                        { icon: <Trophy size={13} />, label: "Completed", value: String(MATCHES.filter(m => m.status === "COMPLETED").length), color: "text-white/40" },
                    ].map((s) => (
                        <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 flex items-center gap-3">
                            <div className={s.color}>{s.icon}</div>
                            <div>
                                <div className="text-white font-bold text-base leading-none">{s.value}</div>
                                <div className="text-white/40 text-[10px] mt-0.5 uppercase tracking-wider">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Filters ── */}
                <div className="flex flex-col gap-3 mb-8">
                    {/* Search */}
                    <div className="relative max-w-sm">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <Input
                            placeholder="Search teams or tournaments…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30
                                       focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/40 rounded-xl h-10 text-sm"
                        />
                    </div>

                    {/* Status + Game filters */}
                    <div className="flex flex-wrap gap-2">
                        {STATUSES.map((s) => (
                            <Button key={s.id} variant="ghost" size="sm"
                                    onClick={() => setActiveStatus(s.id)}
                                    className={`rounded-xl text-xs font-bold h-8 px-3 transition-all duration-200
                                    ${activeStatus === s.id
                                        ? s.id === "LIVE"
                                            ? "bg-red-500/20 text-red-300 border border-red-500/40"
                                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                        : "text-white/40 border border-transparent hover:text-white/70 hover:bg-white/[0.05]"}`}
                            >
                                {s.id === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1.5" />}
                                {s.label}
                            </Button>
                        ))}

                        <div className="w-px bg-white/[0.08] mx-1 self-stretch" />

                        {GAMES.map((g) => (
                            <Button key={g} variant="ghost" size="sm"
                                    onClick={() => setActiveGame(g)}
                                    className={`rounded-xl text-xs font-bold h-8 px-3 transition-all duration-200
                                    ${activeGame === g
                                        ? "bg-white/10 text-white border border-white/20"
                                        : "text-white/40 border border-transparent hover:text-white/70 hover:bg-white/[0.05]"}`}
                            >
                                {g}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* ── Match list ── */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-white/30">
                        <Swords size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No matches found</p>
                    </div>
                ) : showSections ? (
                    <div className="space-y-8">
                        {live.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <h2 className="text-xs font-black tracking-widest uppercase text-red-400">Live</h2>
                                    <div className="flex-1 h-px bg-white/[0.06]" />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {live.map((m) => <MatchCard key={m.id} match={m} />)}
                                </div>
                            </section>
                        )}
                        {upcoming.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <h2 className="text-xs font-black tracking-widest uppercase text-emerald-400">Upcoming</h2>
                                    <div className="flex-1 h-px bg-white/[0.06]" />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {upcoming.map((m) => <MatchCard key={m.id} match={m} />)}
                                </div>
                            </section>
                        )}
                        {completed.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-white/20" />
                                    <h2 className="text-xs font-black tracking-widest uppercase text-white/30">Results</h2>
                                    <div className="flex-1 h-px bg-white/[0.06]" />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {completed.map((m) => <MatchCard key={m.id} match={m} />)}
                                </div>
                            </section>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {filtered.map((m) => <MatchCard key={m.id} match={m} />)}
                    </div>
                )}
            </div>
        </div>
    );
}