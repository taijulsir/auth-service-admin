"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export type Role = "ADMIN" | "MANAGER" | "USER"

interface User {
    id: string
    name: string
    email: string
    role: Role
    avatar?: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Mock user check from local storage or session
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem("auth_user")
                if (storedUser && Cookies.get("auth_session")) {
                    setUser(JSON.parse(storedUser))
                } else {
                    // If cookie is missing, clear local storage
                    localStorage.removeItem("auth_user")
                    setUser(null)
                }
            } catch (error) {
                console.error("Failed to parse stored user", error)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            // Mock login for now
            // Logic for backend integration goes here
            const mockUser: User = {
                id: "1",
                name: "Admin User",
                email: email,
                role: "ADMIN",
                avatar: ""
            }

            // Set session cookie for middleware
            Cookies.set("auth_session", "true", { expires: 1 }) // 1 day
            localStorage.setItem("auth_user", JSON.stringify(mockUser))
            setUser(mockUser)
            router.push("/dashboard")
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        Cookies.remove("auth_session")
        localStorage.removeItem("auth_user")
        setUser(null)
        router.push("/login")
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
