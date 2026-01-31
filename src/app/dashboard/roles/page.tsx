"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Role, PermissionResource, PermissionAction } from "@/types/role"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Save } from "lucide-react"

const resources: PermissionResource[] = ["USERS", "ROLES", "PRODUCTS", "ORDERS", "ANALYTICS", "SETTINGS"]
const actions: PermissionAction[] = ["READ", "CREATE", "EDIT", "DELETE", "MANAGE"]

const initialRoles: Role[] = [
    {
        id: "admin",
        name: "Admin",
        description: "Full access to all resources and settings.",
        permissions: resources.map(r => ({ resource: r, actions: ["MANAGE"] }))
    },
    {
        id: "manager",
        name: "Manager",
        description: "Can manage products and orders. Limited user management.",
        permissions: [
            { resource: "USERS", actions: ["READ", "EDIT"] },
            { resource: "PRODUCTS", actions: ["READ", "CREATE", "EDIT", "DELETE"] },
            { resource: "ORDERS", actions: ["READ", "EDIT"] },
            { resource: "ANALYTICS", actions: ["READ"] }
        ]
    },
    {
        id: "viewer",
        name: "Viewer",
        description: "Read-only access to most resources.",
        permissions: resources.map(r => ({ resource: r, actions: ["READ"] }))
    }
]

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>(initialRoles)
    const [activeRole, setActiveRole] = useState<string>(roles[0].id)

    const currentRole = roles.find(r => r.id === activeRole)!

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
