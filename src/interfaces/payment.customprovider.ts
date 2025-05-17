export interface IPaymentCustomProvider {
    id: string,
    name: string,
    type: string,
    config: Record<string, any>,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}

export interface ICreatePaymentCustomProvider {
    name: string,
    type: string,
    config: Record<string, any>
}

export interface IPaymentCustomProviderResponse {
    provider: IPaymentCustomProvider,
    traceId: string
}

export interface IPaymentCustomProviderConfig {
    id: string,
    providerId: string,
    config: Record<string, any>,
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}

export interface ICreatePaymentCustomProviderConfig {
    providerId: string,
    config: Record<string, any>
}

export interface IPaymentCustomProviderConfigResponse {
    config: IPaymentCustomProviderConfig,
    traceId: string
} 