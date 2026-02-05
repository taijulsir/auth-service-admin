"use client"

import { useState } from "react"
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
import { useAxiosPrivate } from "@/hooks/use-axios-private"
import { authService } from "@/lib/api/services/auth.service"
import { Shield, Loader2 } from "lucide-react"

export default function SettingsPage() {
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    
    const [is2FALoading, setIs2FALoading] = useState(false)
    const [show2FASetup, setShow2FASetup] = useState(false)
    const [qrCode, setQrCode] = useState("")
    const [mfaSecret, setMfaSecret] = useState("")
    const [verificationCode, setVerificationCode] = useState("")

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Profile updated successfully!")
    }

    const handleSaveAccount = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Account settings updated!")
    }

    const handle2FASetup = async () => {
        setIs2FALoading(true)
        try {
            const data = await authService.generate2FA(axiosPrivate)
            setQrCode(data.qrCodeUrl)
            setMfaSecret(data.secret)
            setShow2FASetup(true)
        } catch (error) {
            toast.error("Failed to initiate 2FA setup")
        } finally {
            setIs2FALoading(false)
        }
    }

    const verifyAndEnable2FA = async () => {
        if (!verificationCode) return
        setIs2FALoading(true)
        try {
            await authService.verify2FASetup(axiosPrivate, verificationCode)
            toast.success("Two-Factor Authentication enabled!")
            setShow2FASetup(false)
            // Ideally refresh user state here
        } catch (error) {
            toast.error("Invalid verification code")
        } finally {
            setIs2FALoading(false)
        }
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-10">
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
                            value="security"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-10 px-0"
                        >
                            Security
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
                                        <AvatarImage src={user?.avatar} />
                                        <AvatarFallback>{user?.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline">Change Avatar</Button>
                                </div>
                                <form onSubmit={handleSaveProfile} className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" disabled value={user?.email || ""} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="role">Current Role</Label>
                                            <Input id="role" disabled value={JSON.stringify(user?.roles)} />
                                        </div>
                                    </div>
                                    <Button type="submit" disabled className="w-fit">Save Changes</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="account" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password Management</CardTitle>
                                <CardDescription>Update your security credentials.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <form onSubmit={handleSaveAccount} className="grid gap-4">
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
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="pt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    Two-Factor Authentication (2FA)
                                </CardTitle>
                                <CardDescription>
                                    Add an extra layer of security to your account by requiring a verification code from your phone.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {!show2FASetup ? (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Authenticator App</p>
                                            <p className="text-sm text-muted-foreground">Required for secure admin access</p>
                                        </div>
                                        <Button 
                                            onClick={handle2FASetup} 
                                            disabled={is2FALoading || user?.is2FAEnabled}
                                        >
                                            {is2FALoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {user?.is2FAEnabled ? "Enabled" : "Setup 2FA"}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <div className="flex flex-col md:flex-row gap-6 items-center">
                                            <div className="bg-white p-2 rounded-lg border">
                                                <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <p className="text-sm font-medium">1. Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>
                                                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-dashed text-xs font-mono break-all">
                                                    Manual entry secret: {mfaSecret}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>2. Enter the 6-digit code from your app</Label>
                                                    <div className="flex gap-2">
                                                        <Input 
                                                            placeholder="000000" 
                                                            maxLength={6}
                                                            value={verificationCode}
                                                            onChange={(e) => setVerificationCode(e.target.value)}
                                                        />
                                                        <Button onClick={verifyAndEnable2FA} disabled={is2FALoading}>
                                                            Verify & Enable
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" onClick={() => setShow2FASetup(false)}>Cancel</Button>
                                    </div>
                                )}
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
                                        <Label>Security Alerts</Label>
                                        <span className="text-sm text-muted-foreground">Receive alerts for new logins and security changes.</span>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
