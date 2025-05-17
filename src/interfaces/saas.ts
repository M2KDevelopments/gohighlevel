export interface ISaaSLocation {
    id: string;
    name: string;
    companyId: string;
    stripeId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISaaSLocationResponse {
    locations: ISaaSLocation[];
    total: number;
    traceId: string;
}

export interface IUpdateSaaSSubscription {
    priceId: string;
    quantity?: number;
    metadata?: Record<string, any>;
}

export interface IEnableSaaS {
    priceId: string;
    quantity?: number;
    metadata?: Record<string, any>;
    trial?: {
        days: number;
    };
}

export interface IUpdateRebilling {
    nextBillingDate: string;
}

export interface ISaaSResponse {
    success: boolean;
    traceId: string;
    message?: string;
}

export interface IPauseLocation {
    resumeAt?: string; // ISO date string
    behavior?: "mark_uncollectible" | "keep_as_draft" | "void";
} 