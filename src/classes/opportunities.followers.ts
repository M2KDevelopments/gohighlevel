import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { IOpportunityFollowerRequest, IOpportunityFollowerResponse } from "../interfaces/opportunity.follower";

export class OpportunitiesFollowers {
    private authData?: AuthData;

    /**
     * Endpoints For Opportunities Followers
     * https://highlevel.stoplight.io/docs/integrations/a4853ad9d0a48-add-followers
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Add Followers
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a4853ad9d0a48-add-followers
     * @param opportunityId 
     * @param data 
     * @returns 
     */
    async add(opportunityId: string, data: IOpportunityFollowerRequest) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/opportunities/${opportunityId}/followers`, data, { headers });
        return response.data as IOpportunityFollowerResponse;
    }

    /**
     * Remove Followers
     * Documentation - https://highlevel.stoplight.io/docs/integrations/0412c261ca64b-remove-followers
     * @param opportunityId 
     * @param data 
     * @returns 
     */
    async remove(opportunityId: string, data: IOpportunityFollowerRequest) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/opportunities/${opportunityId}/followers`, { 
            headers,
            data
        });
        return response.data as IOpportunityFollowerResponse;
    }
}