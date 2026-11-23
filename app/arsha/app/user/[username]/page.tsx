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
import {getPublicProfile} from "@/app/API/testapi";
import {ProfileBioSection} from "@/components/profile/ProfileBio";
import ProfileBanner from "@/components/profile/ProfileBanner";
import ProfileHeader from "@/components/profile/ProfileHeader";

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
    discord: (h: string) => `https://discord.com/${h}`,
}

// ─── Hook ──────────────────────────────────

function usePublicProfile(username: string) {
    const [profile, setProfile] = React.useState<ProfileData | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [notFound, setNotFound] = React.useState(false)

    const fetchProfile = React.useCallback(async () => {
        if (!username) return
        setLoading(true)
        setNotFound(false)

        try {
            const data = await getPublicProfile(username)
            setProfile(data)
        } catch {
            setNotFound(true)
        } finally {
            setLoading(false)
        }
    }, [username])

    React.useEffect(() => { fetchProfile() }, [fetchProfile])

    return { profile, loading, notFound, refetch: fetchProfile }
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
                <ProfileBanner />
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8">

                {/* Header */}
                <ProfileHeader
                    username_shareBtn={profile?.username}
                    username={profile?.username}
                    image={profile?.image}
                    displayName={profile?.displayName}
                    isPrivateProfile={false}
                    isPublicProfile={true}/>


                {/* Bio + Meta */}
                <ProfileBioSection
                    bio={profile?.bio}
                    location={profile?.location}
                    website={profile?.website}
                    joinedAt={profile?.joinedAt}
                    socials={activeSocials}
                    socialIcons={SocialIcons}
                    socialUrls={SocialUrls}
                />

                <div>
                    AUSDHUAsasdasd
                </div>

            </div>
        </div>
    )
}