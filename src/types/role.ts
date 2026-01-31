export type PermissionAction = "READ" | "CREATE" | "EDIT" | "DELETE" | "MANAGE"
export type PermissionResource = "USERS" | "ROLES" | "PRODUCTS" | "ORDERS" | "ANALYTICS" | "SETTINGS"

export interface Permission {
    resource: PermissionResource
    actions: PermissionAction[]
}

export interface Role {
    id: string
    name: string
    description: string
    permissions: Permission[]
}
