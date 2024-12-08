import axios from "axios";
import { Gohighlevel } from "..";
import { AuthData } from "../interfaces/auth/authdata";
import { IBusiness } from "../interfaces/business";

export class Business {
    private authData?: AuthData;

    /**
     * Endpoints For Businesss
     * https://highlevel.stoplight.io/docs/integrations/bb6b717cac89c-business-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * Get Business by location id
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a8db8afcbe0a3-get-businesses-by-location
     * @param locationId 
     */
    async getAll(locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/businesses?locationId=${locationId}`, { headers });
        return response.data.businesses as IBusiness[];
    }

    /**
     * Get Business
     * Documentation - https://highlevel.stoplight.io/docs/integrations/c4d36fb259656-get-business 
     * @param businessId 
     * @returns 
     */
    async get(businessId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/businesses/${businessId}`, { headers });
        return response.data.business as IBusiness;
    }

    /**
     * Create Business
     * Documentation - https://highlevel.stoplight.io/docs/integrations/7636876b20ac3-create-business
     * @param business 
     * @returns 
     */
    async add(business: IBusiness) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${Gohighlevel.BASEURL}/businesses`, business, { headers });
        return response.data.business as IBusiness;
    }

    /**
     * Update Business
     * Documentation - https://highlevel.stoplight.io/docs/integrations/b95210ff2a8d7-update-business
     * @param businessId 
     * @param business 
     * @returns 
     */
    async update(businessId: string, business: IBusiness) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${Gohighlevel.BASEURL}/businesses/${businessId}`, business, { headers });
        return response.data.business as IBusiness;
    }

    /**
     * Delete Business
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6f776fbd6dd1f-delete-business
     * @param businessId 
     * @returns 
     */
    async remove(businessId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${Gohighlevel.BASEURL}/businesses/${businessId}`, { headers });
        return response.data.succeded as boolean;
    }
}