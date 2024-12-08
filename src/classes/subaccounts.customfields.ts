import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";
import { ICustomField } from "../interfaces/custom.fields";

export class CustomField {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
    * Get CustomFields
    * Documentation - https://highlevel.stoplight.io/docs/integrations/791462a3367b9-get-custom-fields
    * @param locationId 
    * @returns 
    */
    async getAll(locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/location/${locationId}/customFields`, { headers });
        return response.data.customFields as ICustomField[];
    }

    /**
    * Get CustomField
    * Documentation - https://highlevel.stoplight.io/docs/integrations/791462a3367b9-get-custom-fields
    * @param locationId 
    * @returns 
    */
    async get(customFieldId: string, locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/location/${locationId}/customFields/${customFieldId}`, { headers });
        return response.data.customField as ICustomField;
    }

    /**
     * Create CustomField
     * Documentation - https://highlevel.stoplight.io/docs/integrations/7b2584aa2450c-create-custom-field
     * @param customField 
     * @returns 
     */
    async add(locationId: string, customField: ICustomField) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${Gohighlevel.BASEURL}/location/${locationId}/customFields`, customField, { headers });
        return response.data.customField as ICustomField;
    }

    /**
     * Update CustomField
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a96e05f71bdf4-update-custom-field
     * @param customField 
     * @param locationId 
     * @returns 
     */
    async update(customFieldId: string, locationId: string, customField: ICustomField) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${Gohighlevel.BASEURL}/location/${locationId}/customFields/${customFieldId}`, customField, { headers });
        return response.data.customField as ICustomField;
    }

    /**
     * Delete CustomField
     * Documentation - https://highlevel.stoplight.io/docs/integrations/ca83b24e1ca24-delete-custom-field
     * @param customFieldId 
     * @returns 
     */
    async remove(customFieldId: string, locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${Gohighlevel.BASEURL}/location/${locationId}/customFields/${customFieldId}`, { headers });
        return response.data.succeded as boolean;
    }
}
