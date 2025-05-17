export interface IOpportunityPipelineStage {
    id: string,
    name: string,
    order: number,
    probability: number
}

export interface IOpportunityPipeline {
    id: string,
    name: string,
    locationId: string,
    isDefault: boolean,
    stages: IOpportunityPipelineStage[]
}

export interface IOpportunityPipelineResponse {
    pipelines: IOpportunityPipeline[],
    traceId: string
} 