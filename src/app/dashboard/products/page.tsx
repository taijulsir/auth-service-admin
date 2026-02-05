"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/products/columns"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download, Loader2 } from "lucide-react"
import { useAxiosPrivate } from "@/hooks/use-axios-private"
import { productService } from "@/lib/api/services/product.service"
import { toast } from "sonner"

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productService.getProducts()
                setProducts(response.products || response)
            } catch (error) {
                console.error("Failed to fetch products:", error)
                toast.error("Failed to load products")
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [axiosPrivate])

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

                {isLoading ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={products}
                        filterColumn="name"
                        filterPlaceholder="Filter products..."
                        topActions={
                            <Button variant="outline" size="sm" className="h-8">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Bulk Delete
                            </Button>
                        }
                    />
                )}
            </div>
        </DashboardLayout>
    )
}
