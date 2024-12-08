import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";

export class Tag {
    private authData?: AuthData;

    /**
     * Endpoints For Contacts Tags
     * https://highlevel.stoplight.io/docs/integrations/c9bbad7cdacf5-add-tags
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Add tag to contact
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6015cf49a7ae8-get-appointments-for-contact
     */
    async add(contactId: string, tags: string[]) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${Gohighlevel.BASEURL}/contacts/${contactId}/tags/`, { tags }, { headers });
        const events: string[] = response.data.tags;
        return events;
    }


    /**
     * Remove Tags from contact
     * https://highlevel.stoplight.io/docs/integrations/e5d269b7415bf-remove-tags
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