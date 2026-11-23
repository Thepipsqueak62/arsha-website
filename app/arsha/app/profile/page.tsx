"use client"

import * as React from "react"
import { EditProfileSheet } from "@/components/arsha-app-ui/edit-profile-sheet"
import {
    RiTwitterXLine,
    RiTwitchLine,
    RiDiscordLine,
} from "react-icons/ri"
import {useOwnProfile} from "@/hooks/useProfile";
import {ProfileSkeleton} from "@/components/profile/ProfileSkeleton";
import {ProfileBioSection} from "@/components/profile/ProfileBio";
import {buildFormData} from "@/lib/profile/ProfileDataForm";
import {EditBannerButton} from "@/components/profile/EditBannerBtn";
import IncompleteProfileNudge from "@/components/profile/IncompleteProfileNudge";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileBanner from "@/components/profile/ProfileBanner";



const SocialIcons = {
    twitter: RiTwitterXLine,
    twitch: RiTwitchLine,
    discord: RiDiscordLine,
}

const SocialUrls = {
    twitter: (h: string) => `https://x.com/${h}`,
    twitch: (h: string) => `https://twitch.tv/${h}`,
    discord: (h:string) => `https://twitch.tv/${h}`,
}
// ─── Main Page ──────────────────────────────

export default function MyProfilePage() {
    const { profile, loading, error, refetch } = useOwnProfile()
    const [editOpen, setEditOpen] = React.useState(false)
    const isProfileIncomplete = !profile?.username || !profile?.bio
    const activeSocials = Object.entries(profile?.socials ?? {}).filter(([, v]) => v)

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

    return (
        <div className="min-h-screen bg-[#080815] text-white">
            {/* ── Banner ── */}
            <div className="relative h-48 md:h-56 overflow-hidden rounded-b-2xl">
                <ProfileBanner/>
                {/* Edit banner button */}
                <EditBannerButton onClick={() => setEditOpen(true)}/>
            </div>
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                {/* ── Profile Header ── */}
                <ProfileHeader onClick={() => setEditOpen(true)} username_shareBtn={profile?.username} username={profile?.username} image={profile?.image} displayName={profile?.displayName} isPrivateProfile={true} />

                {/* ── Incomplete profile nudge ── */}
                {isProfileIncomplete && (
                    <IncompleteProfileNudge onClick={() => setEditOpen(true)} />
                )}
                {/* ── Bio + Meta ── */}
                <ProfileBioSection
                    bio={profile?.bio}
                    location={profile?.location}
                    website={profile?.website}
                    joinedAt={profile?.joinedAt}
                    socials={activeSocials}
                    socialIcons={SocialIcons}
                    socialUrls={SocialUrls}
                />
                {/* ── Stats ── */}
            </div>
            {/* ── Edit Sheet ── */}
            <EditProfileSheet
                open={editOpen}
                onOpenChange={setEditOpen}
                initialData={buildFormData(profile)}
                avatarUrl={profile?.image}
                onSaved={() => {
                    refetch()
                }}
            />
        </div>
    )
}