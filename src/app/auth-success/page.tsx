"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Loader2 } from "lucide-react"
import Cookies from "js-cookie"

function AuthSuccessContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setUser } = useAuth()

    useEffect(() => {
        const token = searchParams.get("token")
        const roles = searchParams.get("roles")

        if (token) {
            // In a real app, you might want to fetch the user profile here
            // using the token to get full user details.
            // For now, we'll construct a basic user object.
            const parsedRoles = roles ? JSON.parse(roles) : []
            const userData = {
                id: "social-user", // This should ideally come from profile API
                name: "Social User",
                email: "", // Should also come from profile API
                role: parsedRoles.includes(2001) ? "ADMIN" : "USER",
                accessToken: token
            }

            Cookies.set("auth_session", "true", { expires: 1 })
            localStorage.setItem("auth_user", JSON.stringify(userData))
            setUser(userData as any)
            
            router.push("/dashboard")
        } else {
            router.push("/login?error=auth_failed")
        }
    }, [searchParams, setUser, router])

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Completing login...</p>
            </div>
        </div>
    )
}

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthSuccessContent />
        </Suspense>
    )
}
