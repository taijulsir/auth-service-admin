export interface Product {
    id: string
    name: string
    category: string
    price: number
    stock: number
    status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK"
    updatedAt: string
}
