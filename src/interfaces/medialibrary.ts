export interface IMediaFile {
    id: string,
    name: string,
    type: string,
    url: string,
    thumbnailUrl: string,
    size: number,
    createdAt: string,
    updatedAt: string
}

export interface IMediaLibraryResponse {
    files: IMediaFile[],
    total: number,
    traceId: string
}

export interface IMediaLibraryParams {
    locationId: string,
    page?: number,
    limit?: number,
    sortBy?: "name" | "createdAt" | "updatedAt",
    order?: "asc" | "desc",
    search?: string,
    type?: string
} 