

export async function getProfile(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/me`,
        {
            credentials:"include",
        })
    if (!res.ok) {
        throw new Error("Fail to Load Profile");
    }
    return res.json();
}


export async function getPublicProfile(username: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/${username}`,
        { cache: "no-store" }
    )

    if (res.status === 404) return null
    if (!res.ok) throw new Error("Failed to load profile")

    return res.json()
}

import { ProfileFormData } from "@/types/Profile/profileFormatData"

export async function updateProfile(data: Partial<ProfileFormData>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // sends the session cookie
        body: JSON.stringify(data),
    })

    if (res.status === 404) return null
    if (!res.ok) throw new Error("Failed to update profile")

    return res.json()
}

export async function testAPIRequest(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`,)
    if (res.status === 404) return null
    if (!res.ok) throw new Error("Failed to load test")
    return res.json()
}