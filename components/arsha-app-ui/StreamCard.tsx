"use client";

import { Radio, Eye, Clock } from "lucide-react";
import type { LiveStream } from "@/mock-data/streams";

const PLATFORM_COLOR: Record<string, string> = {
    Twitch: "#9147ff",
    YouTube: "#FF0000",
    Kick: "#53FC18",
};

function formatViewers(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
}

export default function StreamCard({ stream }: { stream: LiveStream }) {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03]
                        hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col"
        >
            {/* Thumbnail area */}
            <div
                className="relative h-36 sm:h-40 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${stream.accentColor}28 0%, #0d1117 100%)` }}
            >
                {/* big faded initials as pseudo-thumbnail */}
                <span
                    className="select-none font-black text-7xl opacity-[0.07] tracking-tighter"
                    style={{ color: stream.accentColor }}
                >
                    {stream.avatarInitials}
                </span>

                {/* LIVE pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 rounded-md px-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] font-black tracking-wider text-white">LIVE</span>
                </div>

                {/* duration */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-md px-2 py-0.5">
                    <Clock size={9} className="text-white/60" />
                    <span className="text-[10px] text-white/70 font-medium">{stream.duration}</span>
                </div>

                {/* platform badge */}
                <div
                    className="absolute bottom-3 right-3 text-[9px] font-black px-2 py-0.5 rounded-md"
                    style={{ background: `${PLATFORM_COLOR[stream.platform]}33`, color: PLATFORM_COLOR[stream.platform], border: `1px solid ${PLATFORM_COLOR[stream.platform]}55` }}
                >
                    {stream.platform.toUpperCase()}
                </div>

                {/* hover overlay */}
                <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-3">
                {/* Avatar + streamer */}
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-black text-[10px]"
                        style={{ background: `${stream.accentColor}22`, border: `1.5px solid ${stream.accentColor}55`, color: stream.accentColor }}
                    >
                        {stream.avatarInitials.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white/80 truncate">{stream.streamer}</span>
                            {stream.verified && (
                                <span
                                    className="text-[9px] font-black px-1 py-0.5 rounded"
                                    style={{ background: `${stream.accentColor}22`, color: stream.accentColor }}
                                >
                                    ✓
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] text-white/30">{stream.game}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 flex-1">{stream.title}</h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {stream.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/50 border border-white/[0.08]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <Eye size={11} className="text-white/40" />
                        <span className="text-xs font-bold text-white/70">{formatViewers(stream.viewers)}</span>
                        <span className="text-[10px] text-white/30">watching</span>
                    </div>
                    <button
                        className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all duration-200"
                        style={{
                            background: `${stream.accentColor}22`,
                            color: stream.accentColor,
                            border: `1px solid ${stream.accentColor}44`,
                        }}
                    >
                        <Radio size={9} />
                        Watch
                    </button>
                </div>
            </div>
        </div>
    );
}