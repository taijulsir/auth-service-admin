export type UserRole = "ADMIN" | "MANAGER" | "USER"
export type UserStatus = "ACTIVE" | "PENDING" | "SUSPENDED"

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    status: UserStatus
    createdAt: string
    lastLogin?: string
    avatar?: string
}
