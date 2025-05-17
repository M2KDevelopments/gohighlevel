import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    ICustomMenuLinkResponse,
    ICustomMenuLinkListResponse,
    ICustomMenuLinkListParams,
    ICreateCustomMenuLink,
    IUpdateCustomMenuLink
} from "../interfaces/custommenu";

export class CustomMenus {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Create Custom Menu Link
     * Documentation - https://highlevel.stoplight.io/docs/integrations/74c33112ec16f-create-custom-menu-link
     * @param data 
     * @returns 
     */
    async create(data: ICreateCustomMenuLink) {
        const headers = this.authData?.headers;
        const response = await axios.post(
            `${this.authData?.baseurl}/custom-menu-links`,
            data,
            { headers }
        );
        return response.data as ICustomMenuLinkResponse;
    }

    /**
     * Get Custom Menu Link by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/61dd579c0eb32-get-custom-menu-link
     * @param linkId 
     * @returns 
     */
    async get(linkId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(
            `${this.authData?.baseurl}/custom-menu-links/${linkId}`,
            { headers }
        );
        return response.data as ICustomMenuLinkResponse;
    }

    /**
     * Update Custom Menu Link
     * Documentation - https://highlevel.stoplight.io/docs/integrations/5117e328cff1d-update-custom-menu-link
     * @param linkId 
     * @param data 
     * @returns 
     */
    async update(linkId: string, data: IUpdateCustomMenuLink) {
        const headers = this.authData?.headers;
        const response = await axios.patch(
            `${this.authData?.baseurl}/custom-menu-links/${linkId}`,
            data,
            { headers }
        );
        return response.data as ICustomMenuLinkResponse;
    }

    /**
     * Delete Custom Menu Link
     * Documentation - https://highlevel.stoplight.io/docs/integrations/8df5e4d2d798e-delete-custom-menu-link
     * @param linkId 
     * @returns 
     */
    async delete(linkId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(
            `${this.authData?.baseurl}/custom-menu-links/${linkId}`,
            { headers }
        );
        return response.data as ICustomMenuLinkResponse;
    }

    /**
     * Get Custom Menu Links
     * Documentation - https://highlevel.stoplight.io/docs/integrations/5a61f2f673169-get-custom-menu-links
     * @param params 
     * @returns 
     */
    async getAll(params?: ICustomMenuLinkListParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Optional parameters
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.order) queryParams.append("order", params.order);
        if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());

        const url = `${this.authData?.baseurl}/custom-menu-links${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await axios.get(url, { headers });
        return response.data as ICustomMenuLinkListResponse;
    }
}
