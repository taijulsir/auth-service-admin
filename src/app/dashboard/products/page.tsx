import DashboardLayout from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/products/columns"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download } from "lucide-react"

const mockProducts: Product[] = [
    {
        id: "p1",
        name: "MacBook Pro 14",
        category: "Electronics",
        price: 1999.00,
        stock: 25,
        status: "IN_STOCK",
        updatedAt: "2024-01-25T10:00:00Z",
    },
    {
        id: "p2",
        name: "Dell XPS 13",
        category: "Electronics",
        price: 1299.00,
        stock: 5,
        status: "LOW_STOCK",
        updatedAt: "2024-01-26T12:00:00Z",
    },
    {
        id: "p3",
        name: "Sony WH-1000XM5",
        category: "Accessories",
        price: 349.99,
        stock: 0,
        status: "OUT_OF_STOCK",
        updatedAt: "2024-01-27T15:00:00Z",
    },
    {
        id: "p4",
        name: "Logitech MX Master 3S",
        category: "Accessories",
        price: 99.00,
        stock: 50,
        status: "IN_STOCK",
        updatedAt: "2024-01-28T09:30:00Z",
    },
    {
        id: "p5",
        name: "Keychron K2 V2",
        category: "Accessories",
        price: 89.00,
        stock: 12,
        status: "IN_STOCK",
        updatedAt: "2024-01-29T14:15:00Z",
    },
]

export default function ProductsPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                        <p className="text-muted-foreground">Manage your inventory and product listings.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={mockProducts}
                    filterColumn="name"
                    filterPlaceholder="Filter products..."
                    topActions={
                        <Button variant="outline" size="sm" className="h-8">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Bulk Delete
                        </Button>
                    }
                />
            </div>
        </DashboardLayout>
    )
}
