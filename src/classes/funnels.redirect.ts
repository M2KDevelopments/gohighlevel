import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IFunnelRedirect, 
    IFunnelRedirectListResponse, 
    ICreateFunnelRedirect, 
    IUpdateFunnelRedirect,
    IFunnelRedirectParams 
} from "../interfaces/funnel.redirect";

export class FunnelRedirect {
    private authData?: AuthData;

    /**
     * Endpoints For Funnel Redirects
     * https://highlevel.stoplight.io/docs/integrations/98aaa4819e58b-create-redirect
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Create Redirect
     * Documentation - https://highlevel.stoplight.io/docs/integrations/98aaa4819e58b-create-redirect
     * @param data 
     * @returns 
     */
    async create(data: ICreateFunnelRedirect) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/funnels/${data.funnelId}/pages/${data.pageId}/redirects`, data, { headers });
        return response.data as IFunnelRedirect;
    }

    /**
     * Update Redirect by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/42c343d756316-update-redirect-by-id
     * @param redirectId 
     * @param data 
     * @returns 
     */
    async update(redirectId: string, data: IUpdateFunnelRedirect) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/funnels/redirects/${redirectId}`, data, { headers });
        return response.data as IFunnelRedirect;
    }

    /**
     * Delete Redirect by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/55c4fc25361eb-delete-redirect-by-id
     * @param redirectId 
     * @returns 
     */
    async remove(redirectId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/funnels/redirects/${redirectId}`, { headers });
        return response.data;
    }

    /**
     * Fetch List of Redirects
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a1a9c79cd27ed-fetch-list-of-redirects
     * @param params 
     * @returns 
     */
    async getAll(params: IFunnelRedirectParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Required parameters
        queryParams.append("locationId", params.locationId);
        queryParams.append("funnelId", params.funnelId);
        queryParams.append("pageId", params.pageId);

        // Optional parameters
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());

        const response = await axios.get(`${this.authData?.baseurl}/funnels/redirects?${queryParams.toString()}`, { headers });
        return response.data as IFunnelRedirectListResponse;
    }
}
