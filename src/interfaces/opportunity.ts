export interface IOpportunity {
    id: string,
    locationId: string,
    name: string,
    pipelineId: string,
    stageId: string,
    status: "open" | "won" | "lost" | "abandoned",
    monetaryValue: number,
    contactId: string,
    userId: string,
    tags: string[],
    source: string,
    dateAdded: string,
    dateModified: string,
    dateWon?: string,
    dateLost?: string,
    followers: string[],
    customFields?: Record<string, any>
}

export interface IOpportunityResponse {
    opportunity: IOpportunity,
    traceId: string
}

export interface ICreateOpportunity {
    locationId: string,
    name: string,
    pipelineId: string,
    stageId: string,
    monetaryValue?: number,
    contactId?: string,
    userId?: string,
    tags?: string[],
    source?: string,
    customFields?: Record<string, any>
}

export interface IUpdateOpportunity {
    name?: string,
    pipelineId?: string,
    stageId?: string,
    monetaryValue?: number,
    contactId?: string,
    userId?: string,
    tags?: string[],
    source?: string,
    customFields?: Record<string, any>
}

export interface IUpdateOpportunityStatus {
    status: "open" | "won" | "lost" | "abandoned"
}

export interface IUpsertOpportunity extends ICreateOpportunity {
    id?: string
}

export interface IOpportunitySearchParams {
    locationId: string,
    pipelineId?: string,
    stageId?: string,
    status?: "open" | "won" | "lost" | "abandoned",
    userId?: string,
    contactId?: string,
    page?: number,
    limit?: number,
    sort?: string,
    order?: "asc" | "desc"
}

export interface IOpportunitySearchResponse {
    opportunities: IOpportunity[],
    total: number,
    traceId: string
} 