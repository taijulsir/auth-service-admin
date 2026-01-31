import DashboardLayout from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/orders/columns"
import { Order } from "@/types/order"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

const mockOrders: Order[] = [
    {
        id: "ORD-1234",
        customer: { name: "Alice Johnson", email: "alice@example.com" },
        total: 249.99,
        status: "COMPLETED",
        paymentStatus: "PAID",
        createdAt: "2024-01-20T11:45:00Z",
        items: 3,
    },
    {
        id: "ORD-1235",
        customer: { name: "Bob Wilson", email: "bob@example.com" },
        total: 1299.00,
        status: "PROCESSING",
        paymentStatus: "PAID",
        createdAt: "2024-01-22T16:20:00Z",
        items: 1,
    },
    {
        id: "ORD-1236",
        customer: { name: "Charlie Brown", email: "charlie@example.com" },
        total: 89.00,
        status: "PENDING",
        paymentStatus: "UNPAID",
        createdAt: "2024-01-25T08:00:00Z",
        items: 2,
    },
    {
        id: "ORD-1237",
        customer: { name: "David Miller", email: "david@example.com" },
        total: 549.00,
        status: "CANCELLED",
        paymentStatus: "UNPAID",
        createdAt: "2024-01-26T10:30:00Z",
        items: 4,
    },
    {
        id: "ORD-1238",
        customer: { name: "Eve Online", email: "eve@example.com" },
        total: 99.00,
        status: "COMPLETED",
        paymentStatus: "PAID",
        createdAt: "2024-01-27T14:15:00Z",
        items: 1,
    },
]

export default function OrdersPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                        <p className="text-muted-foreground">Monitor and manage customer transactions.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            More Filters
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={mockOrders}
                    filterColumn="id"
                    filterPlaceholder="Search by Order ID..."
                />
            </div>
        </DashboardLayout>
    )
}
