import * as React from "react";
import {getProfile, updateProfile} from "@/app/API/testapi";
import {ProfileFormData} from "@/types/Profile/profileFormatData";

export function useOwnProfile() {
    const [profile, setProfile] = React.useState<ProfileFormData | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    const fetch = React.useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getProfile()
            setProfile(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [])

    React.useEffect(() => { fetch() }, [fetch])

    return { profile, loading, error, refetch: fetch }
}

export function useUpdateProfile() {
    const [saving, setSaving] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const save = React.useCallback(async (data:Partial<ProfileFormData>) => {
        setSaving(true)
        setError(null)
        try {
            return await updateProfile(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setSaving(false)
        }
    }, [])

    return { save,saving, error }
}