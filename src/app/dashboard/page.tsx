"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Users,
    Activity,
    Loader2
} from "lucide-react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useAxiosPrivate } from "@/hooks/use-axios-private"
import { analyticsService } from "@/lib/api/services/analytics.service"
import { auditService } from "@/lib/api/services/audit.service"
import { toast } from "sonner"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null)
    const [recentLogs, setRecentLogs] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsData, logsData] = await Promise.all([
                    analyticsService.getStats(),
                    auditService.getLogs({ limit: 5 })
                ])
                setStats(statsData)
                setRecentLogs(logsData.logs || [])
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error)
                toast.error("Failed to load dashboard data")
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [axiosPrivate])

    const overviewData = stats ? {
        labels: stats.loginActivity.map((d: any) => d._id),
        datasets: [
            {
                fill: true,
                label: 'Logins',
                data: stats.loginActivity.map((d: any) => d.count),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
            }
        ],
    } : null

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[80vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                    <p className="text-muted-foreground">Monitor your business performance at a glance.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.activeUsers || 0}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login Activity</CardTitle>
                            <CardDescription>User logins over the last 7 days.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            {overviewData && <Line 
                                data={overviewData} 
                                options={{ 
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: { y: { beginAtZero: true } }
                                }} 
                            />}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest system and user events.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentLogs.length > 0 ? (
                                    recentLogs.map((log) => (
                                        <div key={log._id} className="flex items-center gap-4">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs">
                                                {log.userId?.email?.substring(0, 2).toUpperCase() || '??'}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    <span className="font-bold">{log.userId?.email}</span> {log.action.toLowerCase().replace('_', ' ')}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(log.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No recent activity found.</p>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <Button variant="link" asChild className="p-0">
                                    <Link href="/dashboard/activity">View all activity</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
