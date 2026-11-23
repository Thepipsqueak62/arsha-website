import React from "react"
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/framer-motion/fadeup"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/profile/getInitials.helper"
import {RiCheckboxCircleFill, RiEditLine, RiExternalLinkLine} from "react-icons/ri"
import Link from "next/link";
import {ShareButton} from "@/components/profile/ShareButton";

type Props = {
    image?: string | null
    displayName?: string | null
    username?: string | null
    onClick?: () => void
    username_shareBtn?: string
    isPrivateProfile?: boolean
    isPublicProfile?: boolean
}

const ProfileHeader = ({
                           image,
                           displayName,
                           username,
                           onClick,
                           username_shareBtn,
                           isPrivateProfile,
                           isPublicProfile
                       }: Props) => (
    <div className="relative -mt-14 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex items-end gap-4">
            <motion.div {...fadeUp} className="relative">
                <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-[#080815] rounded-2xl">
                    <AvatarImage src={image ?? undefined} />
                    <AvatarFallback className="bg-violet-600 text-white text-2xl font-black rounded-2xl">
                        {getInitials(displayName || "?")}
                    </AvatarFallback>
                </Avatar>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="pb-1">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        {displayName || "Anonymous"}
                    </h1>
                    {username && (
                        <RiCheckboxCircleFill size={18} className="text-violet-400" />
                    )}
                </div>
                <p className="text-sm text-white/40">
                    {username ? `@${username}` : (
                        <button
                            onClick={onClick}
                            className="text-violet-400 hover:text-violet-300 transition-colors"
                        >
                            Set a username →
                        </button>
                    )}
                </p>
            </motion.div>
        </div>




        {isPublicProfile && (
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex items-center gap-2 pb-1">

                <ShareButton username={username_shareBtn} />
            </motion.div>
        )}

        {/* Actions */}
        {isPrivateProfile && (
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex items-center gap-2 pb-1">
                {username && (
                    <Link
                        href={`/arsha/app/user/${username}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60"
                    >
                        <RiExternalLinkLine size={14} />
                        View public
                    </Link>

                )}
                <ShareButton username={username_shareBtn} />



                <button
                    onClick={onClick}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 transition-colors text-white"
                >
                    <RiEditLine size={14} />
                    Edit Profile
                </button>


            </motion.div>
    )}

    </div>

)

export default ProfileHeader