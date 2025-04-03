import axios from "axios";
import { Gohighlevel } from "..";
import { AuthData } from "../interfaces/auth/authdata";
import { ILink } from "../interfaces/link";

export class TriggerLink {
    private authData?: AuthData;

    /**
     * Endpoints For Trigger Links
     * https://highlevel.stoplight.io/docs/integrations/85c4db13a5d69-links-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }



    /**
     * Get all Links
     * Documentation - https://highlevel.stoplight.io/docs/integrations/7b6e00ee0f653-get-links
      
     */
    async getAll(locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/links?locationId=${locationId}`, { headers });
        return response.data.links as ILink[];
    }


    /**
     * Create Link
     * Documentation - https://highlevel.stoplight.io/docs/integrations/30442546481af-create-link
      
     * @param link 
     * @returns 
     */
    async add(link: ILink) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/links`, link, { headers });
        return response.data.link as ILink;
    }

    /**
     * Update Link
     * Documentation - https://highlevel.stoplight.io/docs/integrations/7fb0921457bdb-update-link
      
     * @param linkId 
     * @param link 
     * @returns 
     */
    async update(linkId: string, link: ILink) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/links/${linkId}`, link, { headers });
        return response.data.link as ILink;
    }

    /**
     * Delete Link
     * Documentation - https://highlevel.stoplight.io/docs/integrations/b38b571ee30bd-delete-link
      
     * @param linkId 
     * @returns 
     */
    async remove(linkId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/links/${linkId}`, { headers });
        return response.data.succeded as boolean;
    }
}
