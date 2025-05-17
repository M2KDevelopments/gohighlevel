import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { IOpportunitySearchParams, IOpportunitySearchResponse } from "../interfaces/opportunity";

export class OpportunitiesSearch {
    private authData?: AuthData;

    /**
     * Endpoints For Opportunities Search
     * https://highlevel.stoplight.io/docs/integrations/a163e98c45b8d-search-opportunity
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Search Opportunity
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a163e98c45b8d-search-opportunity
     * @param params 
     * @returns 
     */
    async search(params: IOpportunitySearchParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Required parameter
        queryParams.append("locationId", params.locationId);

        // Optional parameters
        if (params.pipelineId) queryParams.append("pipelineId", params.pipelineId);
        if (params.stageId) queryParams.append("stageId", params.stageId);
        if (params.status) queryParams.append("status", params.status);
        if (params.userId) queryParams.append("userId", params.userId);
        if (params.contactId) queryParams.append("contactId", params.contactId);
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.sort) queryParams.append("sort", params.sort);
        if (params.order) queryParams.append("order", params.order);

        const response = await axios.get(`${this.authData?.baseurl}/opportunities/search?${queryParams.toString()}`, { headers });
        return response.data as IOpportunitySearchResponse;
    }
}