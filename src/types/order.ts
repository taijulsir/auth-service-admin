export type OrderStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"
export type PaymentStatus = "PAID" | "UNPAID" | "REFUNDED"

export interface Order {
    id: string
    customer: {
        name: string
        email: string
    }
    total: number
    status: OrderStatus
    paymentStatus: PaymentStatus
    createdAt: string
    items: number
}
