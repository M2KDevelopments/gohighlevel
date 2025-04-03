import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";

export class Campaign {
    private authData?: AuthData;

    /**
     * Endpoints For Contacts for Campaigns
     * Documentation: https://highlevel.stoplight.io/docs/integrations/ecf9b5b45deaf-add-contact-to-campaign
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * Add Contact to Campaign
     * Documentation: https://highlevel.stoplight.io/docs/integrations/ecf9b5b45deaf-add-contact-to-campaign
     * https://public-api.gohighlevel.com/#8a506dff-cea3-48bc-909f-4f85a0e8a7be
     * @param contactId 
     * @param campaignId
     * @returns 
     */
    async add(contactId: string, campaignId: string) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/contacts/${contactId}/campaigns/${campaignId}`, {  }, { headers });
        return response.data.succeded as boolean;
    }


    /**
     * Delete Contact from Campaign
     * Documentation: https://highlevel.stoplight.io/docs/integrations/e88fc8bf2a781-remove-contact-from-campaign
     * @param contactId 
     * @param campaignId 
     * @returns 
     */
    async remove(contactId: string, campaignId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/contacts/${contactId}/campaigns/${campaignId}`, { headers });
        return response.data.succeded as boolean;
    }

    /**
     * Delete Contact from all Campaign
     * Documentation: https://highlevel.stoplight.io/docs/integrations/e9642e2d8bc8a-remove-contact-from-every-campaign
     * @param contactId 
     * @param campaignId 
     * @returns 
     */
    async removeAll(contactId: string, campaignId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/contacts/${contactId}/campaigns/${campaignId}/removeAll`, { headers });
        return response.data.succeded as boolean;
    }
}