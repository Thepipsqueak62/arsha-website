// app/arsha/app/betterauthtesting.tsx
import Link from "next/link";
import {
    HiPlay,
    HiVideoCamera,
    HiUsers,
    HiChartBar,
    HiCog6Tooth,
} from "react-icons/hi2";

const quickActions = [
    { title: "Matches", href: "/arsha/app/tournaments", icon: HiPlay },
    { title: "Streams", href: "/arsha/app/streams", icon: HiVideoCamera },
    { title: "Teams", href: "/arsha/app/esports-teams", icon: HiUsers },
    { title: "Leaderboard", href: "/arsha/app/leaderboard", icon: HiChartBar },
    { title: "Settings", href: "/arsha/app/settings", icon: HiCog6Tooth },
];

export default function DboardPage() {
    return (
        <div className="p-6 space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Arsha Control Center</h1>
                <p className="text-zinc-400">
                    Overview of matches, streams, teams, and activity.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Live Matches", value: "8" },
                    { label: "Live Streams", value: "12" },
                    { label: "Teams", value: "24" },
                    { label: "Players Online", value: "1.2k" },
                ].map((s) => (
                    <div key={s.label} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                        <p className="text-sm text-zinc-400">{s.label}</p>
                        <p className="text-2xl font-bold">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((a) => {
                    const Icon = a.icon;

                    return (
                        <Link
                            key={a.href}
                            href={a.href}
                            className="flex items-center justify-between p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="text-emerald-400" />
                                <span>{a.title}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </div>
    );
}