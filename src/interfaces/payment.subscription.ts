export interface IPaymentSubscription {
    id: string,
    contactId: string,
    status: string,
    amount: number,
    currency: string,
    interval: string,
    intervalCount: number,
    startDate: string,
    endDate?: string,
    canceledAt?: string,
    createdAt: string,
    updatedAt: string
}

export interface IPaymentSubscriptionResponse {
    subscription: IPaymentSubscription,
    traceId: string
}

export interface IPaymentSubscriptionListResponse {
    subscriptions: IPaymentSubscription[],
    total: number,
    traceId: string
}

export interface IPaymentSubscriptionParams {
    contactId?: string,
    status?: string,
    page?: number,
    limit?: number,
    sort?: string,
    order?: "asc" | "desc"
} 