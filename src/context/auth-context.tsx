"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import api from "../lib/api/axios"

export type Role = "ADMIN" | "MANAGER" | "USER"

interface User {
    id: string
    name: string
    email: string
    role: Role
    avatar?: string
    accessToken?: string
}

interface AuthContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
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
        // We shouldn't store User in localStorage if it contains sensitive data,
        // but for now, we'll keep it for persistence of basic info.
        // The middleware uses "jwt" or specific cookie for session check.
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem("auth_user")
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
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
            const response = await api.post('/consumer/auth/login', { email, password });
            
            const userData: User = {
                id: response.data.user.id || response.data.user._id,
                name: response.data.user.name || 'User',
                email: response.data.user.email,
                role: response.data.user.roles[0] === 2001 ? "ADMIN" : "USER", // Map numeric roles to strings if needed
                avatar: response.data.user.avatar,
                accessToken: response.data.accessToken
            }

            // Set session cookie for middleware (backend sets the refresh token cookie)
            Cookies.set("auth_session", "true", { expires: 1 })
            localStorage.setItem("auth_user", JSON.stringify(userData))
            setUser(userData)
            router.push("/dashboard")
        } catch (error) {
            console.error("Login failed:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            await api.get('/consumer/auth/logout');
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            Cookies.remove("auth_session")
            localStorage.removeItem("auth_user")
            setUser(null)
            router.push("/login")
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
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
