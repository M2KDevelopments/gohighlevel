import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";

export class Tag {
    private authData?: AuthData;

    /**
     * Endpoints For Contacts Tags
     * https://highlevel.stoplight.io/docs/integrations/c9bbad7cdacf5-add-tags
     * https://public-api.gohighlevel.com/#dbb4ae8d-1fcc-45ce-a3f8-34fafe771e90
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Add tag to contact. For both GHL App and API
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6015cf49a7ae8-get-appointments-for-contact
     * Documentation - https://public-api.gohighlevel.com/#2b4583f4-d525-43a3-89dc-0034e864df02
     */
    async add(contactId: string, tags: string[]) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${Gohighlevel.BASEURL}/contacts/${contactId}/tags/`, { tags }, { headers });
        const events: string[] = response.data.tags;
        return events;
    }


    /**
     * Remove Tags from contact. For both GHL App and API
     * Documentation - https://highlevel.stoplight.io/docs/integrations/e5d269b7415bf-remove-tags
     * Documentation - https://public-api.gohighlevel.com/#14572da1-a341-42dc-a42c-ac0742d6178e
     * @param contactId 
     * @param tags 
     * @returns 
     */
    async remove(contactId: string, tags: string[]) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${Gohighlevel.BASEURL}/contacts/${contactId}/tags/`, { headers });
        return response.data;
    }
}