"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    RiUserSettingsLine,
    RiBellLine,
    RiShieldLine,
    RiPaintLine,
    RiMailLine,
    RiLockPasswordLine,
    RiDeleteBinLine,
    RiCheckLine,
    RiMoonLine,
    RiSunLine,
    RiComputerLine,
    RiEyeLine,
    RiEyeOffLine,
    RiAlertLine,
} from "react-icons/ri"

// ─── Types ──────────────────────────────────

type Section = "account" | "notifications" | "privacy" | "appearance"

// ─── Nav ────────────────────────────────────

const NAV: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: "account",       label: "Account",          icon: RiUserSettingsLine },
    { id: "notifications", label: "Notifications",    icon: RiBellLine },
    { id: "privacy",       label: "Privacy & Security", icon: RiShieldLine },
    { id: "appearance",    label: "Appearance",        icon: RiPaintLine },
]

// ─── Reusable UI ────────────────────────────

function SettingRow({
                        label,
                        description,
                        children,
                        danger,
                    }: {
    label: string
    description?: string
    children: React.ReactNode
    danger?: boolean
}) {
    return (
        <div className={cn(
            "flex items-center justify-between gap-6 py-4 border-b border-white/5 last:border-0",
            danger && "border-red-500/10"
        )}>
            <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", danger ? "text-red-400" : "text-white")}>{label}</p>
                {description && <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{description}</p>}
            </div>
            <div className="shrink-0">{children}</div>
        </div>
    )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={cn(
                "relative h-5 w-9 rounded-full transition-colors duration-200",
                checked ? "bg-violet-600" : "bg-white/10"
            )}
        >
            <span className={cn(
                "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200",
                checked && "translate-x-4"
            )} />
        </button>
    )
}

function Input({
                   label,
                   type = "text",
                   defaultValue,
                   placeholder,
               }: {
    label: string
    type?: string
    defaultValue?: string
    placeholder?: string
}) {
    const [show, setShow] = React.useState(false)
    const isPassword = type === "password"

    return (
        <div className="space-y-1.5">
            <label className="text-xs text-white/40 font-medium uppercase tracking-widest">{label}</label>
            <div className="relative">
                <input
                    type={isPassword && !show ? "password" : "text"}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all pr-10"
                />
                {isPassword && (
                    <button
                        onClick={() => setShow(s => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                        {show ? <RiEyeOffLine size={14} /> : <RiEyeLine size={14} />}
                    </button>
                )}
            </div>
        </div>
    )
}

function SaveButton({ label = "Save changes" }: { label?: string }) {
    const [saved, setSaved] = React.useState(false)

    const handleClick = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <button
            onClick={handleClick}
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                saved
                    ? "bg-green-600 text-white"
                    : "bg-violet-600 hover:bg-violet-500 text-white"
            )}
        >
            {saved ? <><RiCheckLine size={14} /> Saved</> : label}
        </button>
    )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/25 mb-4 mt-8 first:mt-0">{children}</h2>
    )
}

// ─── Sections ───────────────────────────────

function AccountSection() {
    return (
        <div className="space-y-0">
            <SectionTitle>Email address</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                <Input label="Current email" defaultValue="user@example.com" />
                <Input label="New email" placeholder="Enter new email" />
                <div className="flex justify-end">
                    <SaveButton label="Update email" />
                </div>
            </div>

            <SectionTitle>Password</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                <Input label="Current password" type="password" />
                <Input label="New password" type="password" placeholder="Min. 8 characters" />
                <Input label="Confirm new password" type="password" placeholder="Repeat new password" />
                <div className="flex justify-end">
                    <SaveButton label="Update password" />
                </div>
            </div>

            <SectionTitle>Danger zone</SectionTitle>
            <div className="bg-red-950/20 border border-red-500/10 rounded-2xl p-5">
                <SettingRow
                    label="Delete account"
                    description="Permanently delete your account and all associated data. This action cannot be undone."
                    danger
                >
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
                        <RiDeleteBinLine size={14} />
                        Delete account
                    </button>
                </SettingRow>
            </div>
        </div>
    )
}

function NotificationsSection() {
    const [settings, setSettings] = React.useState({
        teamInvites:     true,
        tournamentStart: true,
        matchResults:    true,
        friendActivity:  false,
        newFollower:     true,
        weeklyDigest:    false,
        productUpdates:  true,
        emailNotifs:     true,
    })

    const set = (key: keyof typeof settings) => (v: boolean) =>
        setSettings(s => ({ ...s, [key]: v }))

    return (
        <div>
            <SectionTitle>In-app</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl px-5">
                <SettingRow label="Team invites" description="Get notified when someone invites you to a team">
                    <Toggle checked={settings.teamInvites} onChange={set("teamInvites")} />
                </SettingRow>
                <SettingRow label="Tournament starts" description="Reminders before your registered tournaments begin">
                    <Toggle checked={settings.tournamentStart} onChange={set("tournamentStart")} />
                </SettingRow>
                <SettingRow label="Match results" description="Notifications when your matches are completed">
                    <Toggle checked={settings.matchResults} onChange={set("matchResults")} />
                </SettingRow>
                <SettingRow label="Friend activity" description="When friends join tournaments or earn badges">
                    <Toggle checked={settings.friendActivity} onChange={set("friendActivity")} />
                </SettingRow>
                <SettingRow label="New followers" description="When someone adds you to their network">
                    <Toggle checked={settings.newFollower} onChange={set("newFollower")} />
                </SettingRow>
            </div>

            <SectionTitle>Email</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl px-5">
                <SettingRow label="Email notifications" description="Receive important updates via email">
                    <Toggle checked={settings.emailNotifs} onChange={set("emailNotifs")} />
                </SettingRow>
                <SettingRow label="Weekly digest" description="A summary of your activity every week">
                    <Toggle checked={settings.weeklyDigest} onChange={set("weeklyDigest")} />
                </SettingRow>
                <SettingRow label="Product updates" description="News about new features and improvements">
                    <Toggle checked={settings.productUpdates} onChange={set("productUpdates")} />
                </SettingRow>
            </div>
        </div>
    )
}

function PrivacySection() {
    const [settings, setSettings] = React.useState({
        publicProfile:   true,
        showOnlineStatus: true,
        showRanks:       true,
        showTeams:       true,
        allowFriendReqs: true,
        twoFactor:       false,
        loginAlerts:     true,
    })

    const set = (key: keyof typeof settings) => (v: boolean) =>
        setSettings(s => ({ ...s, [key]: v }))

    return (
        <div>
            <SectionTitle>Profile visibility</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl px-5">
                <SettingRow label="Public profile" description="Anyone can view your profile page">
                    <Toggle checked={settings.publicProfile} onChange={set("publicProfile")} />
                </SettingRow>
                <SettingRow label="Show online status" description="Let others see when you're active">
                    <Toggle checked={settings.showOnlineStatus} onChange={set("showOnlineStatus")} />
                </SettingRow>
                <SettingRow label="Show ranks" description="Display your game ranks on your profile">
                    <Toggle checked={settings.showRanks} onChange={set("showRanks")} />
                </SettingRow>
                <SettingRow label="Show teams" description="Display teams you're a member of">
                    <Toggle checked={settings.showTeams} onChange={set("showTeams")} />
                </SettingRow>
                <SettingRow label="Allow friend requests" description="Let other players add you to their network">
                    <Toggle checked={settings.allowFriendReqs} onChange={set("allowFriendReqs")} />
                </SettingRow>
            </div>

            <SectionTitle>Security</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl px-5">
                <SettingRow
                    label="Two-factor authentication"
                    description="Add an extra layer of security to your account"
                >
                    <div className="flex items-center gap-3">
                        {!settings.twoFactor && (
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                                Recommended
                            </span>
                        )}
                        <Toggle checked={settings.twoFactor} onChange={set("twoFactor")} />
                    </div>
                </SettingRow>
                <SettingRow label="Login alerts" description="Get notified of new sign-ins to your account">
                    <Toggle checked={settings.loginAlerts} onChange={set("loginAlerts")} />
                </SettingRow>
            </div>

            <SectionTitle>Sessions</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-white font-medium">Active sessions</p>
                        <p className="text-xs text-white/30 mt-0.5">Sign out of all other devices</p>
                    </div>
                    <button className="px-4 py-2 rounded-xl text-sm font-semibold border border-white/10 text-white/60 hover:border-white/20 hover:bg-white/5 transition-all">
                        Sign out all
                    </button>
                </div>
            </div>
        </div>
    )
}

type Theme = "dark" | "light" | "system"

function AppearanceSection() {
    const [theme, setTheme] = React.useState<Theme>("dark")
    const [accentColor, setAccentColor] = React.useState("violet")

    const themes: { id: Theme; label: string; icon: React.ElementType }[] = [
        { id: "dark",   label: "Dark",   icon: RiMoonLine },
        { id: "light",  label: "Light",  icon: RiSunLine },
        { id: "system", label: "System", icon: RiComputerLine },
    ]

    const accents = [
        { id: "violet", color: "#8b5cf6" },
        { id: "blue",   color: "#3b82f6" },
        { id: "cyan",   color: "#06b6d4" },
        { id: "green",  color: "#22c55e" },
        { id: "rose",   color: "#f43f5e" },
        { id: "orange", color: "#f97316" },
    ]

    return (
        <div>
            <SectionTitle>Theme</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                <div className="grid grid-cols-3 gap-3">
                    {themes.map(t => {
                        const Icon = t.icon
                        const active = theme === t.id
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={cn(
                                    "flex flex-col items-center gap-2 py-4 rounded-xl border transition-all",
                                    active
                                        ? "border-violet-500/50 bg-violet-500/10 text-white"
                                        : "border-white/5 bg-white/[0.02] text-white/40 hover:border-white/10 hover:text-white/60"
                                )}
                            >
                                <Icon size={18} />
                                <span className="text-xs font-medium">{t.label}</span>
                                {active && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            <SectionTitle>Accent color</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 flex-wrap">
                    {accents.map(a => (
                        <button
                            key={a.id}
                            onClick={() => setAccentColor(a.id)}
                            className="relative h-8 w-8 rounded-full transition-transform hover:scale-110"
                            style={{ backgroundColor: a.color }}
                        >
                            {accentColor === a.id && (
                                <RiCheckLine
                                    size={14}
                                    className="absolute inset-0 m-auto text-white"
                                />
                            )}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-white/20 mt-3">Accent color affects buttons, highlights, and active states.</p>
            </div>

            <SectionTitle>Interface</SectionTitle>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl px-5">
                <SettingRow label="Compact mode" description="Reduce spacing for a denser layout">
                    <Toggle checked={false} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="Reduce motion" description="Minimize animations and transitions">
                    <Toggle checked={false} onChange={() => {}} />
                </SettingRow>
            </div>
        </div>
    )
}

// ─── Main ───────────────────────────────────

export default function SettingsPage() {
    const [active, setActive] = React.useState<Section>("account")

    const fadeUp = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.25 },
    }

    const content: Record<Section, React.ReactNode> = {
        account:       <AccountSection />,
        notifications: <NotificationsSection />,
        privacy:       <PrivacySection />,
        appearance:    <AppearanceSection />,
    }

    const titles: Record<Section, string> = {
        account:       "Account",
        notifications: "Notifications",
        privacy:       "Privacy & Security",
        appearance:    "Appearance",
    }

    return (
        <div className="min-h-screen bg-[#080815] text-white">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">

                {/* Page title */}
                <div className="mb-8">
                    <h1 className="text-2xl font-black tracking-tight">Settings</h1>
                    <p className="text-sm text-white/30 mt-1">Manage your account preferences</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">

                    {/* Sidebar nav */}
                    <aside className="md:w-52 shrink-0">
                        <nav className="space-y-1 md:sticky md:top-8">
                            {NAV.map(item => {
                                const Icon = item.icon
                                const isActive = active === item.id
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActive(item.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                                            isActive
                                                ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                                                : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                                        )}
                                    >
                                        <Icon size={15} />
                                        {item.label}
                                    </button>
                                )
                            })}
                        </nav>
                    </aside>

                    {/* Content */}
                    <main className="flex-1 min-w-0">
                        <motion.div
                            key={active}
                            {...fadeUp}
                        >
                            <h2 className="text-lg font-bold mb-6">{titles[active]}</h2>
                            {content[active]}
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    )
}