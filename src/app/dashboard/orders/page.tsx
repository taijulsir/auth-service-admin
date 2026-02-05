"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "@/components/orders/columns"
import { Order } from "@/types/order"
import { Button } from "@/components/ui/button"
import { Download, Filter, Loader2 } from "lucide-react"
import { useAxiosPrivate } from "@/hooks/use-axios-private"
import { orderService } from "@/lib/api/services/order.service"
import { toast } from "sonner"

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderService.getOrders()
                setOrders(response.orders || response)
            } catch (error) {
                console.error("Failed to fetch orders:", error)
                toast.error("Failed to load orders")
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrders()
    }, [axiosPrivate])

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

                {isLoading ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={orders}
                        filterColumn="id"
                        filterPlaceholder="Search by Order ID..."
                    />
                )}
            </div>
        </DashboardLayout>
    )
}
