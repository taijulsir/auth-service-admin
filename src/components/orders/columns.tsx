"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Order } from "@/types/order"
import Link from "next/link"

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Order ID",
        cell: ({ row }) => <div className="font-mono text-xs uppercase">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => {
            const customer = row.getValue("customer") as any
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{customer.name}</span>
                    <span className="text-xs text-muted-foreground">{customer.email}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "total",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="font-medium ml-4">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge
                    className={
                        status === "COMPLETED"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : status === "CANCELLED"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : status === "PROCESSING"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                >
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment",
        cell: ({ row }) => {
            const status = row.getValue("paymentStatus") as string
            return (
                <Badge variant={status === "PAID" ? "default" : status === "REFUNDED" ? "secondary" : "outline"}>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return <div>{date.toLocaleDateString()}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/orders/${order.id}`}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
