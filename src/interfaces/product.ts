export interface IProduct {
    id: string;
    name: string;
    description?: string;
    type: string;
    active: boolean;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateProduct {
    name: string;
    description?: string;
    type: string;
    active?: boolean;
    metadata?: Record<string, any>;
}

export interface IUpdateProduct {
    name?: string;
    description?: string;
    type?: string;
    active?: boolean;
    metadata?: Record<string, any>;
}

export interface IProductResponse {
    product: IProduct;
    traceId: string;
}

export interface IProductListResponse {
    products: IProduct[];
    total: number;
    traceId: string;
}

export interface IProductListParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
    active?: boolean;
} 