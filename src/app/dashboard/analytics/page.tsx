"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Download, TrendingUp } from "lucide-react"
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
    ArcElement,
} from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Revenue',
            data: [3500, 4200, 3800, 5100, 4800, 6200, 5900],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }
    ],
}

const barData = {
    labels: ['Computers', 'Smartphones', 'Tablets', 'Watches', 'Accessories'],
    datasets: [
        {
            label: 'Sales by Category',
            data: [120, 190, 80, 150, 210],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
    ],
}

const pieData = {
    labels: ['New', 'Returning', 'Referral'],
    datasets: [
        {
            label: 'Traffic Source',
            data: [45, 35, 20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
            ],
        },
    ],
}

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
                        <p className="text-muted-foreground">Deep dive into your business performance and data insights.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Last 30 Days
                        </Button>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Over Time</CardTitle>
                            <CardDescription>Monthly revenue trends for the current year.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center">
                            <Line options={{ responsive: true, maintainAspectRatio: false }} data={lineData} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Sales by Category</CardTitle>
                            <CardDescription>Visual breakdown of product category performance.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center">
                            <Bar options={{ responsive: true, maintainAspectRatio: false }} data={barData} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Visitor Demographics</CardTitle>
                            <CardDescription>Distribution of user types visiting the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center gap-8 justify-center">
                            <div className="w-1/2 h-full">
                                <Pie options={{ responsive: true, maintainAspectRatio: false }} data={pieData} />
                            </div>
                            <div className="w-1/2 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">New Sessions</span>
                                    <Badge>45%</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Returning</span>
                                    <Badge variant="secondary">35%</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Referrals</span>
                                    <Badge variant="outline">20%</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>AI Insights</CardTitle>
                            <CardDescription>Automated performance summaries. (BETA)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                                    <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                                        <TrendingUp className="h-4 w-4" />
                                        <span>Growth Opportunity</span>
                                    </div>
                                    <p className="text-sm leading-relaxed">
                                        Accessories sales have increased by 15% this week. Consider stocking more Logitech MX Master 3S mice to meet the rising demand.
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100 dark:bg-yellow-900/10 dark:border-yellow-900/20">
                                    <div className="flex items-center gap-2 mb-2 text-yellow-700 dark:text-yellow-400 font-bold">
                                        <Activity className="h-4 w-4" />
                                        <span>Inventory Alert</span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-yellow-800 dark:text-yellow-500">
                                        Smartphones stock is reaching a critical low point (less than 10 units left). A restock order is recommended within 48 hours.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"
