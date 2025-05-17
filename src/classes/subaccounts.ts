import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ISubAccount } from "../interfaces/subaccount";
import { CustomValue } from "./subaccounts.customvalues";
import { CustomField } from "./subaccounts.customfields";
import { Tag } from "./contacts.tags";

interface SearchTask {
    contactId?: string,
    completed?: boolean,
    assignedTo: string[],
    query?: string,
    limit?: number,
    skip?: number,
    businessId?: string
}

export class SubAccount {
    private authData?: AuthData;
    public customValues: CustomValue;
    public customFields: CustomField;
    public tags: Tag;

    /**
     * Endpoints For Subaccounts
     * https://highlevel.stoplight.io/docs/integrations/e283eac258a96-sub-account-formerly-location-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
        this.customFields = new CustomField(authData);
        this.customValues = new CustomValue(authData);
        this.tags = new Tag(authData);
    }


    /**
     * Get Subaccount
     * https://highlevel.stoplight.io/docs/integrations/d777490312af4-get-sub-account-formerly-location
     * @param locationId
     */
    async get(locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/location/${locationId}`, { headers });
        return response.data.location as ISubAccount;
    }

    /**
     * Get all timezones
     * @param locationId 
     * @returns 
     */
    async getTimezones(locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/location/${locationId}/timezones`, { headers });
        return response.data;
    }

    /**
     * Search for tasks
     * @param locationId 
     * @returns 
     */
    async searchTask(locationId: string, search: SearchTask) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/location/${locationId}/tasks/search`, search, { headers });
        return response.data.tasks;
    }


    /**
     * Search for subaccount
     * Documentation - https://highlevel.stoplight.io/docs/integrations/12f3fb56990d3-search
     * @param companyId 
     * @param email 
     * @param limit 
     * @param order 
     * @param skip 
     * @returns 
     */
    async search(limit: number = 10, order: 'asc' | 'desc', skip: 0, companyId: string = "", email: string = "") {
        const headers = this.authData?.headers;
        const query = `?limit=${limit}&order=${order}&skip=${skip}${companyId ? `&companyId=${companyId}` : ""}${email ? `&email=${email}` : ""}`
        const response = await axios.get(`${this.authData?.baseurl}/location/search${query}`, { headers });
        return response.data.locations as ISubAccount[];
    }

    /**
     * Create a new Sub-Account (Formerly Location) based on the data provided
     * @param subaccount 
     * @returns 
     */
    async post(subaccount: ISubAccount) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/location`, subaccount, { headers });
        return response.data as ISubAccount;
    }


    /**
     * Update a Sub-Account (Formerly Location) based on the data provided
     * @param locationId 
     * @param subaccount 
     * @returns 
     */
    async update(locationId: string, subaccount: ISubAccount) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/location/${locationId}`, subaccount, { headers });
        return response.data as ISubAccount;
    }


    /**
     * Delete a Sub-Account (Formerly Location) from the Agency
     * @param locationId 
     * @param deleteTwilioAccount 
     * @returns 
     */
    async remove(locationId: string, deleteTwilioAccount: boolean) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/location/${locationId}?deleteTwilioAccount=${deleteTwilioAccount}`, { headers });
        return response.data as { success: boolean, message: string };
    }
}