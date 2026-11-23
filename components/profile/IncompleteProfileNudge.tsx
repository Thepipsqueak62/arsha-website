import React from 'react';
import {motion} from "framer-motion";
import {fadeUp} from "@/lib/framer-motion/fadeup";

type Props = {
    onClick: () => void
}
export function IncompleteProfileNudge({onClick}:Props) {
    return (
        <div>
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
                    onClick={onClick}
                    className="shrink-0 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-semibold text-white transition-colors"
                >
                    Complete →
                </button>
            </motion.div>
        </div>
    );
}

export default IncompleteProfileNudge;