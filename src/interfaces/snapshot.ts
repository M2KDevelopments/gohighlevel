export interface ISnapshot {
    id: string;
    name: string;
    description?: string;
    type: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISnapshotListResponse {
    snapshots: ISnapshot[];
    total: number;
    traceId: string;
}

export interface ISnapshotListParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
}

export interface ISnapshotShareLink {
    link: string;
    expiresAt: string;
}

export interface ISnapshotShareLinkResponse {
    shareLink: ISnapshotShareLink;
    traceId: string;
}

export interface ISnapshotPush {
    id: string;
    snapshotId: string;
    status: string;
    pushedAt: string;
    completedAt?: string;
    error?: string;
}

export interface ISnapshotPushListResponse {
    pushes: ISnapshotPush[];
    total: number;
    traceId: string;
}

export interface ISnapshotPushParams {
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    page?: number;
    limit?: number;
}

export interface ILastSnapshotPushResponse {
    push: ISnapshotPush;
    traceId: string;
} 