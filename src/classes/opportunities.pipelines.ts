import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { IOpportunityPipelineResponse } from "../interfaces/opportunity.pipeline";

export class OpportunitiesPipelines {
    private authData?: AuthData;

    /**
     * Endpoints For Opportunities Pipelines
     * https://highlevel.stoplight.io/docs/integrations/927589990bc39-get-pipelines
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get Pipelines
     * Documentation - https://highlevel.stoplight.io/docs/integrations/927589990bc39-get-pipelines
     * @param locationId 
     * @returns 
     */
    async getAll(locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/opportunities/pipelines?locationId=${locationId}`, { headers });
        return response.data as IOpportunityPipelineResponse;
    }
}