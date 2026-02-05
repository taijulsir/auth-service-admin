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
    user: any | null // Using any for flexibility with the new User type
    setUser: React.Dispatch<React.SetStateAction<any | null>>
    isLoading: boolean
    login: (email: string, password: string) => Promise<{ requiresMFA?: boolean, mfaToken?: string } | void>
    verifyMFA: (mfaToken: string, token: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
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

    const handleSuccessLogin = (data: any) => {
        const userData = {
            id: data.user?.id || data.user?._id || 'admin',
            email: data.user?.email || 'admin@example.com',
            roles: data.roles || [],
            accessToken: data.accessToken,
            is2FAEnabled: data.user?.is2FAEnabled
        }

        Cookies.set("auth_session", "true", { expires: 1 })
        localStorage.setItem("auth_user", JSON.stringify(userData))
        setUser(userData)
        router.push("/dashboard")
    }

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            const response = await api.post('/admin/auth/login', { email, pwd: password });
            
            if (response.data.requiresMFA) {
                return { 
                    requiresMFA: true, 
                    mfaToken: response.data.mfaToken 
                }
            }

            handleSuccessLogin(response.data)
        } catch (error) {
            console.error("Login failed:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const verifyMFA = async (mfaToken: string, token: string) => {
        setIsLoading(true)
        try {
            const response = await api.post('/admin/auth/verify-mfa', { mfaToken, token });
            handleSuccessLogin(response.data)
        } catch (error) {
            console.error("MFA Verification failed:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            await api.get('/admin/auth/logout');
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
                verifyMFA,
                logout,
                isAuthenticated: !!user
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
