"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Radio, Eye, Flame, Zap } from "lucide-react";
import { liveStreams } from "@/mock-data/streams";
import StreamCard from "@/components/arsha-app-ui/StreamCard";

const GAMES = ["All", "CS2", "League of Legends", "Valorant", "Dota 2", "Rocket League"] as const;
type GameFilter = (typeof GAMES)[number];

function formatViewers(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
}

const totalViewers = liveStreams.reduce((sum, s) => sum + s.viewers, 0);

export default function LiveStreamsPage() {
    const [search, setSearch] = useState("");
    const [activeGame, setActiveGame] = useState<GameFilter>("All");

    const filtered = liveStreams.filter((s) => {
        const matchesGame = activeGame === "All" || s.game === activeGame;
        const matchesSearch =
            s.title.toLowerCase().includes(search.toLowerCase()) ||
            s.streamer.toLowerCase().includes(search.toLowerCase()) ||
            s.game.toLowerCase().includes(search.toLowerCase());
        return matchesGame && matchesSearch;
    });

    const featured = filtered[0];
    const rest = filtered.slice(1);

    return (
        <div className="min-h-screen bg-[#080b12] text-white">
            {/* subtle grid bg */}
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
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/40">Live Now</span>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                        Live{" "}
                        <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            Streams
                        </span>
                    </h1>
                    <p className="mt-3 text-white/40 text-sm max-w-lg">
                        {liveStreams.length} streams broadcasting right now across all major esports titles.
                    </p>
                </div>

                {/* ── Stats bar ── */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                        { icon: <Radio size={13} />, label: "Live Channels", value: String(liveStreams.length), color: "text-red-400" },
                        { icon: <Eye size={13} />, label: "Total Viewers", value: formatViewers(totalViewers), color: "text-orange-400" },
                        { icon: <Flame size={13} />, label: "Peak Game", value: "CS2", color: "text-yellow-400" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 flex items-center gap-3"
                        >
                            <div className={s.color}>{s.icon}</div>
                            <div>
                                <div className="text-white font-bold text-base leading-none">{s.value}</div>
                                <div className="text-white/40 text-[10px] mt-0.5 uppercase tracking-wider">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Featured stream (top result) ── */}
                {featured && search === "" && activeGame === "All" && (
                    <div
                        className="relative overflow-hidden rounded-2xl border border-white/[0.08] mb-8 cursor-pointer
                                   hover:border-white/20 transition-all duration-300 group"
                        style={{ background: `linear-gradient(135deg, ${featured.accentColor}18 0%, #0d1117 70%)` }}
                    >
                        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                            {/* Avatar */}
                            <div
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-lg sm:text-xl"
                                style={{
                                    background: `${featured.accentColor}22`,
                                    border: `2px solid ${featured.accentColor}55`,
                                    color: featured.accentColor,
                                }}
                            >
                                {featured.avatarInitials}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <div className="flex items-center gap-1.5 bg-red-600 rounded-md px-2 py-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        <span className="text-[10px] font-black tracking-wider text-white">LIVE</span>
                                    </div>
                                    <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Featured</span>
                                    <span
                                        className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                                        style={{ background: `${featured.accentColor}22`, color: featured.accentColor }}
                                    >
                                        {featured.game}
                                    </span>
                                </div>
                                <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight line-clamp-2">
                                    {featured.title}
                                </h2>
                                <div className="flex flex-wrap items-center gap-4 mt-3">
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <Eye size={13} className="text-white/40" />
                                        <span className="font-bold text-white/80">{formatViewers(featured.viewers)}</span>
                                        <span className="text-white/40 text-xs">watching</span>
                                    </div>
                                    <span className="text-white/40 text-xs">by {featured.streamer}</span>
                                    <span className="text-white/40 text-xs">{featured.duration} elapsed</span>
                                </div>
                            </div>

                            <button
                                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
                                style={{
                                    background: `${featured.accentColor}`,
                                    color: "#000",
                                }}
                            >
                                <Radio size={14} />
                                Watch Live
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Filters ── */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <Input
                            placeholder="Search streams, streamers…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30
                                       focus-visible:ring-red-500/30 focus-visible:border-red-500/40 rounded-xl h-10 text-sm"
                        />
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                        {GAMES.map((g) => (
                            <Button
                                key={g}
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveGame(g)}
                                className={`rounded-xl text-xs font-bold h-10 px-3 transition-all duration-200
                                    ${activeGame === g
                                    ? "bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/25"
                                    : "text-white/40 border border-transparent hover:text-white/70 hover:bg-white/[0.05]"}`}
                            >
                                {g}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* ── Grid ── */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {(search !== "" || activeGame !== "All" ? filtered : rest).map((stream) => (
                            <StreamCard key={stream.id} stream={stream} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 text-white/30">
                        <Radio size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No streams found for "{search}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}