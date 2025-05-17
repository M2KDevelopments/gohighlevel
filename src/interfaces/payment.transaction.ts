export interface IPaymentTransaction {
    id: string,
    orderId: string,
    amount: number,
    currency: string,
    status: string,
    type: string,
    provider: string,
    createdAt: string,
    updatedAt: string
}

export interface IPaymentTransactionResponse {
    transaction: IPaymentTransaction,
    traceId: string
}

export interface IPaymentTransactionListResponse {
    transactions: IPaymentTransaction[],
    total: number,
    traceId: string
}

export interface IPaymentTransactionParams {
    orderId?: string,
    page?: number,
    limit?: number,
    sort?: string,
    order?: "asc" | "desc"
} 