import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IPaymentSubscriptionResponse, 
    IPaymentSubscriptionListResponse,
    IPaymentSubscriptionParams 
} from "../interfaces/payment.subscription";

export class PaymentSubscriptions {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get Subscription by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/d4e7f3b9c2a10-get-subscription-by-id
     * @param subscriptionId 
     * @returns 
     */
    async get(subscriptionId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/payments/subscriptions/${subscriptionId}`, { headers });
        return response.data as IPaymentSubscriptionResponse;
    }

    /**
     * List Subscriptions
     * Documentation - https://highlevel.stoplight.io/docs/integrations/f5c8e2d1a4b92-list-subscriptions
     * @param params 
     * @returns 
     */
    async getAll(params?: IPaymentSubscriptionParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Optional parameters
        if (params?.contactId) queryParams.append("contactId", params.contactId);
        if (params?.status) queryParams.append("status", params.status);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.order) queryParams.append("order", params.order);

        const url = `${this.authData?.baseurl}/payments/subscriptions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await axios.get(url, { headers });
        return response.data as IPaymentSubscriptionListResponse;
    }

    /**
     * Cancel Subscription
     * Documentation - https://highlevel.stoplight.io/docs/integrations/e6d9f2c8b3a71-cancel-subscription
     * @param subscriptionId 
     * @returns 
     */
    async cancel(subscriptionId: string) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/payments/subscriptions/${subscriptionId}/cancel`, {}, { headers });
        return response.data as IPaymentSubscriptionResponse;
    }
} 