import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IFunnelListResponse, 
    IFunnelPagesResponse, 
    IFunnelPagesCountResponse,
    IFunnelParams 
} from "../interfaces/funnel";
import { FunnelRedirect } from "./funnels.redirect";

export class Funnels {
    private authData?: AuthData;
    public redirect: FunnelRedirect;

    /**
     * Endpoints For Funnels
     * https://highlevel.stoplight.io/docs/integrations/80d7ad39f1e90-fetch-list-of-funnels
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
        this.redirect = new FunnelRedirect(authData);
    }

    /**
     * Fetch List of Funnels
     * Documentation - https://highlevel.stoplight.io/docs/integrations/80d7ad39f1e90-fetch-list-of-funnels
     * @param params 
     * @returns 
     */
    async getAll(params: IFunnelParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Required parameter
        queryParams.append("locationId", params.locationId);

        // Optional parameters
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("search", params.search);

        const response = await axios.get(`${this.authData?.baseurl}/funnels?${queryParams.toString()}`, { headers });
        return response.data as IFunnelListResponse;
    }

    /**
     * Fetch List of Funnel Pages
     * Documentation - https://highlevel.stoplight.io/docs/integrations/99a6409949f15-fetch-list-of-funnel-pages
     * @param funnelId 
     * @param params 
     * @returns 
     */
    async getPages(funnelId: string, params: IFunnelParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Required parameter
        queryParams.append("locationId", params.locationId);

        // Optional parameters
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("search", params.search);

        const response = await axios.get(`${this.authData?.baseurl}/funnels/${funnelId}/pages?${queryParams.toString()}`, { headers });
        return response.data as IFunnelPagesResponse;
    }

    /**
     * Fetch Count of Funnel Pages
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6bee319f931fa-fetch-count-of-funnel-pages
     * @param funnelId 
     * @param locationId 
     * @returns 
     */
    async getPagesCount(funnelId: string, locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/funnels/${funnelId}/pages/count?locationId=${locationId}`, { headers });
        return response.data as IFunnelPagesCountResponse;
    }
}
