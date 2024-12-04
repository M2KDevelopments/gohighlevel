import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";
import { ICampaign } from "../interfaces/campaign";


export class Campaign {
    private authData?: AuthData;

    /**
     * Endpoints For Campaigns
     * https://highlevel.stoplight.io/docs/integrations/35a5ad3408e98-campaigns-api
     */
    constructor(authToken?: AuthData) {
        this.authData = authToken;
    }

    /**
     * Get campaigns
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6e067fcb430b7-get-campaigns
     */
    async getAll(locationId: string, status: "draft" | "published") {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/campaigns?${locationId}&status=${status}`, { headers });
        const campaigns: Array<ICampaign> = response.data.campaigns;
        return campaigns;
    }

}




