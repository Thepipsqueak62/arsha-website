"use client";

import { useState } from "react";
import { Radio, Calendar, Film } from "lucide-react";
import LiveStreamsPage from "./live/page";
import UpcomingPage from "./upcoming/page";
import VodPage from "./vod/page";

type Tab = "live" | "upcoming" | "vods";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
        id: "live",
        label: "Live",
        icon: <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />,
    },
    {
        id: "upcoming",
        label: "Upcoming",
        icon: <Calendar size={13} className="flex-shrink-0" />,
    },
    {
        id: "vods",
        label: "VODs",
        icon: <Film size={13} className="flex-shrink-0" />,
    },
];

export default function StreamsPage() {
    const [active, setActive] = useState<Tab>("live");

    return (
        <div className="min-h-screen bg-[#080b12] text-white">
            {/* ── Tab bar ── */}
            <div className="sticky top-0 z-30 bg-[#080b12]/90 backdrop-blur-md border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-1">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActive(tab.id)}
                                className={`
                                    relative flex items-center gap-2 px-4 sm:px-6 py-4
                                    text-sm font-bold tracking-wide transition-colors duration-150
                                    ${active === tab.id ? "text-white" : "text-white/35 hover:text-white/60"}
                                `}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>

                                {/* active indicator bar */}
                                {active === tab.id && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div>
                {active === "live"     && <LiveStreamsPage />}
                {active === "upcoming" && <UpcomingPage />}
                {active === "vods"     && <VodPage />}
            </div>
        </div>
    );
}