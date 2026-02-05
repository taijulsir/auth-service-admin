"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { notificationService } from "@/lib/api/services/notification.service"
import { Loader2, Send } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function NotificationsPage() {
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [type, setType] = useState("info")
    const [target, setTarget] = useState("all")

    const isAdmin = user?.roles?.includes(5150)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !message) {
            toast.error("Please fill in all fields")
            return
        }

        setIsLoading(true)
        try {
            await notificationService.createNotification({ title, message, type, target })
            toast.success("Notification sent to all users!")
            setTitle("")
            setMessage("")
        } catch (error) {
            toast.error("Failed to send notification")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 max-w-2xl mx-auto">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                    <p className="text-muted-foreground">
                        {isAdmin ? "Send system-wide broadcast messages to all users." : "View your latest system notifications."}
                    </p>
                </div>

                {isAdmin && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Send Global Broadcast</CardTitle>
                            <CardDescription>This message will be visible to all users in the system.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Subject</Label>
                                    <Input 
                                        id="title" 
                                        placeholder="System Maintenance, New Feature, etc." 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Message Type</Label>
                                    <Select value={type} onValueChange={setType}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="info">Information (Blue)</SelectItem>
                                            <SelectItem value="success">Success (Green)</SelectItem>
                                            <SelectItem value="warning">Warning (Yellow)</SelectItem>
                                            <SelectItem value="error">Error (Red)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message Content</Label>
                                    <Textarea 
                                        id="message" 
                                        placeholder="Write your broadcast message here..." 
                                        className="h-32"
                                        value={message}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                    Broadcast Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Notification History</CardTitle>
                        <CardDescription>Recent messages sent by administrators.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground text-center py-8">
                            Browse your notification center in the navigation bar to see full details.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
