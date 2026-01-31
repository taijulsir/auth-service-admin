import DashboardLayout from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/users/columns"
import { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

const mockUsers: User[] = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@dashboard.com",
        role: "ADMIN",
        status: "ACTIVE",
        createdAt: "2024-01-01T10:00:00Z",
        lastLogin: "2024-01-31T15:00:00Z",
    },
    {
        id: "2",
        name: "Manager One",
        email: "manager@dashboard.com",
        role: "MANAGER",
        status: "ACTIVE",
        createdAt: "2024-01-05T12:00:00Z",
    },
    {
        id: "3",
        name: "John Doe",
        email: "john@example.com",
        role: "USER",
        status: "PENDING",
        createdAt: "2024-01-10T09:30:00Z",
    },
    {
        id: "4",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "USER",
        status: "SUSPENDED",
        createdAt: "2024-01-15T14:15:00Z",
    },
    {
        id: "5",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "USER",
        status: "ACTIVE",
        createdAt: "2024-01-20T11:45:00Z",
    },
    {
        id: "6",
        name: "Bob Wilson",
        email: "bob@example.com",
        role: "USER",
        status: "ACTIVE",
        createdAt: "2024-01-22T16:20:00Z",
    },
    {
        id: "7",
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "MANAGER",
        status: "ACTIVE",
        createdAt: "2024-01-25T08:00:00Z",
    },
]

export default function UsersPage() {
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

                <DataTable
                    columns={columns}
                    data={mockUsers}
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
            </div>
        </DashboardLayout>
    )
}
