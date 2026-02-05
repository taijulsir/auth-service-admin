"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Role, PermissionResource, PermissionAction } from "@/types/role"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Save, Loader2 } from "lucide-react"
import { useAxiosPrivate } from "@/hooks/use-axios-private"
import { roleService } from "@/lib/api/services/role.service"
import { toast } from "sonner"

const resources: PermissionResource[] = ["USERS", "ROLES", "PRODUCTS", "ORDERS", "ANALYTICS", "SETTINGS"]
const actions: PermissionAction[] = ["READ", "CREATE", "EDIT", "DELETE", "MANAGE"]

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([])
    const [activeRole, setActiveRole] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await roleService.getRoles()
                const rolesData = response.roles || response
                setRoles(rolesData)
                if (rolesData.length > 0) {
                    setActiveRole(rolesData[0].id)
                }
            } catch (error) {
                console.error("Failed to fetch roles:", error)
                toast.error("Failed to load roles")
            } finally {
                setIsLoading(false)
            }
        }

        fetchRoles()
    }, [axiosPrivate])

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[400px] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        )
    }

    if (roles.length === 0) {
        return (
            <DashboardLayout>
                <div className="flex h-[400px] items-center justify-center">
                    <p>No roles found.</p>
                </div>
            </DashboardLayout>
        )
    }

    const currentRole = roles.find(r => r.id === activeRole) || roles[0]

    const hasPermission = (resource: PermissionResource, action: PermissionAction) => {
        const perm = currentRole.permissions.find(p => p.resource === resource)
        if (!perm) return false
        return perm.actions.includes("MANAGE") || perm.actions.includes(action)
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Roles & Permissions</h2>
                        <p className="text-muted-foreground">Define and assign permissions to system roles.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Role
                        </Button>
                        <Button>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </div>

                <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-md">
                        {roles.map(role => (
                            <TabsTrigger key={role.id} value={role.id}>{role.name}</TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{currentRole.name} Permissions</CardTitle>
                                <CardDescription>{currentRole.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">Resource</TableHead>
                                            {actions.map(action => (
                                                <TableHead key={action} className="text-center">{action}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {resources.map(resource => (
                                            <TableRow key={resource}>
                                                <TableCell className="font-medium">{resource}</TableCell>
                                                {actions.map(action => (
                                                    <TableCell key={action} className="text-center">
                                                        <Checkbox
                                                            checked={hasPermission(resource, action)}
                                                            disabled={currentRole.id === "admin"} // Admin is always full access in this mock
                                                        />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
