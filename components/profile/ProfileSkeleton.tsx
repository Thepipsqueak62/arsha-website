import * as React from "react";

export function ProfileSkeleton() {
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