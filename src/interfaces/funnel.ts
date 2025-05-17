export interface IFunnel {
    id: string,
    name: string,
    description?: string,
    locationId: string,
    createdAt: string,
    updatedAt: string
}

export interface IFunnelPage {
    id: string,
    funnelId: string,
    name: string,
    url: string,
    type: string,
    createdAt: string,
    updatedAt: string
}

export interface IFunnelListResponse {
    funnels: IFunnel[],
    total: number,
    traceId: string
}

export interface IFunnelPagesResponse {
    pages: IFunnelPage[],
    total: number,
    traceId: string
}

export interface IFunnelPagesCountResponse {
    count: number,
    traceId: string
}

export interface IFunnelParams {
    locationId: string,
    page?: number,
    limit?: number,
    search?: string
} 