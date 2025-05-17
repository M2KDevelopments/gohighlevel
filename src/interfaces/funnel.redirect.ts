export interface IFunnelRedirect {
    id: string,
    locationId: string,
    funnelId: string,
    pageId: string,
    name: string,
    url: string,
    destinationUrl: string,
    createdAt: string,
    updatedAt: string
}

export interface IFunnelRedirectListResponse {
    redirects: IFunnelRedirect[],
    total: number,
    traceId: string
}

export interface ICreateFunnelRedirect {
    locationId: string,
    funnelId: string,
    pageId: string,
    name: string,
    url: string,
    destinationUrl: string
}

export interface IUpdateFunnelRedirect {
    name?: string,
    url?: string,
    destinationUrl?: string
}

export interface IFunnelRedirectParams {
    locationId: string,
    funnelId: string,
    pageId: string,
    page?: number,
    limit?: number
} 