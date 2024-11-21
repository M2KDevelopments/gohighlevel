import { Contacts } from "./classes/contacts";
import { OAuth } from "./classes/oauth";
import { AuthData } from "./interfaces/auth/authdata";
import { Credientials } from "./interfaces/auth/credientials";
import axios from "axios";

export class Gohighlevel {

    public credientials: Credientials;
    public oauth: OAuth;
    public contacts: Contacts;
    private authData: AuthData;
    constructor(credientials: Credientials) {
        this.credientials = credientials;
        this.oauth = new OAuth(credientials);
        this.contacts = new Contacts();
        this.authData = { access_token: "", locationId: "" };
    }

    setAuth(authData: AuthData) {
        this.authData = authData;
        this.contacts = new Contacts(authData);
    }

    /**
     * Retrieves the authentication tokens based on the refresh token.
     * If the current token hasn't expired, the current token is returned.
     * Otherwise, the token is refreshed and the new token is returned.
     * If an error occurs when refreshing the token, the current token is returned.
     * @returns The authentication tokens including the access token, refresh token, expires in time, scope, location ID, and user type.
     */
    async getAuth() {
        // Token hasn't expired
        if (this.authData.expires_in && !isNaN(parseInt(this.authData.expires_in.toString())) && parseInt(this.authData.expires_in.toString()) > Date.now()) return this.authData;

        try {
            const body = new URLSearchParams({
                grant_type: "refresh_token",
                client_id: this.credientials.clientId,
                client_secret: this.credientials.clientSecret,
                refresh_token: this.authData.refresh_token ?? ""
            })
            const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
            const response = await axios.post(`https://api.msgsndr.com/oauth/token`, body, { headers });
            const { access_token, expires_in, scope, locationId, userType } = response.data;

            // Todo save this new auth info
            this.authData = { access_token: access_token, locationId: locationId };
            return { access_token, expires_in, scope, locationId, userType } as AuthData;
        } catch (e) {
            return this.authData;
        }
    }

    /**
     * Determines if the given auth data has expired.
     * 
     * @returns True if the token has expired, false otherwise.
     */
    isAuthExpired() {
        // Token hasn't expired
        const stillGood = (this.authData.expires_in && !isNaN(parseInt(this.authData.expires_in.toString())) && parseInt(this.authData.expires_in.toString()) > Date.now())
        return !stillGood;
    }




}