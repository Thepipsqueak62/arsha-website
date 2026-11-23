"use client"

import * as React from "react"
import { useOwnProfile, useUpdateProfile } from "@/hooks/useProfile"
import {useTestAPIHook} from "@/hooks/testAPIHook";

export default function UsernameSettingsPage() {
    const { profile, loading, error, refetch } = useOwnProfile()
    const { save, saving, error: saveError } = useUpdateProfile()

    const [username, setUsername] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null)









    const {data} = useTestAPIHook()

    // Seed the input once the profile loads
    React.useEffect(() => {
        if (profile?.username) {
            setUsername(profile.username)
        }
    }, [profile])

    async function handleSave() {
        setSuccessMessage(null)
        try {
            await save({ username })
            await refetch()
            setSuccessMessage("Username updated successfully.")
        } catch {
            // saveError is already set by the hook
        }
    }

    if (loading) return <p className="text-white p-8">Loading...</p>
    if (error) return <p className="text-red-500 p-8">Error: {error}</p>

    return (
        <div className="min-h-screen bg-[#080815] text-white">
            <div className="max-w-2xl mx-auto px-4 md:px-8 py-10">

                <div className="mb-8">
                    <h1 className="text-2xl font-black tracking-tight">Account Settings</h1>
                    <p className="text-sm text-white/30 mt-1">Update your username</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-white/50">Username</label>

                    <div className="flex gap-2">
                        <input
                            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter a username"
                        />
                        <button
                            onClick={handleSave}
                            disabled={saving || !username || username === profile?.username}
                            className="bg-primary rounded-xl px-4 py-2 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>

                    {successMessage && (
                        <p className="text-green-500 text-sm">{successMessage}</p>
                    )}
                    {saveError && (
                        <p className="text-red-500 text-sm">{saveError}</p>
                    )}
                </div>
                <div>
                    {data?.message}
                </div>
                <div>
                    {data?.message_id}
                </div>

            </div>

        </div>
    )
}