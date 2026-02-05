"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { useAxiosPrivate } from "@/hooks/use-axios-private"
import { auditService } from "@/lib/api/services/audit.service"
import { toast } from "sonner"

interface ActivityLog {
    _id: string
    userId: {
        _id: string
        email: string
    }
    action: string
    resource: string
    status: "success" | "failure"
    ipAddress: string
    userAgent: string
    createdAt: string
}

const columns: ColumnDef<ActivityLog>[] = [
    {
        accessorKey: "createdAt",
        header: "Time",
        cell: ({ row }) => <div className="text-xs text-muted-foreground">{new Date(row.getValue("createdAt")).toLocaleString()}</div>
    },
    {
        accessorKey: "userId.email",
        header: "User",
        cell: ({ row }) => <div className="font-medium">{(row.original.userId as any)?.email || 'Unknown'}</div>
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => <Badge variant="outline">{row.getValue("action")}</Badge>
    },
    {
        accessorKey: "resource",
        header: "Resource",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant={status === "success" ? "default" : "destructive"}>
                    {status.toUpperCase()}
                </Badge>
            )
        }
    },
    {
        accessorKey: "ipAddress",
        header: "IP Address",
        cell: ({ row }) => <div className="text-xs font-mono">{row.getValue("ipAddress")}</div>
    }
]

export default function ActivityLogsPage() {
    const [logs, setLogs] = useState<ActivityLog[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await auditService.getLogs()
                setLogs(response.logs || [])
            } catch (error) {
                console.error("Failed to fetch audit logs:", error)
                toast.error("Failed to load activity logs")
            } finally {
                setIsLoading(false)
            }
        }

        fetchLogs()
    }, [axiosPrivate])

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Activity Logs</h2>
                    <p className="text-muted-foreground">Detailed history of all administrative actions and system events.</p>
                </div>

                {isLoading ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <DataTable 
                        columns={columns} 
                        data={logs} 
                        filterColumn="action" 
                        filterPlaceholder="Search by action..." 
                    />
                )}
            </div>
        </DashboardLayout>
    )
}
