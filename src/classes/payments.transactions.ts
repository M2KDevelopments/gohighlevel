import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IPaymentTransactionResponse, 
    IPaymentTransactionListResponse,
    IPaymentTransactionParams 
} from "../interfaces/payment.transaction";

export class PaymentTransactions {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get Transaction by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a3b6a89c5d8f9-get-transaction-by-id
     * @param transactionId 
     * @returns 
     */
    async get(transactionId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/payments/transactions/${transactionId}`, { headers });
        return response.data as IPaymentTransactionResponse;
    }

    /**
     * List Transactions
     * Documentation - https://highlevel.stoplight.io/docs/integrations/b8c9d2f5e3a10-list-transactions
     * @param params 
     * @returns 
     */
    async getAll(params?: IPaymentTransactionParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Optional parameters
        if (params?.orderId) queryParams.append("orderId", params.orderId);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.order) queryParams.append("order", params.order);

        const url = `${this.authData?.baseurl}/payments/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await axios.get(url, { headers });
        return response.data as IPaymentTransactionListResponse;
    }
} 