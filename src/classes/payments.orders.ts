import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IPaymentOrderResponse, 
    IPaymentOrderListResponse,
    IPaymentOrderParams 
} from "../interfaces/payment.order";

export class PaymentOrders {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get Order by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/bcdf47fc22520-get-order-by-id
     * @param orderId 
     * @returns 
     */
    async get(orderId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/payments/orders/${orderId}`, { headers });
        return response.data as IPaymentOrderResponse;
    }

    /**
     * List Orders
     * Documentation - https://highlevel.stoplight.io/docs/integrations/378562f514a17-list-orders
     * @param params 
     * @returns 
     */
    async getAll(params: IPaymentOrderParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Required parameter
        queryParams.append("locationId", params.locationId);

        // Optional parameters
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.sort) queryParams.append("sort", params.sort);
        if (params.order) queryParams.append("order", params.order);

        const response = await axios.get(`${this.authData?.baseurl}/payments/orders?${queryParams.toString()}`, { headers });
        return response.data as IPaymentOrderListResponse;
    }
} 