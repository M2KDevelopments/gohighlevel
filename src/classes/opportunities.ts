import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IOpportunity,
    IOpportunityResponse,
    ICreateOpportunity,
    IUpdateOpportunity,
    IUpdateOpportunityStatus,
    IUpsertOpportunity
} from "../interfaces/opportunity";
import { OpportunitiesSearch } from "./opportunities.search";
import { OpportunitiesPipelines } from "./opportunities.pipelines";
import { OpportunitiesFollowers } from "./opportunities.followers";

export class Opportunities {
    private authData?: AuthData;
    public search: OpportunitiesSearch;
    public pipelines: OpportunitiesPipelines;
    public followers: OpportunitiesFollowers;

    /**
     * Endpoints For Opportunities
     * https://highlevel.stoplight.io/docs/integrations/31798edaafcba-get-opportunity
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
        this.search = new OpportunitiesSearch(authData);
        this.pipelines = new OpportunitiesPipelines(authData);
        this.followers = new OpportunitiesFollowers(authData);
    }

    /**
     * Get Opportunity
     * Documentation - https://highlevel.stoplight.io/docs/integrations/31798edaafcba-get-opportunity
     * @param opportunityId 
     * @returns 
     */
    async get(opportunityId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/opportunities/${opportunityId}`, { headers });
        return response.data as IOpportunityResponse;
    }

    /**
     * Create Opportunity
     * Documentation - https://highlevel.stoplight.io/docs/integrations/802093aa63900-create-opportunity
     * @param data 
     * @returns 
     */
    async create(data: ICreateOpportunity) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/opportunities`, data, { headers });
        return response.data as IOpportunityResponse;
    }

    /**
     * Update Opportunity
     * Documentation - https://highlevel.stoplight.io/docs/integrations/ca75b3ab9e828-update-opportunity
     * @param opportunityId 
     * @param data 
     * @returns 
     */
    async update(opportunityId: string, data: IUpdateOpportunity) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/opportunities/${opportunityId}`, data, { headers });
        return response.data as IOpportunityResponse;
    }

    /**
     * Update Opportunity Status
     * Documentation - https://highlevel.stoplight.io/docs/integrations/d595e6fa2b666-update-opportunity-status
     * @param opportunityId 
     * @param data 
     * @returns 
     */
    async updateStatus(opportunityId: string, data: IUpdateOpportunityStatus) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/opportunities/${opportunityId}/status`, data, { headers });
        return response.data as IOpportunityResponse;
    }

    /**
     * Upsert Opportunity
     * Documentation - https://highlevel.stoplight.io/docs/integrations/9df1c12e5da99-upsert-opportunity
     * @param data 
     * @returns 
     */
    async upsert(data: IUpsertOpportunity) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/opportunities/upsert`, data, { headers });
        return response.data as IOpportunityResponse;
    }

    /**
     * Delete Opportunity
     * Documentation - https://highlevel.stoplight.io/docs/integrations/11568af679dff-delete-opportunity
     * @param opportunityId 
     * @returns 
     */
    async remove(opportunityId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/opportunities/${opportunityId}`, { headers });
        return response.data;
    }
}