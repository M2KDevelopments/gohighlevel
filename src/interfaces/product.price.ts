export interface IProductPrice {
    id: string;
    productId: string;
    currency: string;
    unitAmount: number;
    type: "one_time" | "recurring";
    recurring?: {
        interval: "day" | "week" | "month" | "year";
        intervalCount: number;
    };
    metadata?: Record<string, any>;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateProductPrice {
    currency: string;
    unitAmount: number;
    type: "one_time" | "recurring";
    recurring?: {
        interval: "day" | "week" | "month" | "year";
        intervalCount: number;
    };
    metadata?: Record<string, any>;
    active?: boolean;
}

export interface IUpdateProductPrice {
    currency?: string;
    unitAmount?: number;
    type?: "one_time" | "recurring";
    recurring?: {
        interval: "day" | "week" | "month" | "year";
        intervalCount: number;
    };
    metadata?: Record<string, any>;
    active?: boolean;
}

export interface IProductPriceResponse {
    price: IProductPrice;
    traceId: string;
}

export interface IProductPriceListResponse {
    prices: IProductPrice[];
    total: number;
    traceId: string;
}

export interface IProductPriceListParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
    active?: boolean;
} 