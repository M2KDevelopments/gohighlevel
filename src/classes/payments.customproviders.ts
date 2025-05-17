import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IPaymentCustomProviderResponse,
    ICreatePaymentCustomProvider,
    IPaymentCustomProviderConfigResponse,
    ICreatePaymentCustomProviderConfig
} from "../interfaces/payment.customprovider";

export class PaymentCustomProviders {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Create Custom Provider
     * Documentation - https://highlevel.stoplight.io/docs/integrations/e5d4c3b2a1f90-create-custom-provider
     * @param data 
     * @returns 
     */
    async create(data: ICreatePaymentCustomProvider) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/payments/custom-providers`, data, { headers });
        return response.data as IPaymentCustomProviderResponse;
    }

    /**
     * Get Custom Provider by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/c4b3a2d1e0f89-get-custom-provider-by-id
     * @param providerId 
     * @returns 
     */
    async get(providerId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/payments/custom-providers/${providerId}`, { headers });
        return response.data as IPaymentCustomProviderResponse;
    }

    /**
     * Create Custom Provider Config
     * Documentation - https://highlevel.stoplight.io/docs/integrations/b3a2c1d0e9f78-create-custom-provider-config
     * @param data 
     * @returns 
     */
    async createConfig(data: ICreatePaymentCustomProviderConfig) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/payments/custom-providers/${data.providerId}/config`, data, { headers });
        return response.data as IPaymentCustomProviderConfigResponse;
    }

    /**
     * Get Custom Provider Config
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a2b1c0d9e8f67-get-custom-provider-config
     * @param providerId 
     * @returns 
     */
    async getConfig(providerId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/payments/custom-providers/${providerId}/config`, { headers });
        return response.data as IPaymentCustomProviderConfigResponse;
    }
} 