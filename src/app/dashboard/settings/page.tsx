"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"

export default function SettingsPage() {
    const { user } = useAuth()

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Profile updated successfully!")
    }

    const handleSaveAccount = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Account settings updated!")
    }

    const handleSaveNotifications = () => {
        toast.success("Notification preferences saved!")
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto bg-transparent p-0 gap-6">
                        <TabsTrigger
                            value="profile"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-10 px-0"
                        >
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="account"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-10 px-0"
                        >
                            Account
                        </TabsTrigger>
                        <TabsTrigger
                            value="notifications"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-10 px-0"
                        >
                            Notifications
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                                <CardDescription>Update your personal information and public profile.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src="/avatars/01.png" />
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline">Change Avatar</Button>
                                </div>
                                <form onSubmit={handleSaveProfile} className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" defaultValue={user?.name || "Admin User"} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Username</Label>
                                            <Input id="username" defaultValue="admin_user" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" defaultValue={user?.email || "admin@example.com"} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input id="bio" placeholder="Tell us a little bit about yourself" />
                                    </div>
                                    <Button type="submit" className="w-fit">Save Changes</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="account" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account & Security</CardTitle>
                                <CardDescription>Manage your security settings and password.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <form onSubmit={handleSaveAccount} className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" />
                                    </div>
                                    <Button type="submit" className="w-fit">Update Password</Button>
                                </form>
                                <div className="pt-4 border-t border-red-100 dark:border-red-900/30">
                                    <h4 className="text-red-600 font-bold mb-2">Danger Zone</h4>
                                    <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                    <Button variant="destructive">Delete Account</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Configure how you receive system alerts and updates.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between space-x-4">
                                    <div className="flex flex-col space-y-1">
                                        <Label>Email Notifications</Label>
                                        <span className="text-sm text-muted-foreground">Receive daily reports and security alerts via email.</span>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between space-x-4">
                                    <div className="flex flex-col space-y-1">
                                        <Label>Push Notifications</Label>
                                        <span className="text-sm text-muted-foreground">Get real-time browser alerts for new orders.</span>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between space-x-4">
                                    <div className="flex flex-col space-y-1">
                                        <Label>Weekly Reports</Label>
                                        <span className="text-sm text-muted-foreground">Receive a weekly summary of your business performance.</span>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
