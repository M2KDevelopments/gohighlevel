export interface IPaymentOrder {
    id: string,
    locationId: string,
    contactId: string,
    status: string,
    total: number,
    subtotal: number,
    tax: number,
    currency: string,
    items: Array<{
        id: string,
        name: string,
        quantity: number,
        price: number,
        total: number
    }>,
    createdAt: string,
    updatedAt: string
}

export interface IPaymentOrderResponse {
    order: IPaymentOrder,
    traceId: string
}

export interface IPaymentOrderListResponse {
    orders: IPaymentOrder[],
    total: number,
    traceId: string
}

export interface IPaymentOrderParams {
    locationId: string,
    page?: number,
    limit?: number,
    sort?: string,
    order?: "asc" | "desc"
} 