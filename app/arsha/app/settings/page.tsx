"use client"

import * as React from "react"
import {useOwnProfile, useUpdateProfile} from "@/hooks/useProfile";
import {useChangeEmail} from "@/hooks/useChangeEmail";
import {useChangePassword} from "@/hooks/useChangePassword";

export default function SettingsPage() {
    const {profile,loading,error,refetch} = useOwnProfile()
    const {save,saving,error:saveError} = useUpdateProfile()
    const { step, loading: emailLoading, error: emailError, requestChange, confirmChange } = useChangeEmail()
    const { changePassword, loading: pwLoading, error: pwError, success: pwSuccess } = useChangePassword()

    const [newEmail, setNewEmail] = React.useState("")
    const [otp, setOtp] = React.useState("")

    const [currentPassword, setCurrentPassword] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="min-h-screen bg-[#080815] text-white">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">

                <div className="mb-8">
                    <h1 className="text-2xl font-black tracking-tight">Settings</h1>
                    <p className="text-sm text-white/30 mt-1">Manage your account preferences</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">

                    <aside className="md:w-52 shrink-0">
                        <button className="border-2 border-primary rounded-2xl py-1 px-1">
                            Account Settings
                        </button>
                    </aside>

                    <div className="flex-1 space-y-8">
                        <p>Current name: {profile?.displayName}</p>

                        {/* Email change */}
                        <div className="space-y-2">
                            <label className="block text-sm text-white/50">Change Email</label>

                            {step !== "otp-sent" && (
                                <div className="flex gap-2">
                                    <input
                                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1"
                                        placeholder="new-email@example.com"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                    <button
                                        onClick={() => requestChange(newEmail)}
                                        disabled={emailLoading || !newEmail}
                                        className="bg-primary rounded-xl px-4 py-2 disabled:opacity-50"
                                    >
                                        {emailLoading ? "Sending..." : "Send Code"}
                                    </button>
                                </div>
                            )}

                            {step === "otp-sent" && (
                                <div className="flex gap-2">
                                    <input
                                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1"
                                        placeholder="Enter 6-digit code"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <button
                                        onClick={() => confirmChange(newEmail, otp)}
                                        disabled={emailLoading || otp.length !== 6}
                                        className="bg-primary rounded-xl px-4 py-2 disabled:opacity-50"
                                    >
                                        {emailLoading ? "Confirming..." : "Confirm"}
                                    </button>
                                </div>
                            )}

                            {step === "done" && (
                                <p className="text-green-500 text-sm">Email updated successfully.</p>
                            )}

                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                        </div>

                        {/* Password change */}
                        <div className="space-y-2">
                            <label className="block text-sm text-white/50">Change Password</label>

                            <input
                                type="password"
                                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-full"
                                placeholder="Current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-full"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <button
                                onClick={async () => {
                                    await changePassword(currentPassword, newPassword)
                                    setCurrentPassword("")
                                    setNewPassword("")
                                }}
                                disabled={pwLoading || !currentPassword || !newPassword}
                                className="bg-primary rounded-xl px-4 py-2 disabled:opacity-50"
                            >
                                {pwLoading ? "Updating..." : "Update Password"}
                            </button>

                            {pwSuccess && <p className="text-green-500 text-sm">Password updated successfully.</p>}
                            {pwError && <p className="text-red-500 text-sm">{pwError}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}