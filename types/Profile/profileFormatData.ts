export interface ProfileFormData {
    displayName: string
    username: string
    bio: string
    location: string
    website: string
    joinedAt: string
    image: string
    socials: {
        twitter: string
        twitch: string
        discord: string
    }
}