export interface IPaymentOrderFulfillment {
    id: string,
    orderId: string,
    status: string,
    items: Array<{
        id: string,
        quantity: number
    }>,
    createdAt: string,
    updatedAt: string
}

export interface ICreatePaymentOrderFulfillment {
    orderId: string,
    items: Array<{
        id: string,
        quantity: number
    }>
}

export interface IPaymentOrderFulfillmentResponse {
    fulfillment: IPaymentOrderFulfillment,
    traceId: string
}

export interface IPaymentOrderFulfillmentListResponse {
    fulfillments: IPaymentOrderFulfillment[],
    total: number,
    traceId: string
}

export interface IPaymentOrderFulfillmentParams {
    orderId: string,
    page?: number,
    limit?: number
} 