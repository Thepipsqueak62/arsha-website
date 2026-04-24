"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    RiTrophyFill,
    RiTeamFill,
    RiUserFill,
    RiShareLine,
    RiTwitterXLine,
    RiTwitchLine,
    RiDiscordLine,
    RiShieldStarFill,
    RiFireFill,
    RiMedalFill,
    RiStarFill,
    RiSwordFill,
    RiGroupFill,
    RiCheckboxCircleFill,
} from "react-icons/ri"
import { CalendarDays, MapPin, LinkIcon } from "lucide-react"

// ─── Types ─────────────────────────────────

interface SocialLink {
    platform: "twitter" | "twitch" | "discord"
    handle: string
    url: string
}

interface Badge {
    id: string
    label: string
    description: string
    icon: React.ElementType
    color: string
    earned: boolean
    earnedAt?: string
}

interface Rank {
    game: string
    tier: string
    division: string
    lp: number
    color: string
    icon: string
    wins: number
    losses: number
}

interface Team {
    id: string
    name: string
    tag: string
    role: string
    game: string
    avatar?: string
    joinedAt: string
    verified: boolean
}

interface Friend {
    id: string
    username: string
    displayName: string
    avatar?: string
    rank?: string
    status: "online" | "offline" | "in-game"
    mutualTeams?: number
}

interface ProfileData {
    username: string
    displayName: string
    avatar?: string
    banner?: string
    bio: string
    location?: string
    website?: string
    joinedAt: string
    socials: SocialLink[]
    ranks: Rank[]
    badges: Badge[]
    teams: Team[]
    friends: Friend[]
    stats: {
        tournamentsPlayed: number
        tournamentsWon: number
        matchesPlayed: number
        winRate: number
    }
}

// ─── Mock Data ─────────────────────────────

const MOCK_PROFILE: ProfileData = {
    username: "shadowrift",
    displayName: "ShadowRift",
    bio: "Professional esports competitor. Top 500 player across multiple titles. Looking for serious team.",
    location: "Los Angeles, CA",
    website: "shadowrift.gg",
    joinedAt: "March 2023",
    socials: [
        { platform: "twitter", handle: "@shadowrift", url: "#" },
        { platform: "twitch", handle: "shadowrift_tv", url: "#" },
        { platform: "discord", handle: "shadowrift#0001", url: "#" },
    ],
    ranks: [
        { game: "Valorant", tier: "Radiant", division: "", lp: 847, color: "#ff4655", icon: "R", wins: 312, losses: 201 },
        { game: "League of Legends", tier: "Challenger", division: "", lp: 1203, color: "#f0b232", icon: "C", wins: 489, losses: 320 },
        { game: "CS2", tier: "Global Elite", division: "", lp: 0, color: "#8b5cf6", icon: "GE", wins: 204, losses: 141 },
    ],
    badges: [
        { id: "1", label: "Tournament Victor", description: "Won a ranked tournament", icon: RiTrophyFill, color: "#f0b232", earned: true, earnedAt: "Jan 2024" },
        { id: "2", label: "Top Fragger", description: "Highest kills in a tournament", icon: RiFireFill, color: "#ff4655", earned: true, earnedAt: "Feb 2024" },
        { id: "3", label: "Team Captain", description: "Led a team to victory", icon: RiShieldStarFill, color: "#8b5cf6", earned: true, earnedAt: "Mar 2024" },
        { id: "4", label: "Season Veteran", description: "Competed in 3+ seasons", icon: RiMedalFill, color: "#22d3ee", earned: true, earnedAt: "Apr 2024" },
        { id: "5", label: "Clutch King", description: "Won 50 clutch rounds", icon: RiSwordFill, color: "#34d399", earned: true, earnedAt: "May 2024" },
        { id: "6", label: "Community Pillar", description: "Referred 10 players", icon: RiGroupFill, color: "#a78bfa", earned: false },
        { id: "7", label: "Perfect Record", description: "Win 10 matches in a row", icon: RiStarFill, color: "#fbbf24", earned: false },
    ],
    teams: [
        { id: "1", name: "Phantom Squad", tag: "PHN", role: "IGL / Entry Fragger", game: "Valorant", joinedAt: "Jan 2024", verified: true },
        { id: "2", name: "Night Wolves", tag: "NWF", role: "Mid Laner", game: "League of Legends", joinedAt: "Mar 2023", verified: false },
    ],
    friends: [
        { id: "1", username: "neonviper", displayName: "NeonViper", rank: "Immortal 3", status: "online", mutualTeams: 1 },
        { id: "2", username: "crystalx", displayName: "CrystalX", rank: "Diamond 1", status: "in-game", mutualTeams: 2 },
        { id: "3", username: "voidwalker", displayName: "VoidWalker", rank: "Radiant", status: "offline", mutualTeams: 1 },
        { id: "4", username: "prismfire", displayName: "PrismFire", rank: "Challenger", status: "online", mutualTeams: 0 },
        { id: "5", username: "stormbreaker", displayName: "StormBreaker", rank: "Master", status: "in-game", mutualTeams: 1 },
        { id: "6", username: "dawnrider", displayName: "DawnRider", rank: "Diamond 2", status: "offline", mutualTeams: 0 },
    ],
    stats: {
        tournamentsPlayed: 47,
        tournamentsWon: 12,
        matchesPlayed: 1089,
        winRate: 61,
    },
}

// ─── Helpers ────────────────────────────────

function getInitials(name: string): string {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
}

function getStatusColor(status: Friend["status"]): string {
    switch (status) {
        case "online": return "#34d399"
        case "in-game": return "#f0b232"
        case "offline": return "#4b5563"
    }
}

function getStatusLabel(status: Friend["status"]): string {
    switch (status) {
        case "online": return "Online"
        case "in-game": return "In Game"
        case "offline": return "Offline"
    }
}

const SocialIcons = {
    twitter: RiTwitterXLine,
    twitch: RiTwitchLine,
    discord: RiDiscordLine,
}

// ─── Stat Card ──────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
    return (
        <div className="flex flex-col gap-0.5 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/5">
            <span className="text-[11px] uppercase tracking-widest text-white/30 font-medium">{label}</span>
            <span className="text-2xl font-bold text-white tabular-nums">{value}</span>
            {sub && <span className="text-xs text-white/30">{sub}</span>}
        </div>
    )
}

// ─── Rank Card ──────────────────────────────

function RankCard({ rank }: { rank: Rank }) {
    const winRate = Math.round((rank.wins / (rank.wins + rank.losses)) * 100)

    return (
        <div className="flex flex-col gap-3 bg-white/[0.03] rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between">
                <span className="text-xs text-white/40 font-medium">{rank.game}</span>
                <div
                    className="h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-black"
                    style={{ backgroundColor: `${rank.color}20`, color: rank.color }}
                >
                    {rank.icon}
                </div>
            </div>
            <div>
                <p className="text-lg font-bold text-white leading-none">{rank.tier}</p>
                {rank.lp > 0 && (
                    <p className="text-xs mt-1" style={{ color: rank.color }}>{rank.lp} LP</p>
                )}
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-white/30">
                    <span>{rank.wins}W / {rank.losses}L</span>
                    <span>{winRate}% WR</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${winRate}%`, backgroundColor: rank.color }}
                    />
                </div>
            </div>
        </div>
    )
}

// ─── Badge Card ─────────────────────────────

function BadgeCard({ badge }: { badge: Badge }) {
    const Icon = badge.icon

    return (
        <div className={cn(
            "flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all",
            badge.earned
                ? "bg-white/[0.03] border-white/5 hover:border-white/10"
                : "bg-white/[0.01] border-white/[0.03] opacity-40 grayscale"
        )}>
            <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{
                    backgroundColor: badge.earned ? `${badge.color}18` : "rgba(255,255,255,0.05)",
                    border: badge.earned ? `1px solid ${badge.color}30` : "1px solid rgba(255,255,255,0.05)"
                }}
            >
                <Icon size={18} style={{ color: badge.earned ? badge.color : "rgba(255,255,255,0.2)" }} />
            </div>
            <div>
                <p className="text-[11px] font-semibold text-white leading-tight">{badge.label}</p>
                {badge.earned && badge.earnedAt && (
                    <p className="text-[10px] text-white/30 mt-0.5">{badge.earnedAt}</p>
                )}
            </div>
        </div>
    )
}

// ─── Team Card ──────────────────────────────

function TeamCard({ team }: { team: Team }) {
    return (
        <div className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400 font-black text-sm shrink-0">
                {team.tag}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-white truncate">{team.name}</p>
                    {team.verified && (
                        <RiCheckboxCircleFill size={13} className="text-violet-400 shrink-0" />
                    )}
                </div>
                <p className="text-xs text-white/40 truncate">{team.role} · {team.game}</p>
            </div>
            <div className="text-right shrink-0">
                <p className="text-[10px] text-white/25">Since</p>
                <p className="text-[11px] text-white/40">{team.joinedAt}</p>
            </div>
        </div>
    )
}

// ─── Friend Card ────────────────────────────

function FriendCard({ friend }: { friend: Friend }) {
    const statusColor = getStatusColor(friend.status)

    return (
        <div className="flex items-center gap-2.5 bg-white/[0.03] rounded-xl p-2.5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
            <div className="relative shrink-0">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="bg-violet-600/20 text-violet-400 text-xs font-semibold">
                        {getInitials(friend.displayName)}
                    </AvatarFallback>
                </Avatar>
                <span
                    className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#080815]"
                    style={{ backgroundColor: statusColor }}
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{friend.displayName}</p>
                <p className="text-[10px] text-white/30 truncate">
                    {friend.status === "in-game" ? "In Game" : friend.rank ?? "Unranked"}
                </p>
            </div>
            {friend.mutualTeams !== undefined && friend.mutualTeams > 0 && (
                <span className="text-[9px] font-bold text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    {friend.mutualTeams} team{friend.mutualTeams > 1 ? "s" : ""}
                </span>
            )}
        </div>
    )
}

// ─── Section Header ─────────────────────────

function SectionHeader({ icon: Icon, label, count }: { icon: React.ElementType; label: string; count?: number }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <Icon size={14} className="text-white/30" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">{label}</h2>
            {count !== undefined && (
                <span className="ml-auto text-xs text-white/20">{count}</span>
            )}
        </div>
    )
}

// ─── Share Button ───────────────────────────

function ShareButton() {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                "border border-white/10 hover:border-white/20 hover:bg-white/5",
                copied ? "text-green-400 border-green-500/30" : "text-white/60"
            )}
        >
            <RiShareLine size={14} />
            {copied ? "Copied!" : "Share"}
        </button>
    )
}

// ─── Main Profile Page ──────────────────────

export default function ProfilePage() {
    const profile = MOCK_PROFILE

    const fadeUp = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    }

    return (
        <div className="min-h-screen bg-[#080815] text-white">

            {/* ── Banner ── */}
            <div className="relative h-48 md:h-64 overflow-hidden">
                {/* Gradient banner fallback */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-[#0d0b1f] to-cyan-900/40" />
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%),
                                          radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 40%)`,
                    }}
                />
                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* ── Profile Header ── */}
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                <div className="relative -mt-16 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">

                    {/* Avatar + name */}
                    <div className="flex items-end gap-4">
                        <motion.div {...fadeUp} className="relative">
                            <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-[#080815] rounded-2xl">
                                <AvatarImage src={profile.avatar} />
                                <AvatarFallback className="bg-violet-600 text-white text-2xl font-black rounded-2xl">
                                    {getInitials(profile.displayName)}
                                </AvatarFallback>
                            </Avatar>
                            {/* Online indicator */}
                            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-[#080815]" />
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="pb-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                    {profile.displayName}
                                </h1>
                                <RiCheckboxCircleFill size={18} className="text-violet-400" />
                            </div>
                            <p className="text-sm text-white/40">@{profile.username}</p>
                        </motion.div>
                    </div>

                    {/* Actions */}
                    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex items-center gap-2 pb-1">
                        <ShareButton />
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 transition-colors text-white">
                            <RiUserFill size={14} />
                            Add Friend
                        </button>
                    </motion.div>
                </div>

                {/* ── Bio + Meta ── */}
                <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="mb-6 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <div className="flex-1">
                        <p className="text-sm text-white/60 leading-relaxed max-w-lg">{profile.bio}</p>
                        <div className="mt-3 flex flex-wrap gap-3">
                            {profile.location && (
                                <span className="flex items-center gap-1.5 text-xs text-white/30">
                                    <MapPin size={11} />
                                    {profile.location}
                                </span>
                            )}
                            {profile.website && (
                                <span className="flex items-center gap-1.5 text-xs text-white/30">
                                    <LinkIcon size={11} />
                                    {profile.website}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 text-xs text-white/30">
                                <CalendarDays size={11} />
                                Joined {profile.joinedAt}
                            </span>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-2">
                        {profile.socials.map(social => {
                            const Icon = SocialIcons[social.platform]
                            return (
                                <a
                                    key={social.platform}
                                    href={social.url}
                                    className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all"
                                    title={social.handle}
                                >
                                    <Icon size={14} />
                                </a>
                            )
                        })}
                    </div>
                </motion.div>

                {/* ── Stats Bar ── */}
                <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                    <StatCard label="Tournaments" value={profile.stats.tournamentsPlayed} />
                    <StatCard label="Wins" value={profile.stats.tournamentsWon} sub={`${Math.round((profile.stats.tournamentsWon / profile.stats.tournamentsPlayed) * 100)}% win rate`} />
                    <StatCard label="Matches" value={profile.stats.matchesPlayed.toLocaleString()} />
                    <StatCard label="Win Rate" value={`${profile.stats.winRate}%`} sub="across all games" />
                </motion.div>

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">

                    {/* Left column */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Ranks */}
                        <motion.section {...fadeUp} transition={{ delay: 0.2 }}>
                            <SectionHeader icon={RiTrophyFill} label="Ranks" count={profile.ranks.length} />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {profile.ranks.map(rank => (
                                    <RankCard key={rank.game} rank={rank} />
                                ))}
                            </div>
                        </motion.section>

                        {/* Badges & Achievements */}
                        <motion.section {...fadeUp} transition={{ delay: 0.25 }}>
                            <SectionHeader
                                icon={RiMedalFill}
                                label="Badges & Achievements"
                                count={profile.badges.filter(b => b.earned).length}
                            />
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2">
                                {profile.badges.map(badge => (
                                    <BadgeCard key={badge.id} badge={badge} />
                                ))}
                            </div>
                            <p className="mt-2 text-[11px] text-white/20 text-right">
                                {profile.badges.filter(b => !b.earned).length} badges locked
                            </p>
                        </motion.section>

                        {/* Teams */}
                        <motion.section {...fadeUp} transition={{ delay: 0.3 }}>
                            <SectionHeader icon={RiTeamFill} label="Teams" count={profile.teams.length} />
                            <div className="space-y-2">
                                {profile.teams.map(team => (
                                    <TeamCard key={team.id} team={team} />
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* Right column — Friends */}
                    <motion.aside {...fadeUp} transition={{ delay: 0.3 }}>
                        <SectionHeader
                            icon={RiUserFill}
                            label="Network"
                            count={profile.friends.length}
                        />
                        <div className="space-y-1.5">
                            {profile.friends
                                .sort((a, b) => {
                                    const order = { "online": 0, "in-game": 1, "offline": 2 }
                                    return order[a.status] - order[b.status]
                                })
                                .map(friend => (
                                    <FriendCard key={friend.id} friend={friend} />
                                ))}
                        </div>
                        <button className="mt-3 w-full text-xs text-white/20 hover:text-white/40 transition-colors py-2">
                            View all friends
                        </button>
                    </motion.aside>
                </div>
            </div>
        </div>
    )
}