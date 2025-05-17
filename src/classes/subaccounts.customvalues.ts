import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ICustomValue } from "../interfaces/custom.values";

export class CustomValue {
    private authData?: AuthData;

    /**
     * Endpoints For Subaccounts
     * https://highlevel.stoplight.io/docs/integrations/e283eac258a96-sub-account-formerly-location-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
  * Get CustomValues
  * Documentation - https://highlevel.stoplight.io/docs/integrations/d40742c5e3e7d-get-custom-values
  * @param locationId 
  * @returns 
  */
    async getAll(locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/location/${locationId}/customValues`, { headers });
        return response.data.customValues as ICustomValue[];
    }

    /**
    * Get CustomValue
    * Documentation - https://highlevel.stoplight.io/docs/integrations/1c982c0816621-get-custom-value
    * @param locationId 
    * @returns 
    */
    async get(customValueId: string, locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/location/${locationId}/customValues/${customValueId}`, { headers });
        return response.data.customValue as ICustomValue;
    }

    /**
     * Create CustomValue
     * Documentation - https://highlevel.stoplight.io/docs/integrations/e0c3b7e6d196c-create-custom-value
     * @param customValue 
     * @returns 
     */
    async add(locationId: string, customValue: ICustomValue) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/location/${locationId}/customValues`, customValue, { headers });
        return response.data.customValue as ICustomValue;
    }

    /**
     * Update CustomValue
     * Documentation - https://highlevel.stoplight.io/docs/integrations/c5c9b99b0e74f-update-custom-value
     * @param customValue 
     * @param locationId 
     * @returns 
     */
    async update(customValueId: string, locationId: string, customValue: ICustomValue) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/location/${locationId}/customValues/${customValueId}`, customValue, { headers });
        return response.data.customValue as ICustomValue;
    }

    /**
     * Delete CustomValue
     * Documentation - https://highlevel.stoplight.io/docs/integrations/40e00c29eb2da-delete-custom-value
     * @param customValueId 
     * @returns 
     */
    async remove(customValueId: string, locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/location/${locationId}/customValues/${customValueId}`, { headers });
        return response.data.succeded as boolean;
    }
}