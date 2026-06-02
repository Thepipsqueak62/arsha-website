"use client";

import { useState } from "react";
import { Trophy, Globe, Users, ChevronRight, Star, Flame, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Data ───────────────────────────────────────────────────────────────────

const GAMES = ["All", "CS2", "League of Legends", "Valorant", "Dota 2"] as const;
type Game = (typeof GAMES)[number];

interface EsportsTeam {
    id: number;
    name: string;
    tag: string;
    region: string;
    games: string[];
    rank: number;
    rating: number;
    earnings: string;
    winRate: string;
    founded: string;
    players: number;
    tier: "S" | "A" | "B";
    color: string;       // primary brand color
    accent: string;      // tailwind bg class for the glow/accent
    hot?: boolean;
    description: string;
}

const TEAMS: EsportsTeam[] = [
    {
        id: 1,
        name: "Team Vitality",
        tag: "VIT",
        region: "EU",
        games: ["CS2", "League of Legends", "Valorant"],
        rank: 1,
        rating: 1707,
        earnings: "$4.2M",
        winRate: "68%",
        founded: "2013",
        players: 30,
        tier: "S",
        color: "#FFD700",
        accent: "from-yellow-500/20 to-transparent",
        hot: true,
        description: "French powerhouse dominating CS2 with the world's #1 rating. Trains at Stade de France.",
    },
    {
        id: 2,
        name: "Team Spirit",
        tag: "SPR",
        region: "EU",
        games: ["CS2", "Dota 2"],
        rank: 2,
        rating: 1574,
        earnings: "$3.79M",
        winRate: "65%",
        founded: "2015",
        players: 20,
        tier: "S",
        color: "#00BFFF",
        accent: "from-sky-500/20 to-transparent",
        description: "Elite CIS roster consistently placing top at CS2 Majors and The International.",
    },
    {
        id: 3,
        name: "Natus Vincere",
        tag: "NAVI",
        region: "EU",
        games: ["CS2", "Dota 2"],
        rank: 3,
        rating: 1508,
        earnings: "$5.1M",
        winRate: "63%",
        founded: "2009",
        players: 25,
        tier: "S",
        color: "#F97316",
        accent: "from-orange-500/20 to-transparent",
        hot: true,
        description: "Legendary Ukrainian org and one of the most decorated names in all of esports.",
    },
    {
        id: 4,
        name: "Team Falcons",
        tag: "FAL",
        region: "MENA",
        games: ["CS2", "Dota 2", "Valorant"],
        rank: 4,
        rating: 1505,
        earnings: "$4.33M",
        winRate: "61%",
        founded: "2021",
        players: 35,
        tier: "S",
        color: "#A855F7",
        accent: "from-purple-500/20 to-transparent",
        description: "Saudi-backed powerhouse growing rapidly across multiple titles with massive funding.",
    },
    {
        id: 5,
        name: "Gen.G",
        tag: "GEN",
        region: "KR",
        games: ["League of Legends", "Valorant"],
        rank: 5,
        rating: 1482,
        earnings: "$2.9M",
        winRate: "71%",
        founded: "2017",
        players: 18,
        tier: "S",
        color: "#22C55E",
        accent: "from-green-500/20 to-transparent",
        hot: true,
        description: "Korean giants reigning supreme in the LCK, often the World Championship favourites.",
    },
    {
        id: 6,
        name: "T1",
        tag: "T1",
        region: "KR",
        games: ["League of Legends"],
        rank: 6,
        rating: 1452,
        earnings: "$6.8M",
        winRate: "70%",
        founded: "2002",
        players: 15,
        tier: "S",
        color: "#EF4444",
        accent: "from-red-500/20 to-transparent",
        description: "Home of Faker — the most successful League of Legends org in history. Four-time World Champions.",
    },
    {
        id: 7,
        name: "Team Liquid",
        tag: "TL",
        region: "NA",
        games: ["CS2", "Dota 2", "League of Legends", "Valorant"],
        rank: 7,
        rating: 1430,
        earnings: "$4.86M",
        winRate: "60%",
        founded: "2000",
        players: 50,
        tier: "A",
        color: "#38BDF8",
        accent: "from-cyan-500/20 to-transparent",
        description: "The most multi-title org in NA with active rosters across nearly every major esport.",
    },
    {
        id: 8,
        name: "G2 Esports",
        tag: "G2",
        region: "EU",
        games: ["CS2", "League of Legends", "Valorant"],
        rank: 8,
        rating: 1420,
        earnings: "$3.5M",
        winRate: "62%",
        founded: "2014",
        players: 40,
        tier: "A",
        color: "#EC4899",
        accent: "from-pink-500/20 to-transparent",
        hot: true,
        description: "European entertainers known for flashy plays. Reached LEC Spring 2026 Grand Final.",
    },
    {
        id: 9,
        name: "FaZe Clan",
        tag: "FaZe",
        region: "NA",
        games: ["CS2", "Valorant"],
        rank: 9,
        rating: 1390,
        earnings: "$3.1M",
        winRate: "59%",
        founded: "2010",
        players: 30,
        tier: "A",
        color: "#F59E0B",
        accent: "from-amber-500/20 to-transparent",
        description: "One of the most recognisable brands in gaming, with a massive global fanbase.",
    },
    {
        id: 10,
        name: "Paper Rex",
        tag: "PRX",
        region: "APAC",
        games: ["Valorant"],
        rank: 10,
        rating: 1285,
        earnings: "$1.8M",
        winRate: "64%",
        founded: "2018",
        players: 12,
        tier: "A",
        color: "#06B6D4",
        accent: "from-teal-500/20 to-transparent",
        description: "Singapore's finest — the world's #1 Valorant team, known for an aggressive attacking style.",
    },
    {
        id: 11,
        name: "MOUZ",
        tag: "MOUZ",
        region: "EU",
        games: ["CS2"],
        rank: 11,
        rating: 1427,
        earnings: "$2.2M",
        winRate: "61%",
        founded: "1997",
        players: 10,
        tier: "A",
        color: "#6366F1",
        accent: "from-indigo-500/20 to-transparent",
        description: "Veteran German org with one of CS2's youngest and most dangerous rosters.",
    },
    {
        id: 12,
        name: "NRG",
        tag: "NRG",
        region: "NA",
        games: ["Valorant"],
        rank: 12,
        rating: 1227,
        earnings: "$1.4M",
        winRate: "62%",
        founded: "2015",
        players: 12,
        tier: "B",
        color: "#F97316",
        accent: "from-orange-400/20 to-transparent",
        description: "NA's top Valorant squad, consistently competing in international VCT events.",
    },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

const TIER_STYLES: Record<string, string> = {
    S: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    A: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    B: "bg-slate-500/20 text-slate-300 border-slate-500/40",
};

const REGION_FLAG: Record<string, string> = {
    EU: "🇪🇺",
    KR: "🇰🇷",
    NA: "🇺🇸",
    APAC: "🌏",
    MENA: "🇸🇦",
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatPill({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">{label}</span>
            <span className="text-sm font-bold text-white/90">{value}</span>
        </div>
    );
}

function TeamCard({ team }: { team: EsportsTeam }) {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03]
                        hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
        >
            {/* ambient color bleed */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${team.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* rank badge */}
            <div className="absolute top-3 right-3 z-10">
                <span className="text-[10px] font-black tracking-wider text-white/30">#{team.rank}</span>
            </div>

            <div className="relative p-5">
                {/* Header row */}
                <div className="flex items-start gap-4">
                    {/* Avatar/initials */}
                    <div
                        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg"
                        style={{ background: `${team.color}22`, border: `1.5px solid ${team.color}55`, color: team.color }}
                    >
                        {team.tag.slice(0, 3)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-extrabold text-white text-base leading-tight truncate">{team.name}</h3>
                            {team.hot && (
                                <span className="flex items-center gap-0.5 text-[10px] font-bold text-orange-400">
                                    <Flame size={10} /> HOT
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-white/40">
                                {REGION_FLAG[team.region]} {team.region}
                            </span>
                            <span className="text-white/20 text-xs">·</span>
                            <span className="text-xs text-white/40">Est. {team.founded}</span>
                        </div>
                        {/* Tier badge */}
                        <div className="mt-2">
                            <span
                                className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-md border ${TIER_STYLES[team.tier]}`}
                            >
                                TIER {team.tier}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-white/50 leading-relaxed line-clamp-2">{team.description}</p>

                {/* Games */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {team.games.map((g) => (
                        <span
                            key={g}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-white/60 border border-white/[0.08]"
                        >
                            {g}
                        </span>
                    ))}
                </div>

                {/* Stats row */}
                <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-4 gap-2">
                    <StatPill label="Rating" value={String(team.rating)} />
                    <StatPill label="Win%" value={team.winRate} />
                    <StatPill label="Earnings" value={team.earnings} />
                    <StatPill label="Roster" value={`${team.players}`} />
                </div>

                {/* CTA */}
                <button
                    className="mt-4 w-full flex items-center justify-center gap-1.5 rounded-xl py-2
                                text-xs font-bold text-white/50 border border-white/[0.07]
                                hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200"
                >
                    View Roster <ChevronRight size={12} />
                </button>
            </div>
        </div>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TeamsPage() {
    const [search, setSearch] = useState("");
    const [activeGame, setActiveGame] = useState<Game>("All");

    const filtered = TEAMS.filter((t) => {
        const matchesGame = activeGame === "All" || t.games.includes(activeGame);
        const matchesSearch =
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.tag.toLowerCase().includes(search.toLowerCase()) ||
            t.region.toLowerCase().includes(search.toLowerCase());
        return matchesGame && matchesSearch;
    });

    const topThree = filtered.slice(0, 3);

    return (
        <div className="min-h-screen bg-[#080b12] text-white">
            {/* Background grid */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* ── Header ── */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500" />
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/40">Season 2026</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                        Top{" "}
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                            Esports
                        </span>
                        <br />
                        Teams
                    </h1>
                    <p className="mt-4 text-white/40 text-sm sm:text-base max-w-lg">
                        The world's elite competitive gaming organisations, ranked by live performance ratings across all major titles.
                    </p>
                </div>

                {/* ── Stats bar ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[
                        { icon: <Trophy size={14} />, label: "Ranked Teams", value: "12" },
                        { icon: <Globe size={14} />, label: "Regions", value: "5" },
                        { icon: <Users size={14} />, label: "Pro Players", value: "297+" },
                        { icon: <Zap size={14} />, label: "Active Titles", value: "4" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 flex items-center gap-3"
                        >
                            <div className="text-yellow-400">{s.icon}</div>
                            <div>
                                <div className="text-white font-bold text-lg leading-none">{s.value}</div>
                                <div className="text-white/40 text-[10px] mt-0.5 uppercase tracking-wider">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Podium (top 3) ── */}
                {activeGame === "All" && search === "" && (
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Star size={14} className="text-yellow-400" />
                            <span className="text-xs font-bold tracking-widest uppercase text-white/40">Podium</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {topThree.map((team, i) => (
                                <div
                                    key={team.id}
                                    className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-5
                                               flex items-center gap-4 hover:border-white/20 transition-all duration-300 cursor-pointer"
                                    style={{ background: `linear-gradient(135deg, ${team.color}18 0%, transparent 60%)` }}
                                >
                                    <div
                                        className="text-5xl font-black opacity-10 absolute right-4 top-1/2 -translate-y-1/2 select-none"
                                        style={{ color: team.color }}
                                    >
                                        {i + 1}
                                    </div>
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                                        style={{
                                            background: `${team.color}22`,
                                            border: `1.5px solid ${team.color}55`,
                                            color: team.color,
                                        }}
                                    >
                                        {team.tag.slice(0, 3)}
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-white text-sm">{team.name}</div>
                                        <div className="text-white/40 text-xs mt-0.5">
                                            {REGION_FLAG[team.region]} {team.region} · Rating {team.rating}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Filters ── */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <Input
                            placeholder="Search teams…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30
                                       focus-visible:ring-yellow-500/30 focus-visible:border-yellow-500/40 rounded-xl h-10 text-sm"
                        />
                    </div>

                    {/* Game tabs */}
                    <div className="flex gap-1.5 flex-wrap">
                        {GAMES.map((g) => (
                            <Button
                                key={g}
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveGame(g)}
                                className={`rounded-xl text-xs font-bold h-10 px-4 transition-all duration-200
                                    ${
                                    activeGame === g
                                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 hover:bg-yellow-500/25"
                                        : "text-white/40 border border-transparent hover:text-white/70 hover:bg-white/[0.05]"
                                }`}
                            >
                                {g}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* ── Grid ── */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map((team) => (
                            <TeamCard key={team.id} team={team} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 text-white/30">
                        <Shield size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No teams found for "{search}"</p>
                    </div>
                )}

                {/* ── Footer note ── */}
                <p className="mt-12 text-center text-white/20 text-xs">
                    Ratings sourced from GosuGamers & HLTV · Updated May 2026
                </p>
            </div>
        </div>
    );
}