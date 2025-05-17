export interface IPaymentIntegrationProvider {
    id: string,
    name: string,
    description: string,
    type: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}

export interface ICreatePaymentIntegrationProvider {
    name: string,
    description: string,
    type: string
}

export interface IPaymentIntegrationResponse {
    providers: IPaymentIntegrationProvider[],
    total: number,
    traceId: string
} 