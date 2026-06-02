"use client";

import { useState } from "react";
import { Search, Play, Eye, Clock, Star, Film } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { recentVODs } from "@/mock-data/streams";
import type { VOD } from "@/mock-data/streams";

const GAMES = ["All", "CS2", "League of Legends", "Valorant", "Dota 2", "Rocket League", "Dune: Awakening"] as const;
type GameFilter = (typeof GAMES)[number];

const PLATFORM_COLOR: Record<string, string> = {
    Twitch: "#9147ff",
    YouTube: "#FF0000",
    Kick: "#53FC18",
};

function formatViews(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return String(n);
}

function VODCard({ vod, featured = false }: { vod: VOD; featured?: boolean }) {
    if (featured) {
        return (
            <div
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] cursor-pointer
                           hover:border-white/20 transition-all duration-300 col-span-1 sm:col-span-2"
                style={{ background: `linear-gradient(135deg, ${vod.accentColor}18 0%, #0d1117 70%)` }}
            >
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    {/* big avatar */}
                    <div
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-xl"
                        style={{
                            background: `${vod.accentColor}22`,
                            border: `2px solid ${vod.accentColor}55`,
                            color: vod.accentColor,
                        }}
                    >
                        {vod.avatarInitials}
                        {/* play overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play size={24} className="text-white fill-white" />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                                className="text-[10px] font-black px-2 py-0.5 rounded-md"
                                style={{ background: `${vod.accentColor}22`, color: vod.accentColor, border: `1px solid ${vod.accentColor}44` }}
                            >
                                {vod.game}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star size={10} className="fill-yellow-400" />
                                <span className="text-[10px] font-bold">Top VOD</span>
                            </div>
                        </div>
                        <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-tight line-clamp-2">{vod.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-white/50">
                            <div className="flex items-center gap-1.5">
                                <Eye size={12} />
                                <span className="font-bold text-white/80">{formatViews(vod.views)}</span> views
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={12} />
                                <span>{vod.duration}</span>
                            </div>
                            <span>by {vod.streamer}</span>
                            <span>{vod.publishedAt}</span>
                        </div>
                    </div>

                    <button
                        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
                        style={{ background: vod.accentColor, color: "#000" }}
                    >
                        <Play size={14} className="fill-black" />
                        Watch
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03]
                        hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer flex flex-col"
        >
            {/* Thumbnail */}
            <div
                className="relative h-36 sm:h-40 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${vod.accentColor}22 0%, #0d1117 100%)` }}
            >
                <span className="select-none font-black text-7xl opacity-[0.07]" style={{ color: vod.accentColor }}>
                    {vod.avatarInitials}
                </span>

                {/* duration chip */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-md px-2 py-0.5">
                    <Clock size={9} className="text-white/60" />
                    <span className="text-[10px] text-white/80 font-medium">{vod.duration}</span>
                </div>

                {/* platform */}
                <div
                    className="absolute top-3 right-3 text-[9px] font-black px-2 py-0.5 rounded-md"
                    style={{ background: `${PLATFORM_COLOR[vod.platform]}33`, color: PLATFORM_COLOR[vod.platform], border: `1px solid ${PLATFORM_COLOR[vod.platform]}55` }}
                >
                    {vod.platform.toUpperCase()}
                </div>

                {/* play overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play size={20} className="text-white fill-white translate-x-0.5" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-2.5">
                <div className="flex items-center gap-2">
                    <div
                        className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center font-black text-[9px]"
                        style={{ background: `${vod.accentColor}22`, border: `1.5px solid ${vod.accentColor}44`, color: vod.accentColor }}
                    >
                        {vod.avatarInitials.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                        <span className="text-[10px] font-bold text-white/60 truncate block">{vod.streamer}</span>
                        <span className="text-[9px] text-white/30">{vod.game}</span>
                    </div>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 flex-1">{vod.title}</h3>

                <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1">
                        <Eye size={10} />
                        <span className="font-bold text-white/60">{formatViews(vod.views)}</span>
                    </div>
                    <span>{vod.publishedAt}</span>
                </div>
            </div>
        </div>
    );
}

export default function VodsPage() {
    const [search, setSearch] = useState("");
    const [activeGame, setActiveGame] = useState<GameFilter>("All");

    const filtered = recentVODs.filter((v) => {
        const matchesGame = activeGame === "All" || v.game === activeGame;
        const matchesSearch =
            v.title.toLowerCase().includes(search.toLowerCase()) ||
            v.streamer.toLowerCase().includes(search.toLowerCase()) ||
            v.game.toLowerCase().includes(search.toLowerCase());
        return matchesGame && matchesSearch;
    });

    const highlights = filtered.filter((v) => v.highlight);
    const regular = filtered.filter((v) => !v.highlight);
    const showingAll = search === "" && activeGame === "All";
    const totalViews = recentVODs.reduce((a, v) => a + v.views, 0);

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
                        <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-violet-400 to-indigo-600" />
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/40">Video Archive</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                        Recent{" "}
                        <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                            VODs
                        </span>
                    </h1>
                    <p className="mt-3 text-white/40 text-sm max-w-lg">
                        Catch up on the best esports broadcasts — on demand, any time.
                    </p>
                </div>

                {/* ── Stats bar ── */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                        { icon: <Film size={13} />, label: "VODs", value: String(recentVODs.length), color: "text-violet-400" },
                        { icon: <Eye size={13} />, label: "Total Views", value: formatViews(totalViews), color: "text-indigo-400" },
                        { icon: <Star size={13} />, label: "Highlights", value: String(highlights.length || recentVODs.filter(v => v.highlight).length), color: "text-yellow-400" },
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
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <Input
                            placeholder="Search VODs…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30
                                       focus-visible:ring-violet-500/30 focus-visible:border-violet-500/40 rounded-xl h-10 text-sm"
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
                                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40 hover:bg-violet-500/25"
                                    : "text-white/40 border border-transparent hover:text-white/70 hover:bg-white/[0.05]"}`}
                            >
                                {g}
                            </Button>
                        ))}
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-white/30">
                        <Film size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No VODs found for &#34;{search}&#34;</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Highlights section */}
                        {showingAll && highlights.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                    <h2 className="text-xs font-black tracking-widest uppercase text-yellow-400">Highlights</h2>
                                    <div className="flex-1 h-px bg-white/[0.06]" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {highlights.map((vod, i) => (
                                        <VODCard key={vod.id} vod={vod} featured={i === 0 && highlights.length >= 2} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All / regular section */}
                        <div>
                            {showingAll && (
                                <div className="flex items-center gap-2 mb-4">
                                    <Film size={12} className="text-white/40" />
                                    <h2 className="text-xs font-black tracking-widest uppercase text-white/40">All VODs</h2>
                                    <div className="flex-1 h-px bg-white/[0.06]" />
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(showingAll ? regular : filtered).map((vod) => (
                                    <VODCard key={vod.id} vod={vod} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <p className="mt-12 text-center text-white/20 text-xs">
                    VODs archived from Twitch, YouTube & Kick · Updated May 2026
                </p>
            </div>
        </div>
    );
}