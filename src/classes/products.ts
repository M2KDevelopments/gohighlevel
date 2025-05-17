import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IProduct,
    ICreateProduct,
    IUpdateProduct,
    IProductResponse,
    IProductListResponse,
    IProductListParams
} from "../interfaces/product";
import { ProductPrices } from "./products.prices";

export class Products {
    private authData?: AuthData;
    public prices: ProductPrices;

    constructor(authData?: AuthData) {
        this.authData = authData;
        this.prices = new ProductPrices(authData);
    }

    /**
     * Create Product
     * Documentation - https://highlevel.stoplight.io/docs/integrations/9eda2dc176c9c-create-product
     * @param data 
     * @returns 
     */
    async create(data: ICreateProduct) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/products`, data, { headers });
        return response.data as IProductResponse;
    }

    /**
     * Get Product by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/272e8f008adb0-get-product-by-id
     * @param productId 
     * @returns 
     */
    async get(productId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/products/${productId}`, { headers });
        return response.data as IProductResponse;
    }

    /**
     * Update Product
     * Documentation - https://highlevel.stoplight.io/docs/integrations/469d7a90e0d15-update-product-by-id
     * @param productId 
     * @param data 
     * @returns 
     */
    async update(productId: string, data: IUpdateProduct) {
        const headers = this.authData?.headers;
        const response = await axios.patch(`${this.authData?.baseurl}/products/${productId}`, data, { headers });
        return response.data as IProductResponse;
    }

    /**
     * List Products
     * Documentation - https://highlevel.stoplight.io/docs/integrations/7f6ce42d09400-list-products
     * @param params 
     * @returns 
     */
    async getAll(params?: IProductListParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Optional parameters
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.order) queryParams.append("order", params.order);
        if (params?.active !== undefined) queryParams.append("active", params.active.toString());

        const url = `${this.authData?.baseurl}/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await axios.get(url, { headers });
        return response.data as IProductListResponse;
    }

    /**
     * Delete Product
     * Documentation - https://highlevel.stoplight.io/docs/integrations/285e8c049b2e1-delete-product-by-id
     * @param productId 
     * @returns 
     */
    async delete(productId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/products/${productId}`, { headers });
        return response.data as IProductResponse;
    }
}
