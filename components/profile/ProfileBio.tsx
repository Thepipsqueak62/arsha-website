import {CalendarDays, LinkIcon, MapPin} from "lucide-react";

type ProfileMetaSectionProps = {
    bio?: string
    location?: string
    website?: string
    joinedAt?: string
    socials: [string, string][]
    socialIcons: Record<string, React.ElementType>
    socialUrls: Record<string, (h: string) => string>
}

export function ProfileBioSection({
                                       bio,
                                       location,
                                       website,
                                       joinedAt,
                                       socials,
                                       socialIcons,
                                       socialUrls,
                                   }: ProfileMetaSectionProps) {
    const hasContent =
        bio || location || website || joinedAt || socials.length > 0

    if (!hasContent) return null

    return (
        <div className="mb-6 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">

            {/* LEFT SIDE */}
            <div className="flex-1">
                {bio && (
                    <p className="text-sm text-white/60 leading-relaxed max-w-lg">
                        {bio}
                    </p>
                )}

                <div className="mt-3 flex flex-wrap gap-3">
                    {location && (
                        <span className="flex items-center gap-1.5 text-xs text-white/30">
              <MapPin size={11} /> {location}
            </span>
                    )}

                    {website && (
                        <a
                            href={website.startsWith("http") ? website : `https://${website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-violet-400 transition-colors"
                        >
                            <LinkIcon size={11} /> {website}
                        </a>
                    )}

                    {joinedAt && (
                        <span className="flex items-center gap-1.5 text-xs text-white/30">
              <CalendarDays size={11} /> Joined {joinedAt}
            </span>
                    )}
                </div>
            </div>

            {/* RIGHT SIDE (SOCIALS) */}
            {socials.length > 0 && (
                <div className="flex items-center gap-2">
                    {socials.map(([platform, handle]) => {
                        const Icon = socialIcons[platform]
                        const getUrl = socialUrls[platform]

                        if (!Icon || !getUrl) return null

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
        </div>
    )
}