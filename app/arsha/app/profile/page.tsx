"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { EditProfileSheet, ProfileFormData } from "@/components/edit-profile-sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
    RiEditLine,
    RiShareLine,
    RiTrophyFill,
    RiTeamFill,
    RiUserFill,
    RiMedalFill,
    RiTwitterXLine,
    RiTwitchLine,
    RiDiscordLine,
    RiCheckboxCircleFill,
    RiExternalLinkLine,
} from "react-icons/ri"
import { CalendarDays, MapPin, LinkIcon } from "lucide-react"
import Link from "next/link"

// ─── Types ─────────────────────────────────

interface ProfileData extends ProfileFormData {
    image?: string | null
    joinedAt?: string
}

// ─── Helpers ───────────────────────────────

function getInitials(name: string): string {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
}

const SocialIcons = {
    twitter: RiTwitterXLine,
    twitch: RiTwitchLine,
    discord: RiDiscordLine,
}

const SocialUrls = {
    twitter: (h: string) => `https://x.com/${h}`,
    twitch: (h: string) => `https://twitch.tv/${h}`,
    discord: (h: string) => `#`,
}

// ─── Hook: fetch own profile ───────────────

function useOwnProfile() {
    const [profile, setProfile] = React.useState<ProfileData | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    const fetch = React.useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await window.fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/profile/me`,
                { credentials: "include" }
            )
            if (!res.ok) throw new Error("Failed to load profile")
            const data = await res.json()
            setProfile(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [])

    React.useEffect(() => { fetch() }, [fetch])

    return { profile, loading, error, refetch: fetch }
}

// ─── Stat Card ──────────────────────────────

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex flex-col gap-0.5 bg-white/[0.03] rounded-xl px-4 py-3 border border-white/5">
            <span className="text-[11px] uppercase tracking-widest text-white/30 font-medium">{label}</span>
            <span className="text-2xl font-bold text-white tabular-nums">{value}</span>
        </div>
    )
}

// ─── Empty State ────────────────────────────

function EmptySection({ label }: { label: string }) {
    return (
        <div className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center">
            <p className="text-sm text-white/20">{label}</p>
        </div>
    )
}

// ─── Section Header ─────────────────────────

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <Icon size={14} className="text-white/30" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">{label}</h2>
        </div>
    )
}

// ─── Share Button ───────────────────────────

function ShareButton({ username }: { username?: string }) {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
        const url = username
            ? `${window.location.origin}/arsha/profile/${username}`
            : window.location.href
        navigator.clipboard.writeText(url)
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

// ─── Skeleton ───────────────────────────────

function ProfileSkeleton() {
    return (
        <div className="animate-pulse space-y-6">
            <div className="h-48 rounded-2xl bg-white/[0.03]" />
            <div className="flex items-end gap-4 -mt-12 px-6">
                <div className="h-24 w-24 rounded-2xl bg-white/[0.06]" />
                <div className="space-y-2 pb-2">
                    <div className="h-6 w-40 rounded-lg bg-white/[0.06]" />
                    <div className="h-3 w-24 rounded-lg bg-white/[0.04]" />
                </div>
            </div>
        </div>
    )
}

// ─── Main Page ──────────────────────────────

export default function MyProfilePage() {
    const { profile, loading, error, refetch } = useOwnProfile()
    const [editOpen, setEditOpen] = React.useState(false)

    const fadeUp = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080815] p-6">
                <ProfileSkeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#080815] flex items-center justify-center">
                <div className="text-center space-y-3">
                    <p className="text-white/40 text-sm">{error}</p>
                    <button
                        onClick={refetch}
                        className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </div>
        )
    }

    const isProfileIncomplete = !profile?.username || !profile?.bio

    // Build initial form data for the edit sheet
    const formData: ProfileFormData = {
        displayName: profile?.displayName ?? "",
        username: profile?.username ?? "",
        bio: profile?.bio ?? "",
        location: profile?.location ?? "",
        website: profile?.website ?? "",
        socials: {
            twitter: profile?.socials?.twitter ?? "",
            twitch: profile?.socials?.twitch ?? "",
            discord: profile?.socials?.discord ?? "",
        },
    }

    const activeSocials = Object.entries(profile?.socials ?? {}).filter(([, v]) => v)

    return (
        <div className="min-h-screen bg-[#080815] text-white">

            {/* ── Banner ── */}
            <div className="relative h-48 md:h-56 overflow-hidden rounded-b-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-[#0d0b1f] to-cyan-900/40" />
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%),
                                          radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 40%)`,
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Edit banner button */}
                <button
                    onClick={() => setEditOpen(true)}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-xs text-white/50 hover:text-white/80 transition-all"
                >
                    <RiEditLine size={11} />
                    Edit banner
                </button>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8">

                {/* ── Profile Header ── */}
                <div className="relative -mt-14 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="flex items-end gap-4">
                        <motion.div {...fadeUp} className="relative">
                            <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-[#080815] rounded-2xl">
                                <AvatarImage src={profile?.image ?? undefined} />
                                <AvatarFallback className="bg-violet-600 text-white text-2xl font-black rounded-2xl">
                                    {getInitials(profile?.displayName || "?")}
                                </AvatarFallback>
                            </Avatar>
                            {/* Online dot */}
                            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-[#080815]" />
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="pb-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                    {profile?.displayName || "Anonymous"}
                                </h1>
                                {profile?.username && (
                                    <RiCheckboxCircleFill size={18} className="text-violet-400" />
                                )}
                            </div>
                            <p className="text-sm text-white/40">
                                {profile?.username ? `@${profile.username}` : (
                                    <button
                                        onClick={() => setEditOpen(true)}
                                        className="text-violet-400 hover:text-violet-300 transition-colors"
                                    >
                                        Set a username →
                                    </button>
                                )}
                            </p>
                        </motion.div>
                    </div>

                    {/* Actions */}
                    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex items-center gap-2 pb-1">
                        {profile?.username && (
                            <Link
                                href={`/arsha/profile/${profile.username}`}
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60"
                            >
                                <RiExternalLinkLine size={14} />
                                View public
                            </Link>
                        )}
                        <ShareButton username={profile?.username} />
                        <button
                            onClick={() => setEditOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 transition-colors text-white"
                        >
                            <RiEditLine size={14} />
                            Edit Profile
                        </button>
                    </motion.div>
                </div>

                {/* ── Incomplete profile nudge ── */}
                {isProfileIncomplete && (
                    <motion.div
                        {...fadeUp}
                        transition={{ delay: 0.1 }}
                        className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3"
                    >
                        <div>
                            <p className="text-sm font-semibold text-violet-300">Complete your profile</p>
                            <p className="text-xs text-violet-400/60 mt-0.5">
                                Add a username and bio so others can find and follow you.
                            </p>
                        </div>
                        <button
                            onClick={() => setEditOpen(true)}
                            className="shrink-0 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-semibold text-white transition-colors"
                        >
                            Complete →
                        </button>
                    </motion.div>
                )}

                {/* ── Bio + Meta ── */}
                {(profile?.bio || profile?.location || profile?.website || activeSocials.length > 0) && (
                    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="mb-6 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                        <div className="flex-1">
                            {profile?.bio && (
                                <p className="text-sm text-white/60 leading-relaxed max-w-lg">{profile.bio}</p>
                            )}
                            <div className="mt-3 flex flex-wrap gap-3">
                                {profile?.location && (
                                    <span className="flex items-center gap-1.5 text-xs text-white/30">
                                        <MapPin size={11} /> {profile.location}
                                    </span>
                                )}
                                {profile?.website && (
                                    <a
                                        href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-white/30 hover:text-violet-400 transition-colors"
                                    >
                                        <LinkIcon size={11} /> {profile.website}
                                    </a>
                                )}
                                {profile?.joinedAt && (
                                    <span className="flex items-center gap-1.5 text-xs text-white/30">
                                        <CalendarDays size={11} /> Joined {profile.joinedAt}
                                    </span>
                                )}
                            </div>
                        </div>

                        {activeSocials.length > 0 && (
                            <div className="flex items-center gap-2">
                                {activeSocials.map(([platform, handle]) => {
                                    const Icon = SocialIcons[platform as keyof typeof SocialIcons]
                                    const getUrl = SocialUrls[platform as keyof typeof SocialUrls]
                                    if (!Icon) return null
                                    return (
                                        <a
                                            key={platform}
                                            href={getUrl(handle)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all"
                                            title={handle}
                                        >
                                            <Icon size={14} />
                                        </a>
                                    )
                                })}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* ── Stats ── */}
                <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                    <StatCard label="Tournaments" value={0} />
                    <StatCard label="Wins" value={0} />
                    <StatCard label="Matches" value={0} />
                    <StatCard label="Win Rate" value="0%" />
                </motion.div>

                {/* ── Content Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
                    <div className="md:col-span-2 space-y-8">

                        {/* Ranks */}
                        <motion.section {...fadeUp} transition={{ delay: 0.2 }}>
                            <SectionHeader icon={RiTrophyFill} label="Ranks" />
                            <EmptySection label="No ranks yet — join a tournament to get ranked" />
                        </motion.section>

                        {/* Badges */}
                        <motion.section {...fadeUp} transition={{ delay: 0.25 }}>
                            <SectionHeader icon={RiMedalFill} label="Badges & Achievements" />
                            <EmptySection label="No badges yet — compete to earn your first" />
                        </motion.section>

                        {/* Teams */}
                        <motion.section {...fadeUp} transition={{ delay: 0.3 }}>
                            <SectionHeader icon={RiTeamFill} label="Teams" />
                            <EmptySection label="Not on any teams yet" />
                        </motion.section>
                    </div>

                    {/* Friends */}
                    <motion.aside {...fadeUp} transition={{ delay: 0.3 }}>
                        <SectionHeader icon={RiUserFill} label="Network" />
                        <EmptySection label="No connections yet" />
                    </motion.aside>
                </div>
            </div>

            {/* ── Edit Sheet ── */}
            <EditProfileSheet
                open={editOpen}
                onOpenChange={setEditOpen}
                initialData={formData}
                avatarUrl={profile?.image}
                onSaved={(saved) => {
                    refetch()
                }}
            />
        </div>
    )
}