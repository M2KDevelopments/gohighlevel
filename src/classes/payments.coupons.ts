import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IPaymentCouponResponse, 
    IPaymentCouponListResponse,
    IPaymentCouponParams,
    ICreatePaymentCoupon,
    IUpdatePaymentCoupon
} from "../interfaces/payment.coupon";

export class PaymentCoupons {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Create Coupon
     * Documentation - https://highlevel.stoplight.io/docs/integrations/c7d8e2f1b4a92-create-coupon
     * @param data 
     * @returns 
     */
    async create(data: ICreatePaymentCoupon) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/payments/coupons`, data, { headers });
        return response.data as IPaymentCouponResponse;
    }

    /**
     * Get Coupon by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/b9c8d2f5e3a10-get-coupon-by-id
     * @param couponId 
     * @returns 
     */
    async get(couponId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/payments/coupons/${couponId}`, { headers });
        return response.data as IPaymentCouponResponse;
    }

    /**
     * Update Coupon
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a8b7c6d5e4f32-update-coupon
     * @param couponId 
     * @param data 
     * @returns 
     */
    async update(couponId: string, data: IUpdatePaymentCoupon) {
        const headers = this.authData?.headers;
        const response = await axios.patch(`${this.authData?.baseurl}/payments/coupons/${couponId}`, data, { headers });
        return response.data as IPaymentCouponResponse;
    }

    /**
     * List Coupons
     * Documentation - https://highlevel.stoplight.io/docs/integrations/d5e4f3c2b1a90-list-coupons
     * @param params 
     * @returns 
     */
    async getAll(params?: IPaymentCouponParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Optional parameters
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.order) queryParams.append("order", params.order);
        if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());

        const url = `${this.authData?.baseurl}/payments/coupons${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await axios.get(url, { headers });
        return response.data as IPaymentCouponListResponse;
    }

    /**
     * Delete Coupon
     * Documentation - https://highlevel.stoplight.io/docs/integrations/f4e3d2c1b0a89-delete-coupon
     * @param couponId 
     * @returns 
     */
    async delete(couponId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/payments/coupons/${couponId}`, { headers });
        return response.data as IPaymentCouponResponse;
    }
} 