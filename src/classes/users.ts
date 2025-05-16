import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { IUser } from "../interfaces/user";

export class User {
    private authData?: AuthData;

    /**
     * Endpoints For Users
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get all Users
     * Documentation - https://public-api.gohighlevel.com/#b2157151-366b-4625-b1f8-d77458d0cf9f
     */
    async getAll() {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/users/`, { headers });
        return response.data.notes as IUser[];
    }

    /**
     * Lookup user by email
     * Documentation - https://public-api.gohighlevel.com/#e74596d5-360c-46cb-b3dd-e065d62c29ee
     * @param email 
     * @returns 
     */
    async lookup(email: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/users/lookup?email=${email}`, { headers });
        return response.data.note as IUser;
    }

    /**
     * Add Location
     * Documentation - https://public-api.gohighlevel.com/#2be923cc-fcbf-466a-8d8e-ff5ee1cfc244
     * @param user 
     * @returns 
     */
    async add(user: IUser) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/users/`, user, { headers });
        return response.data.note as IUser;
    }

    /**
     * Update a Location.
     * Documentation - https://public-api.gohighlevel.com/#4554e49d-0fc6-49d0-aa5c-feda76e522f0
     * @param userId 
     * @param noteId 
     * @param note 
     * @returns 
     */
    async update(userId: string, user: IUser) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/users/${userId}`, user, { headers });
        return response.data.note as IUser;
    }

    /**
     * Delete user.
     * Documentation - https://public-api.gohighlevel.com/#a59b4ce5-0657-46c7-8351-cb42e166e276
     * @param userId 
     * @param deleteTwilioAccount 
     * @returns 
     */
    async remove(userId: string, deleteTwilioAccount: boolean) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/users/${userId}?deleteTwilioAccount=${deleteTwilioAccount}`, { headers });
        return response.data.msg as string;
    }
}
