"use client"

import * as React from "react"
import { useParams } from "next/navigation"
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
    RiMedalFill,
    RiCheckboxCircleFill,
} from "react-icons/ri"
import { CalendarDays, MapPin, LinkIcon } from "lucide-react"

// ─── Types ─────────────────────────────────

interface ProfileData {
    username: string
    displayName: string
    image?: string | null
    bio: string
    location?: string
    website?: string
    joinedAt?: string
    socials: {
        twitter?: string
        twitch?: string
        discord?: string
    }
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
    discord: (_h: string) => `#`,
}

// ─── Hook ──────────────────────────────────

function usePublicProfile(username: string) {
    const [profile, setProfile] = React.useState<ProfileData | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [notFound, setNotFound] = React.useState(false)

    React.useEffect(() => {
        if (!username) return
        setLoading(true)
        setNotFound(false)

        window.fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/${username}`)
            .then(res => {
                if (res.status === 404) { setNotFound(true); return null }
                if (!res.ok) throw new Error("Failed to load profile")
                return res.json()
            })
            .then(data => { if (data) setProfile(data) })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false))
    }, [username])

    return { profile, loading, notFound }
}

// ─── Sub-components ────────────────────────

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <Icon size={14} className="text-white/30" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/30">{label}</h2>
        </div>
    )
}

function EmptySection({ label }: { label: string }) {
    return (
        <div className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center">
            <p className="text-sm text-white/20">{label}</p>
        </div>
    )
}

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

// ─── Main ──────────────────────────────────

export default function PublicProfilePage() {
    const params = useParams()
    const username = params?.username as string
    const { profile, loading, notFound } = usePublicProfile(username)

    const fadeUp = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080815] flex items-center justify-center">
                <div className="h-6 w-6 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
            </div>
        )
    }

    if (notFound || !profile) {
        return (
            <div className="min-h-screen bg-[#080815] flex items-center justify-center">
                <div className="text-center space-y-2">
                    <p className="text-white font-bold text-lg">Profile not found</p>
                    <p className="text-white/30 text-sm">@{username} doesn't exist yet.</p>
                </div>
            </div>
        )
    }

    const activeSocials = Object.entries(profile.socials ?? {}).filter(([, v]) => v)

    return (
        <div className="min-h-screen bg-[#080815] text-white">

            {/* Banner */}
            <div className="relative h-48 md:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-[#0d0b1f] to-cyan-900/40" />
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%),
                                      radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 40%)`,
                }} />
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }} />
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="relative -mt-16 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="flex items-end gap-4">
                        <motion.div {...fadeUp} className="relative">
                            <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-[#080815] rounded-2xl">
                                <AvatarImage src={profile.image ?? undefined} />
                                <AvatarFallback className="bg-violet-600 text-white text-2xl font-black rounded-2xl">
                                    {getInitials(profile.displayName)}
                                </AvatarFallback>
                            </Avatar>
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

                    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex items-center gap-2 pb-1">
                        <ShareButton />
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 transition-colors text-white">
                            <RiUserFill size={14} />
                            Add Friend
                        </button>
                    </motion.div>
                </div>

                {/* Bio + Meta */}
                {(profile.bio || profile.location || profile.website || activeSocials.length > 0) && (
                    <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="mb-6 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                        <div className="flex-1">
                            {profile.bio && (
                                <p className="text-sm text-white/60 leading-relaxed max-w-lg">{profile.bio}</p>
                            )}
                            <div className="mt-3 flex flex-wrap gap-3">
                                {profile.location && (
                                    <span className="flex items-center gap-1.5 text-xs text-white/30">
                                        <MapPin size={11} /> {profile.location}
                                    </span>
                                )}
                                {profile.website && (
                                    <a
                                        href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-white/30 hover:text-violet-400 transition-colors"
                                    >
                                        <LinkIcon size={11} /> {profile.website}
                                    </a>
                                )}
                                {profile.joinedAt && (
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

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
                    <div className="md:col-span-2 space-y-8">
                        <motion.section {...fadeUp} transition={{ delay: 0.2 }}>
                            <SectionHeader icon={RiTrophyFill} label="Ranks" />
                            <EmptySection label="No ranks yet" />
                        </motion.section>

                        <motion.section {...fadeUp} transition={{ delay: 0.25 }}>
                            <SectionHeader icon={RiMedalFill} label="Badges & Achievements" />
                            <EmptySection label="No badges yet" />
                        </motion.section>

                        <motion.section {...fadeUp} transition={{ delay: 0.3 }}>
                            <SectionHeader icon={RiTeamFill} label="Teams" />
                            <EmptySection label="Not on any teams yet" />
                        </motion.section>
                    </div>

                    <motion.aside {...fadeUp} transition={{ delay: 0.3 }}>
                        <SectionHeader icon={RiUserFill} label="Network" />
                        <EmptySection label="No connections yet" />
                    </motion.aside>
                </div>
            </div>
        </div>
    )
}