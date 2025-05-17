import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    ICreateProductPrice,
    IUpdateProductPrice,
    IProductPriceResponse,
    IProductPriceListResponse,
    IProductPriceListParams
} from "../interfaces/product.price";

export class ProductPrices {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Create Price for a Product
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a47cd944aede9-create-price-for-a-product
     * @param productId 
     * @param data 
     * @returns 
     */
    async create(productId: string, data: ICreateProductPrice) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/products/${productId}/prices`, data, { headers });
        return response.data as IProductPriceResponse;
    }

    /**
     * Get Price by ID for a Product
     * Documentation - https://highlevel.stoplight.io/docs/integrations/f902955da364a-get-price-by-id-for-a-product
     * @param productId 
     * @param priceId 
     * @returns 
     */
    async get(productId: string, priceId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/products/${productId}/prices/${priceId}`, { headers });
        return response.data as IProductPriceResponse;
    }

    /**
     * Update Price by ID for a Product
     * Documentation - https://highlevel.stoplight.io/docs/integrations/7ffcf47b1687a-update-price-by-id-for-a-product
     * @param productId 
     * @param priceId 
     * @param data 
     * @returns 
     */
    async update(productId: string, priceId: string, data: IUpdateProductPrice) {
        const headers = this.authData?.headers;
        const response = await axios.patch(`${this.authData?.baseurl}/products/${productId}/prices/${priceId}`, data, { headers });
        return response.data as IProductPriceResponse;
    }

    /**
     * List Prices for a Product
     * Documentation - https://highlevel.stoplight.io/docs/integrations/4f8b3c58c2e81-list-prices-for-a-product
     * @param productId 
     * @param params 
     * @returns 
     */
    async getAll(productId: string, params?: IProductPriceListParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Optional parameters
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.order) queryParams.append("order", params.order);
        if (params?.active !== undefined) queryParams.append("active", params.active.toString());

        const url = `${this.authData?.baseurl}/products/${productId}/prices${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await axios.get(url, { headers });
        return response.data as IProductPriceListResponse;
    }

    /**
     * Delete Price by ID for a Product
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6025f28b731c1-delete-price-by-id-for-a-product
     * @param productId 
     * @param priceId 
     * @returns 
     */
    async delete(productId: string, priceId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/products/${productId}/prices/${priceId}`, { headers });
        return response.data as IProductPriceResponse;
    }
}
