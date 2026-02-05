"use client"

import { useEffect, useState } from "react"
import { Bell, Check, Info, AlertTriangle, XCircle, CheckCircle2, Loader2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notificationService } from "@/lib/api/services/notification.service"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"

export function NotificationCenter() {
    const [notifications, setNotifications] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth()

    const unreadCount = notifications.filter(n => !n.isReadBy.includes(user?.id)).length

    useEffect(() => {
        if (user) {
            fetchNotifications()
        }
    }, [user])

    const fetchNotifications = async () => {
        try {
            const data = await notificationService.getNotifications()
            setNotifications(data)
        } catch (error) {
            console.error("Failed to fetch notifications", error)
        }
    }

    const handleMarkAsRead = async (id: string) => {
        try {
            await notificationService.markAsRead(id)
            setNotifications(prev => 
                prev.map(n => n._id === id ? { ...n, isReadBy: [...n.isReadBy, user?.id] } : n)
            )
        } catch (error) {
            toast.error("Failed to mark notification as read")
        }
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="h-4 w-4 text-green-500" />
            case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
            case 'error': return <XCircle className="h-4 w-4 text-red-500" />
            default: return <Info className="h-4 w-4 text-blue-500" />
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge 
                            variant="destructive" 
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                        <span className="text-xs font-normal text-muted-foreground">{unreadCount} unread</span>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No notifications yet
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <DropdownMenuItem 
                                key={n._id} 
                                className={`flex flex-col items-start gap-1 p-3 focus:bg-accent cursor-pointer ${!n.isReadBy.includes(user?.id) ? 'bg-primary/5' : ''}`}
                                onClick={() => !n.isReadBy.includes(user?.id) && handleMarkAsRead(n._id)}
                            >
                                <div className="flex w-full items-center gap-2">
                                    {getIcon(n.type)}
                                    <span className="font-semibold text-sm flex-1">{n.title}</span>
                                    {!n.isReadBy.includes(user?.id) && (
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {n.message}
                                </p>
                                <span className="text-[10px] text-muted-foreground mt-1">
                                    {new Date(n.createdAt).toLocaleString()}
                                </span>
                            </DropdownMenuItem>
                        ))
                    )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full text-center justify-center text-xs text-primary cursor-pointer">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
