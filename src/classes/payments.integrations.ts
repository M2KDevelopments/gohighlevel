import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IPaymentIntegrationProvider, 
    ICreatePaymentIntegrationProvider, 
    IPaymentIntegrationResponse 
} from "../interfaces/payment.integration";

export class PaymentIntegrations {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Create White Label Integration Provider
     * Documentation - https://highlevel.stoplight.io/docs/integrations/38fc7b49d107d-create-white-label-integration-provider
     * @param data 
     * @returns 
     */
    async create(data: ICreatePaymentIntegrationProvider) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/payments/integrations`, data, { headers });
        return response.data as IPaymentIntegrationProvider;
    }

    /**
     * List White Label Integration Providers
     * Documentation - https://highlevel.stoplight.io/docs/integrations/cbdced5c59dfd-list-white-label-integration-providers
     * @returns 
     */
    async getAll() {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/payments/integrations`, { headers });
        return response.data as IPaymentIntegrationResponse;
    }
} 