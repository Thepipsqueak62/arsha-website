// hooks/useChangeEmail.ts
import * as React from "react"
import { authClient } from "@/lib/auth-client"

export function useChangeEmail() {
    const [step, setStep] = React.useState<"idle" | "otp-sent" | "done">("idle")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const requestChange = React.useCallback(async (newEmail: string) => {
        setLoading(true)
        setError(null)
        try {
            const { error } = await authClient.emailOtp.requestEmailChange({ newEmail })
            if (error) throw new Error(error.message)
            setStep("otp-sent")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [])

    const confirmChange = React.useCallback(async (newEmail: string, otp: string) => {
        setLoading(true)
        setError(null)
        try {
            const { error } = await authClient.emailOtp.changeEmail({ newEmail, otp })
            if (error) throw new Error(error.message)
            setStep("done")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [])

    return { step, loading, error, requestChange, confirmChange }
}