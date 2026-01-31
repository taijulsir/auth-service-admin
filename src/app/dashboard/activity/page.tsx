"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

interface ActivityLog {
    id: string
    user: string
    action: string
    target: string
    timestamp: string
    status: "SUCCESS" | "WARNING" | "FAILURE"
}

const columns: ColumnDef<ActivityLog>[] = [
    {
        accessorKey: "timestamp",
        header: "Time",
        cell: ({ row }) => <div className="text-xs text-muted-foreground">{new Date(row.getValue("timestamp")).toLocaleString()}</div>
    },
    {
        accessorKey: "user",
        header: "Admin/User",
        cell: ({ row }) => <div className="font-medium">{row.getValue("user")}</div>
    },
    {
        accessorKey: "action",
        header: "Action",
    },
    {
        accessorKey: "target",
        header: "Resource",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant={status === "SUCCESS" ? "default" : status === "WARNING" ? "secondary" : "destructive"}>
                    {status}
                </Badge>
            )
        }
    }
]

const mockLogs: ActivityLog[] = [
    { id: "1", user: "admin@dashboard.com", action: "USER_LOGIN", target: "System", timestamp: new Date().toISOString(), status: "SUCCESS" },
    { id: "2", user: "admin@dashboard.com", action: "PRODUCT_UPDATE", target: "MacBook Pro 14", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), status: "SUCCESS" },
    { id: "3", user: "manager@dashboard.com", action: "USER_CREATE", target: "New Hire John", timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), status: "SUCCESS" },
    { id: "4", user: "admin@dashboard.com", action: "SECURITY_SETTINGS_CHANGE", target: "Firewall", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), status: "WARNING" },
    { id: "5", user: "viewer@dashboard.com", action: "EXPORT_CSV", target: "Revenue Report", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), status: "SUCCESS" },
    { id: "6", user: "unknown_ip", action: "FAILED_LOGIN", target: "admin@dashboard.com", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: "FAILURE" },
]

export default function ActivityLogsPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Activity Logs</h2>
                    <p className="text-muted-foreground">Detailed history of all administrative actions and system events.</p>
                </div>

                <DataTable columns={columns} data={mockLogs} filterColumn="action" filterPlaceholder="Search by action..." />
            </div>
        </DashboardLayout>
    )
}
