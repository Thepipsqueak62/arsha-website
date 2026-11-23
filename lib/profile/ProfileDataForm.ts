import { ProfileFormData } from "@/components/arsha-app-ui/edit-profile-sheet"

export function buildFormData(profile?: any): ProfileFormData {
    return {
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
}