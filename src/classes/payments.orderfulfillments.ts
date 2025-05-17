import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    ICreatePaymentOrderFulfillment,
    IPaymentOrderFulfillmentResponse,
    IPaymentOrderFulfillmentListResponse,
    IPaymentOrderFulfillmentParams
} from "../interfaces/payment.fulfillment";

export class PaymentOrderFulfillments {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Create Order Fulfillment
     * Documentation - https://highlevel.stoplight.io/docs/integrations/1e091099a92c6-create-order-fulfillment
     * @param data 
     * @returns 
     */
    async create(data: ICreatePaymentOrderFulfillment) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/payments/orders/${data.orderId}/fulfillments`, data, { headers });
        return response.data as IPaymentOrderFulfillmentResponse;
    }

    /**
     * List Fulfillments
     * Documentation - https://highlevel.stoplight.io/docs/integrations/670fe5beec7de-list-fulfillment
     * @param params 
     * @returns 
     */
    async getAll(params: IPaymentOrderFulfillmentParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Required parameter
        queryParams.append("orderId", params.orderId);

        // Optional parameters
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());

        const response = await axios.get(`${this.authData?.baseurl}/payments/orders/fulfillments?${queryParams.toString()}`, { headers });
        return response.data as IPaymentOrderFulfillmentListResponse;
    }
} 