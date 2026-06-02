// lib/streams.ts

export interface LiveStream {
    id: number;
    title: string;
    streamer: string;
    game: string;
    viewers: number;
    duration: string;       // e.g. "1h 24m"
    tags: string[];
    avatarInitials: string;
    accentColor: string;    // hex
    platform: "Twitch" | "YouTube" | "Kick";
    verified: boolean;
}

export interface UpcomingStream {
    id: number;
    title: string;
    streamer: string;
    game: string;
    scheduledFor: string;   // e.g. "Today, 8:00 PM EST"
    scheduledTs: number;    // unix ms, for countdown
    notifyCount: number;
    accentColor: string;
    avatarInitials: string;
    platform: "Twitch" | "YouTube" | "Kick";
}

export interface VOD {
    id: number;
    title: string;
    streamer: string;
    game: string;
    views: number;
    duration: string;
    publishedAt: string;    // e.g. "3 days ago"
    accentColor: string;
    avatarInitials: string;
    platform: "Twitch" | "YouTube" | "Kick";
    highlight?: boolean;
}

// ── Live Streams ─────────────────────────────────────────────────────────────

export const liveStreams: LiveStream[] = [
    {
        id: 1,
        title: "T1 vs Gen.G — LCK Summer 2026 W1D3",
        streamer: "lolesports",
        game: "League of Legends",
        viewers: 284500,
        duration: "2h 07m",
        tags: ["LCK", "Esports", "Official"],
        avatarInitials: "LCK",
        accentColor: "#EF4444",
        platform: "YouTube",
        verified: true,
    },
    {
        id: 2,
        title: "IEM Cologne 2026 — Quarterfinals NAVI vs Vitality",
        streamer: "ESL_CSGO",
        game: "CS2",
        viewers: 196200,
        duration: "3h 41m",
        tags: ["Major", "CS2", "IEM"],
        avatarInitials: "ESL",
        accentColor: "#F97316",
        platform: "Twitch",
        verified: true,
    },
    {
        id: 3,
        title: "VCT Masters Bangkok — PRX vs NRG",
        streamer: "valorant",
        game: "Valorant",
        viewers: 142800,
        duration: "1h 55m",
        tags: ["VCT", "Masters", "Valorant"],
        avatarInitials: "VCT",
        accentColor: "#FF4655",
        platform: "Twitch",
        verified: true,
    },
    {
        id: 4,
        title: "The International 2026 — Group Stage Day 2",
        streamer: "dota2ti",
        game: "Dota 2",
        viewers: 118300,
        duration: "4h 12m",
        tags: ["TI", "Dota 2", "Group Stage"],
        avatarInitials: "TI",
        accentColor: "#A855F7",
        platform: "Twitch",
        verified: true,
    },
    {
        id: 5,
        title: "!rank grind to Radiant — day 47",
        streamer: "s1mple",
        game: "CS2",
        viewers: 87400,
        duration: "0h 38m",
        tags: ["Ranked", "Chill"],
        avatarInitials: "S1",
        accentColor: "#FFD700",
        platform: "Twitch",
        verified: true,
    },
    {
        id: 6,
        title: "Road to Challenger — KR Solo Queue",
        streamer: "Faker",
        game: "League of Legends",
        viewers: 74100,
        duration: "1h 12m",
        tags: ["Solo Queue", "Midlane"],
        avatarInitials: "FAK",
        accentColor: "#EF4444",
        platform: "Twitch",
        verified: true,
    },
    {
        id: 7,
        title: "Rocket League World Championship — Semi Final",
        streamer: "RLEsports",
        game: "Rocket League",
        viewers: 61500,
        duration: "1h 03m",
        tags: ["RLCS", "Championship"],
        avatarInitials: "RL",
        accentColor: "#38BDF8",
        platform: "YouTube",
        verified: true,
    },
    {
        id: 8,
        title: "FaZe vs Team Spirit — ESL Pro League S21",
        streamer: "ESL_CSGO",
        game: "CS2",
        viewers: 53200,
        duration: "2h 28m",
        tags: ["EPL", "Group Stage"],
        avatarInitials: "EPL",
        accentColor: "#22C55E",
        platform: "Twitch",
        verified: false,
    },
    {
        id: 9,
        title: "Dune: Awakening competitive scrim review",
        streamer: "shroud",
        game: "Dune: Awakening",
        viewers: 47800,
        duration: "0h 52m",
        tags: ["MMO", "Scrim", "PvP"],
        avatarInitials: "SHR",
        accentColor: "#D97706",
        platform: "Twitch",
        verified: true,
    },
];

// ── Upcoming Streams ─────────────────────────────────────────────────────────

export const upcomingStreams: UpcomingStream[] = [
    {
        id: 1,
        title: "IEM Cologne 2026 — Semi Finals",
        streamer: "ESL_CSGO",
        game: "CS2",
        scheduledFor: "Today, 6:00 PM EST",
        scheduledTs: Date.now() + 1000 * 60 * 60 * 3,
        notifyCount: 41200,
        accentColor: "#F97316",
        avatarInitials: "ESL",
        platform: "Twitch",
    },
    {
        id: 2,
        title: "VCT Masters Bangkok — Grand Final",
        streamer: "valorant",
        game: "Valorant",
        scheduledFor: "Today, 9:00 PM EST",
        scheduledTs: Date.now() + 1000 * 60 * 60 * 6,
        notifyCount: 38700,
        accentColor: "#FF4655",
        avatarInitials: "VCT",
        platform: "Twitch",
    },
    {
        id: 3,
        title: "T1 Faker — Season Opening Stream",
        streamer: "Faker",
        game: "League of Legends",
        scheduledFor: "Tomorrow, 12:00 PM KST",
        scheduledTs: Date.now() + 1000 * 60 * 60 * 14,
        notifyCount: 102400,
        accentColor: "#EF4444",
        avatarInitials: "FAK",
        platform: "Twitch",
    },
    {
        id: 4,
        title: "The International 2026 — Playoffs Day 1",
        streamer: "dota2ti",
        game: "Dota 2",
        scheduledFor: "Tomorrow, 3:00 PM EST",
        scheduledTs: Date.now() + 1000 * 60 * 60 * 18,
        notifyCount: 29100,
        accentColor: "#A855F7",
        avatarInitials: "TI",
        platform: "Twitch",
    },
    {
        id: 5,
        title: "LEC Spring 2026 — Grand Final: G2 vs Fnatic",
        streamer: "lolesports",
        game: "League of Legends",
        scheduledFor: "Jun 1, 5:00 PM CET",
        scheduledTs: Date.now() + 1000 * 60 * 60 * 30,
        notifyCount: 55800,
        accentColor: "#EC4899",
        avatarInitials: "LEC",
        platform: "YouTube",
    },
    {
        id: 6,
        title: "Rocket League Championship — Grand Final",
        streamer: "RLEsports",
        game: "Rocket League",
        scheduledFor: "Jun 2, 7:00 PM EST",
        scheduledTs: Date.now() + 1000 * 60 * 60 * 48,
        notifyCount: 17300,
        accentColor: "#38BDF8",
        avatarInitials: "RL",
        platform: "YouTube",
    },
];

// ── Recent VODs ──────────────────────────────────────────────────────────────

export const recentVODs: VOD[] = [
    {
        id: 1,
        title: "IEM Cologne 2026 — Opening Weekend Full Broadcast",
        streamer: "ESL_CSGO",
        game: "CS2",
        views: 1840000,
        duration: "8h 42m",
        publishedAt: "2 days ago",
        accentColor: "#F97316",
        avatarInitials: "ESL",
        platform: "YouTube",
        highlight: true,
    },
    {
        id: 2,
        title: "T1 vs Gen.G — LCK Match of the Split",
        streamer: "lolesports",
        game: "League of Legends",
        views: 920000,
        duration: "2h 11m",
        publishedAt: "1 day ago",
        accentColor: "#EF4444",
        avatarInitials: "LCK",
        platform: "YouTube",
        highlight: true,
    },
    {
        id: 3,
        title: "VCT Masters — PRX vs NRG Best-of-5 Thriller",
        streamer: "valorant",
        game: "Valorant",
        views: 680000,
        duration: "3h 28m",
        publishedAt: "3 days ago",
        accentColor: "#FF4655",
        avatarInitials: "VCT",
        platform: "Twitch",
        highlight: false,
    },
    {
        id: 4,
        title: "s1mple hits Global #1 — Ranked highlights",
        streamer: "s1mple",
        game: "CS2",
        views: 541000,
        duration: "4h 05m",
        publishedAt: "4 days ago",
        accentColor: "#FFD700",
        avatarInitials: "S1",
        platform: "Twitch",
        highlight: false,
    },
    {
        id: 5,
        title: "Faker — 1000th Competitive Game Celebration Stream",
        streamer: "Faker",
        game: "League of Legends",
        views: 3200000,
        duration: "5h 17m",
        publishedAt: "5 days ago",
        accentColor: "#EF4444",
        avatarInitials: "FAK",
        platform: "Twitch",
        highlight: true,
    },
    {
        id: 6,
        title: "TI 2026 Group Stage — All Day Broadcast",
        streamer: "dota2ti",
        game: "Dota 2",
        views: 296000,
        duration: "11h 03m",
        publishedAt: "Yesterday",
        accentColor: "#A855F7",
        avatarInitials: "TI",
        platform: "Twitch",
        highlight: false,
    },
    {
        id: 7,
        title: "Dune: Awakening — First Week PvP Meta Breakdown",
        streamer: "shroud",
        game: "Dune: Awakening",
        views: 218000,
        duration: "2h 54m",
        publishedAt: "6 days ago",
        accentColor: "#D97706",
        avatarInitials: "SHR",
        platform: "Twitch",
        highlight: false,
    },
    {
        id: 8,
        title: "RLCS World Championship — Grand Final Replay",
        streamer: "RLEsports",
        game: "Rocket League",
        views: 183000,
        duration: "1h 48m",
        publishedAt: "1 week ago",
        accentColor: "#38BDF8",
        avatarInitials: "RL",
        platform: "YouTube",
        highlight: false,
    },
    {
        id: 9,
        title: "G2 vs Fnatic — LEC Spring Split Highlights Reel",
        streamer: "lolesports",
        game: "League of Legends",
        views: 127000,
        duration: "0h 22m",
        publishedAt: "1 week ago",
        accentColor: "#EC4899",
        avatarInitials: "G2",
        platform: "YouTube",
        highlight: false,
    },
];