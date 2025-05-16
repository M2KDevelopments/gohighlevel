import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ILocation } from "../interfaces/location";

export class Location {
    private authData?: AuthData;

    /**
     * Endpoints For Contacts Notes
     * https://highlevel.stoplight.io/docs/integrations/db572d519b209-get-all-notes
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get all Locations
     * Documentation - https://public-api.gohighlevel.com/#b2157151-366b-4625-b1f8-d77458d0cf9f
     */
    async getAll() {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/locations/`, { headers });
        return response.data.notes as ILocation[];
    }

    /**
     * Lookup location by email
     * Documentation - https://public-api.gohighlevel.com/#e74596d5-360c-46cb-b3dd-e065d62c29ee
     * @param email 
     * @returns 
     */
    async lookup(email: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/locations/lookup?email=${email}`, { headers });
        return response.data.note as ILocation;
    }

    /**
     * Add Location
     * Documentation - https://public-api.gohighlevel.com/#2be923cc-fcbf-466a-8d8e-ff5ee1cfc244
     * @param location 
     * @returns 
     */
    async add(location: ILocation) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/locations/`, location, { headers });
        return response.data.note as ILocation;
    }

    /**
     * Update a Location.
     * Documentation - https://public-api.gohighlevel.com/#4554e49d-0fc6-49d0-aa5c-feda76e522f0
     * @param locationId 
     * @param noteId 
     * @param note 
     * @returns 
     */
    async update(locationId: string, location: ILocation) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/locations/${locationId}`, location, { headers });
        return response.data.note as ILocation;
    }

    /**
     * Delete location.
     * Documentation - https://public-api.gohighlevel.com/#a59b4ce5-0657-46c7-8351-cb42e166e276
     * @param locationId 
     * @param deleteTwilioAccount 
     * @returns 
     */
    async remove(locationId: string, deleteTwilioAccount: boolean) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/locations/${locationId}?deleteTwilioAccount=${deleteTwilioAccount}`, { headers });
        return response.data.msg as string;
    }
}
