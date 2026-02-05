"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingBag,
    BarChart3,
    ShieldCheck,
    Package,
    History,
    Bell,
    Menu,
    ChevronLeft
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "User Management",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Roles & Permissions",
        href: "/dashboard/roles",
        icon: ShieldCheck,
    },
    {
        title: "Products",
        href: "/dashboard/products",
        icon: Package,
    },
    {
        title: "Orders",
        href: "/dashboard/orders",
        icon: ShoppingBag,
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
    },
    {
        title: "Activity Logs",
        href: "/dashboard/activity",
        icon: History,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

export function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <aside
            className={cn(
                "relative flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
                collapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex h-16 items-center justify-between px-4 py-4">
                {!collapsed && (
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="h-8 w-8 rounded-lg bg-primary" />
                        <span>AdminUI</span>
                    </Link>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className={cn("h-8 w-8", collapsed && "mx-auto")}
                >
                    {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                                    collapsed && "justify-center px-2"
                                )}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {!collapsed && <span>{item.title}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="p-4 border-t">
                {/* Footer or User Info could go here if collapsed is false */}
            </div>
        </aside>
    )
}
