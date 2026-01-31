"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    DollarSign,
    CreditCard,
    Activity,
    ArrowUpRight,
    AlertCircle
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
import { Line, Bar } from 'react-chartjs-2'

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

const overviewData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            fill: true,
            label: 'Revenue',
            data: [1500, 2300, 2200, 3100, 2800, 3900, 3600, 4800, 4500, 5200, 5800, 6500],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
        }
    ],
}

const barData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
        {
            label: 'Active Sessions',
            data: [2500, 4200, 1200],
            backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
            ],
        },
    ],
}

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                        <p className="text-muted-foreground">Monitor your business performance at a glance.</p>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 text-yellow-800 dark:text-yellow-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>3 product items are low in stock.</span>
                        <Button variant="link" className="h-auto p-0 text-yellow-800 dark:text-yellow-500 font-bold ml-1">View Details</Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <div className="flex items-center text-xs text-green-600 mt-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                <span>+20.1% from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2,350</div>
                            <div className="flex items-center text-xs text-green-600 mt-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                <span>+180.1% from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <div className="flex items-center text-xs text-green-600 mt-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                <span>+12% from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Platform Status</CardTitle>
                            <Activity className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">99.99%</div>
                            <p className="text-xs text-muted-foreground mt-1">Operational across regions</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-full lg:col-span-4 shadow-sm">
                        <CardHeader>
                            <CardTitle>Revenue Insights</CardTitle>
                            <CardDescription>Visualizing revenue growth for the past 12 months.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <Line
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: { display: false }
                                    },
                                    scales: {
                                        y: { grid: { display: false } },
                                        x: { grid: { display: false } }
                                    }
                                }}
                                data={overviewData}
                            />
                        </CardContent>
                    </Card>

                    <Card className="col-span-full lg:col-span-3 shadow-sm">
                        <CardHeader>
                            <CardTitle>Session Distribution</CardTitle>
                            <CardDescription>Platform usage by device type.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <Bar
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: { display: false }
                                    }
                                }}
                                data={barData}
                            />
                        </CardContent>
                    </Card>
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Historical log of system events and user actions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { user: "JD", name: "John Doe", action: "created a new account", time: "2 minutes ago" },
                                { user: "AS", name: "Admin", action: "modified system security settings", time: "15 minutes ago" },
                                { user: "MK", name: "Michael Knight", action: "purchased MacBook Pro 14", time: "1 hour ago" },
                                { user: "SB", name: "Sarah Brown", action: "reset their account password", time: "3 hours ago" },
                                { user: "RP", name: "Riley Page", action: "updated product price: Dell XPS 13", time: "5 hours ago" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                                        {item.user}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            <span className="text-primary font-bold">{item.name}</span> {item.action}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{item.time}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-xs">View</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <div className="p-4 pt-0 border-t mt-4 flex justify-center">
                        <Button variant="link" asChild><Link href="/dashboard/activity">View all activity</Link></Button>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}

import { Button } from "@/components/ui/button"
import Link from "next/link"
