export interface IPaymentCoupon {
    id: string,
    code: string,
    type: "percentage" | "fixed",
    value: number,
    maxUses?: number,
    usedCount: number,
    expiresAt?: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}

export interface ICreatePaymentCoupon {
    code: string,
    type: "percentage" | "fixed",
    value: number,
    maxUses?: number,
    expiresAt?: string
}

export interface IUpdatePaymentCoupon {
    code?: string,
    type?: "percentage" | "fixed",
    value?: number,
    maxUses?: number,
    expiresAt?: string,
    isActive?: boolean
}

export interface IPaymentCouponResponse {
    coupon: IPaymentCoupon,
    traceId: string
}

export interface IPaymentCouponListResponse {
    coupons: IPaymentCoupon[],
    total: number,
    traceId: string
}

export interface IPaymentCouponParams {
    page?: number,
    limit?: number,
    sort?: string,
    order?: "asc" | "desc",
    isActive?: boolean
} 