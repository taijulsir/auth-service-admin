"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/users/columns"
import { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Loader2 } from "lucide-react"
import { useAxiosPrivate } from "@/hooks/use-axios-private"
import { userService } from "@/lib/api/services/user.service"
import { toast } from "sonner"

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getUsers()
                // Ensure users matches the state format
                setUsers(response.users || response)
            } catch (error) {
                console.error("Failed to fetch users:", error)
                toast.error("Failed to load users")
            } finally {
                setIsLoading(false)
            }
        }

        fetchUsers()
    }, [axiosPrivate])

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                        <p className="text-muted-foreground">Manage your team members and their access levels.</p>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={users}
                        filterColumn="email"
                        filterPlaceholder="Filter by email..."
                        topActions={
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-8">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Bulk Delete
                                </Button>
                            </div>
                        }
                    />
                )}
            </div>
        </DashboardLayout>
    )
}
