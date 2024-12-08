import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";
import { ITag } from "../interfaces/tag";

export class Tag {
    private authData?: AuthData;

    /**
     * Endpoints For Tags
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get Tags
     * Documentation - https://highlevel.stoplight.io/docs/integrations/00a65a984720b-get-tags
     * @param locationId 
     * @returns 
     */
    async getAll(locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/location/${locationId}/tags`, { headers });
        return response.data.tags as ITag[];
    }

    /**
    * Get Tag
    * Documentation - https://highlevel.stoplight.io/docs/integrations/2be6f9044b427-get-tag-by-id
    * @param locationId 
    * @returns 
    */
    async get(tagId: string, locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/location/${locationId}/tags/${tagId}`, { headers });
        return response.data.tag as ITag;
    }

    /**
     * Create Tag
     * Documentation - https://highlevel.stoplight.io/docs/integrations/64433faeaa52e-create-tag
     * @param tag 
     * @returns 
     */
    async add(locationId: string, tag: ITag) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${Gohighlevel.BASEURL}/location/${locationId}/tags`, tag, { headers });
        return response.data.tag as ITag;
    }

    /**
     * Update Tag
     * Documentation - https://highlevel.stoplight.io/docs/integrations/809b211aaf37a-update-tag
     * @param tag 
     * @param locationId 
     * @returns 
     */
    async update(tagId: string, locationId: string, tag: ITag) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${Gohighlevel.BASEURL}/location/${locationId}/tags/${tagId}`, tag, { headers });
        return response.data.tag as ITag;
    }

    /**
     * Delete Tag
     * Documentation - https://highlevel.stoplight.io/docs/integrations/8742f26722f45-delete-tag
     * @param tagId 
     * @returns 
     */
    async remove(tagId: string, locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${Gohighlevel.BASEURL}/location/${locationId}/tags/${tagId}`, { headers });
        return response.data.succeded as boolean;
    }
}