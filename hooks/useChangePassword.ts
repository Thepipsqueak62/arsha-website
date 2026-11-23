// hooks/useChangePassword.ts
import * as React from "react"
import { authClient } from "@/lib/auth-client"

export function useChangePassword() {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState(false)

    const changePassword = React.useCallback(async (currentPassword: string, newPassword: string) => {
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            const { error } = await authClient.changePassword({
                currentPassword,
                newPassword,
                revokeOtherSessions: true,
            })
            if (error) throw new Error(error.message)
            setSuccess(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [])

    return { changePassword, loading, error, success }
}