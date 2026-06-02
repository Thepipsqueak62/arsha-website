"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    RiTwitterXLine,
    RiTwitchLine,
    RiDiscordLine,
    RiCamera2Line,
    RiCheckLine,
    RiCloseLine,
} from "react-icons/ri"
import { Loader2 } from "lucide-react"

// ─── Types ─────────────────────────────────

export interface ProfileFormData {
    displayName: string
    username: string
    bio: string
    location: string
    website: string
    socials: {
        twitter: string
        twitch: string
        discord: string
    }
}

interface EditProfileSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData: ProfileFormData
    avatarUrl?: string | null
    onSaved?: (data: ProfileFormData) => void
}

// ─── Helpers ───────────────────────────────

function getInitials(name: string): string {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
}

// ─── Field Component ───────────────────────

interface FieldProps {
    label: string
    error?: string
    children: React.ReactNode
}

function Field({ label, error, children }: FieldProps) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-white/30">
                {label}
            </label>
            {children}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-red-400"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Text Input ────────────────────────────

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    prefix?: string
}

function TextInput({ prefix, className, ...props }: TextInputProps) {
    return (
        <div className={cn(
            "flex items-center gap-0 rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden",
            "focus-within:border-violet-500/50 focus-within:bg-white/[0.06] transition-all"
        )}>
            {prefix && (
                <span className="pl-3 text-sm text-white/25 select-none shrink-0">{prefix}</span>
            )}
            <input
                {...props}
                className={cn(
                    "flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/20",
                    "outline-none min-w-0",
                    prefix && "pl-1",
                    className
                )}
            />
        </div>
    )
}

// ─── Textarea ──────────────────────────────

function TextArea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={cn(
                "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/20",
                "outline-none resize-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all",
                className
            )}
        />
    )
}

// ─── Avatar Upload ─────────────────────────

interface AvatarUploadProps {
    currentUrl?: string | null
    displayName: string
    onFileSelect: (file: File) => void
    previewUrl?: string | null
}

function AvatarUpload({ currentUrl, displayName, onFileSelect, previewUrl }: AvatarUploadProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) onFileSelect(file)
    }

    const src = previewUrl ?? currentUrl ?? undefined

    return (
        <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => inputRef.current?.click()}>
                <Avatar className="h-16 w-16 rounded-2xl">
                    <AvatarImage src={src} />
                    <AvatarFallback className="bg-violet-600 text-white text-lg font-black rounded-2xl">
                        {getInitials(displayName || "?")}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <RiCamera2Line size={18} className="text-white" />
                </div>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                    Change avatar
                </button>
                <p className="text-xs text-white/25 mt-0.5">PNG, JPG up to 2MB</p>
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleChange}
            />
        </div>
    )
}

// ─── Validation ────────────────────────────

interface FormErrors {
    displayName?: string
    username?: string
    bio?: string
    website?: string
}

function validate(data: ProfileFormData): FormErrors {
    const errors: FormErrors = {}

    if (!data.displayName.trim()) {
        errors.displayName = "Display name is required"
    } else if (data.displayName.length > 32) {
        errors.displayName = "Max 32 characters"
    }

    if (!data.username.trim()) {
        errors.username = "Username is required"
    } else if (!/^[a-z0-9_]{3,20}$/.test(data.username)) {
        errors.username = "3–20 chars, lowercase letters, numbers, underscores only"
    }

    if (data.bio.length > 160) {
        errors.bio = "Max 160 characters"
    }

    if (data.website && !/^https?:\/\/.+/.test(data.website) && !data.website.includes(".")) {
        errors.website = "Enter a valid URL or domain"
    }

    return errors
}

// ─── Main Component ────────────────────────

export function EditProfileSheet({
                                     open,
                                     onOpenChange,
                                     initialData,
                                     avatarUrl,
                                     onSaved,
                                 }: EditProfileSheetProps) {
    const [form, setForm] = React.useState<ProfileFormData>(initialData)
    const [errors, setErrors] = React.useState<FormErrors>({})
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null)
    const [saving, setSaving] = React.useState(false)
    const [saveError, setSaveError] = React.useState<string | null>(null)
    const [saved, setSaved] = React.useState(false)

    // Reset form when opened
    React.useEffect(() => {
        if (open) {
            setForm(initialData)
            setErrors({})
            setAvatarFile(null)
            setAvatarPreview(null)
            setSaveError(null)
            setSaved(false)
        }
    }, [open, initialData])

    const update = (key: keyof ProfileFormData, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
        setErrors(prev => ({ ...prev, [key]: undefined }))
    }

    const updateSocial = (platform: keyof ProfileFormData["socials"], value: string) => {
        setForm(prev => ({
            ...prev,
            socials: { ...prev.socials, [platform]: value },
        }))
    }

    const handleAvatarSelect = (file: File) => {
        setAvatarFile(file)
        const url = URL.createObjectURL(file)
        setAvatarPreview(url)
    }

    const handleSave = async () => {
        const validationErrors = validate(form)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setSaving(true)
        setSaveError(null)

        try {
            // 1. Update name via better-auth if changed
            if (form.displayName !== initialData.displayName) {
                await authClient.updateUser({ name: form.displayName })
            }

            // 2. Upload avatar if changed
            if (avatarFile) {
                const formData = new FormData()
                formData.append("avatar", avatarFile)
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/profile/avatar`,
                    { method: "POST", body: formData, credentials: "include" }
                )
                if (!res.ok) throw new Error("Avatar upload failed")
            }

            // 3. Save extended profile fields to your Fastify API
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/profile`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        username: form.username,
                        bio: form.bio,
                        location: form.location,
                        website: form.website,
                        socials: form.socials,
                    }),
                }
            )

            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body.message ?? "Failed to save profile")
            }

            setSaved(true)
            onSaved?.(form)

            setTimeout(() => {
                onOpenChange(false)
            }, 800)

        } catch (err) {
            setSaveError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setSaving(false)
        }
    }

    const isDirty = JSON.stringify(form) !== JSON.stringify(initialData) || avatarFile !== null
    const bioLength = form.bio.length

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md p-0 bg-[#080815] border-white/5 flex flex-col"
            >
                {/* Header */}
                <SheetHeader className="px-5 py-4 border-b border-white/5 shrink-0">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-white text-base font-bold">Edit Profile</SheetTitle>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onOpenChange(false)}
                                disabled={saving}
                                className="h-8 w-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
                            >
                                <RiCloseLine size={16} />
                            </button>
                        </div>
                    </div>
                </SheetHeader>

                {/* Scrollable form body */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

                    {/* Avatar */}
                    <AvatarUpload
                        currentUrl={avatarUrl}
                        displayName={form.displayName}
                        onFileSelect={handleAvatarSelect}
                        previewUrl={avatarPreview}
                    />

                    <div className="h-px bg-white/5" />

                    {/* Identity */}
                    <div className="space-y-4">
                        <Field label="Display Name" error={errors.displayName}>
                            <TextInput
                                value={form.displayName}
                                onChange={e => update("displayName", e.target.value)}
                                placeholder="Your name"
                                maxLength={32}
                            />
                        </Field>

                        <Field label="Username" error={errors.username}>
                            <TextInput
                                value={form.username}
                                onChange={e => update("username", e.target.value.toLowerCase())}
                                placeholder="shadowrift"
                                prefix="arsha.gg/"
                                maxLength={20}
                            />
                        </Field>

                        <Field label={`Bio (${bioLength}/160)`} error={errors.bio}>
                            <TextArea
                                value={form.bio}
                                onChange={e => update("bio", e.target.value)}
                                placeholder="Tell people about yourself..."
                                rows={3}
                                maxLength={160}
                            />
                        </Field>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Location & Website */}
                    <div className="space-y-4">
                        <Field label="Location">
                            <TextInput
                                value={form.location}
                                onChange={e => update("location", e.target.value)}
                                placeholder="Los Angeles, CA"
                            />
                        </Field>

                        <Field label="Website" error={errors.website}>
                            <TextInput
                                value={form.website}
                                onChange={e => update("website", e.target.value)}
                                placeholder="https://yoursite.com"
                            />
                        </Field>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Socials */}
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                            Social Links
                        </p>

                        <div className="space-y-3">
                            {[
                                { key: "twitter" as const, icon: RiTwitterXLine, placeholder: "username", prefix: "x.com/" },
                                { key: "twitch" as const, icon: RiTwitchLine, placeholder: "channel", prefix: "twitch.tv/" },
                                { key: "discord" as const, icon: RiDiscordLine, placeholder: "username#0000", prefix: "" },
                            ].map(({ key, icon: Icon, placeholder, prefix }) => (
                                <div key={key} className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/30 shrink-0">
                                        <Icon size={15} />
                                    </div>
                                    <TextInput
                                        value={form.socials[key]}
                                        onChange={e => updateSocial(key, e.target.value)}
                                        placeholder={placeholder}
                                        prefix={prefix || undefined}
                                        className="flex-1"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="shrink-0 px-5 py-4 border-t border-white/5 space-y-2">
                    {saveError && (
                        <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-400 text-center"
                        >
                            {saveError}
                        </motion.p>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={() => onOpenChange(false)}
                            disabled={saving}
                            className="flex-1 h-10 rounded-xl border border-white/10 text-sm font-semibold text-white/40 hover:text-white/70 hover:bg-white/5 transition-all disabled:opacity-40"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={saving || !isDirty || saved}
                            className={cn(
                                "flex-1 h-10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2",
                                saved
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : "bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                            )}
                        >
                            {saving ? (
                                <><Loader2 size={14} className="animate-spin" /> Saving…</>
                            ) : saved ? (
                                <><RiCheckLine size={14} /> Saved!</>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>

                    {!isDirty && !saved && (
                        <p className="text-center text-[11px] text-white/20">No changes to save</p>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}