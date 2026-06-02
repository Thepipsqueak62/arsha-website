"use client";

import { useState, useEffect } from "react";
import { Bell, Calendar, Clock, Radio, ChevronRight } from "lucide-react";
import { upcomingStreams } from "@/mock-data/streams";
import type { UpcomingStream } from "@/mock-data/streams";

const PLATFORM_COLOR: Record<string, string> = {
    Twitch: "#9147ff",
    YouTube: "#FF0000",
    Kick: "#53FC18",
};

function formatCountdown(ms: number): string {
    if (ms <= 0) return "Starting soon";
    const h = Math.floor(ms / 3_600_000);
    const m = Math.floor((ms % 3_600_000) / 60_000);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
}

function formatNotify(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
}

function UpcomingCard({ stream }: { stream: UpcomingStream }) {
    const [remaining, setRemaining] = useState(stream.scheduledTs - Date.now());

    useEffect(() => {
        const id = setInterval(() => setRemaining(stream.scheduledTs - Date.now()), 1000);
        return () => clearInterval(id);
    }, [stream.scheduledTs]);

    const isToday = stream.scheduledFor.startsWith("Today");
    const isTomorrow = stream.scheduledFor.startsWith("Tomorrow");

    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03]
                        hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
        >
            {/* left colour bar */}
            <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                style={{ background: stream.accentColor }}
            />

            {/* ambient glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 0% 50%, ${stream.accentColor}12 0%, transparent 60%)` }}
            />

            <div className="relative p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div
                            className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-[11px]"
                            style={{
                                background: `${stream.accentColor}22`,
                                border: `1.5px solid ${stream.accentColor}55`,
                                color: stream.accentColor,
                            }}
                        >
                            {stream.avatarInitials.slice(0, 3)}
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white/70">{stream.streamer}</div>
                            <div className="text-[10px] text-white/30 mt-0.5">{stream.game}</div>
                        </div>
                    </div>

                    {/* Timing badge */}
                    <div className="flex-shrink-0 flex flex-col items-end gap-1">
                        <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-md
                                ${isToday ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                                isTomorrow ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" :
                                    "bg-white/[0.06] text-white/40 border border-white/[0.08]"}`}
                        >
                            {isToday ? "TODAY" : isTomorrow ? "TOMORROW" : "UPCOMING"}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-sm font-extrabold text-white leading-snug line-clamp-2">{stream.title}</h3>

                {/* Time info */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/40">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={11} />
                        <span>{stream.scheduledFor}</span>
                    </div>
                    <div
                        className="flex items-center gap-1.5 font-bold"
                        style={{ color: remaining < 3_600_000 ? "#ef4444" : stream.accentColor }}
                    >
                        <Clock size={11} />
                        <span>{formatCountdown(remaining)}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <Bell size={11} className="text-white/30" />
                        <span className="text-xs text-white/40">
                            <span className="text-white/70 font-bold">{formatNotify(stream.notifyCount)}</span> notified
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className="text-[9px] font-black px-1.5 py-0.5 rounded"
                            style={{ background: `${PLATFORM_COLOR[stream.platform]}22`, color: PLATFORM_COLOR[stream.platform] }}
                        >
                            {stream.platform.toUpperCase()}
                        </span>
                        <button
                            className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all duration-200
                                       text-white/40 border border-white/[0.08] hover:text-white hover:border-white/20"
                        >
                            Notify <Bell size={9} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UpcomingPage() {
    const today = upcomingStreams.filter((s) => s.scheduledFor.startsWith("Today"));
    const tomorrow = upcomingStreams.filter((s) => s.scheduledFor.startsWith("Tomorrow"));
    const later = upcomingStreams.filter((s) => !s.scheduledFor.startsWith("Today") && !s.scheduledFor.startsWith("Tomorrow"));

    const sections = [
        { label: "Today", accent: "text-red-400", dot: "bg-red-500", items: today },
        { label: "Tomorrow", accent: "text-orange-400", dot: "bg-orange-500", items: tomorrow },
        { label: "Later", accent: "text-white/40", dot: "bg-white/20", items: later },
    ].filter((s) => s.items.length > 0);

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
                        <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-orange-400 to-red-500" />
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/40">Schedule</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                        Upcoming{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            Streams
                        </span>
                    </h1>
                    <p className="mt-3 text-white/40 text-sm max-w-lg">
                        {upcomingStreams.length} scheduled broadcasts — set a reminder and never miss a match.
                    </p>
                </div>

                {/* ── Stats ── */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                        { label: "Today", value: String(today.length), color: "text-red-400" },
                        { label: "Tomorrow", value: String(tomorrow.length), color: "text-orange-400" },
                        { label: "This Week", value: String(upcomingStreams.length), color: "text-yellow-400" },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-center"
                        >
                            <div className={`${s.color} font-black text-2xl`}>{s.value}</div>
                            <div className="text-white/40 text-[10px] mt-0.5 uppercase tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ── Sections ── */}
                <div className="space-y-8">
                    {sections.map((section) => (
                        <div key={section.label}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className={`w-2 h-2 rounded-full ${section.dot}`} />
                                <h2 className={`text-xs font-black tracking-widest uppercase ${section.accent}`}>
                                    {section.label}
                                </h2>
                                <div className="flex-1 h-px bg-white/[0.06]" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {section.items.map((s) => (
                                    <UpcomingCard key={s.id} stream={s} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}