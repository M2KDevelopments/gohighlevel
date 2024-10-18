import { AuthData } from "../interfaces/authdata";
import { CallbackInfo } from "../interfaces/callback";
import { Credientials } from "../interfaces/credientials";
import axios from 'axios';

export class OAuth {

    private credientials: Credientials;


    /**
     * Creates an OAuth instance with the given credientials for GHL.
     * @param credientials - The credientials for the OAuth flow.
     */
    constructor(credientials: Credientials) {
        this.credientials = credientials;
    }

    /**
     * Returns the OAuth URL for the given credientials.
     * Documentation -  https://highlevel.stoplight.io/docs/integrations/a04191c0fabf9-authorization
     * You can set up an app in Gohighlevel Marketplace - https://marketplace.gohighlevel.com/
     * @returns The OAuth URL, encoded as a URI component.
     */
    getOAuthURL() {
        // https://highlevel.stoplight.io/docs/integrations/a04191c0fabf9-authorization
        const client_id = this.credientials.clientId;
        const redirect_uri = encodeURIComponent(this.credientials.redirectUri);
        const scope = encodeURIComponent(this.credientials.scopes.join(' '));
        const url = `https://marketplace.${this.credientials.isWhiteLabel ? `leadconnectorhq` : `gohighlevel`}.com/oauth/chooselocation?client_id=${client_id}&response_type=code&scope=${scope}&redirect_uri=${redirect_uri}`;
        return url;
    }


    /**
     * Retrieves the authentication tokens based on the provided information.
     * If neither a refresh token nor a code is provided, an error is thrown.
     * 
     * @param info - The CallbackInfo containing the code or refresh token.
     * @returns The authentication tokens including the access token, refresh token, expires in time, scope, location ID, and user type.
     */
    async getCallbackAuthTokens(info: CallbackInfo) {
        if (!info.code && !info.refresh_token) throw new Error("Please enter a refresh token or code");

        const body = info.code ?
            new URLSearchParams({
                grant_type: "authorization_code",
                client_id: this.credientials.clientId,
                client_secret: this.credientials.clientSecret,
                code: info.code,
            }) :
            new URLSearchParams({
                grant_type: "refresh_token",
                client_id: this.credientials.clientId,
                client_secret: this.credientials.clientSecret,
                refresh_token: info.refresh_token!
            })


        // Headers
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

        // Make API Call to get Auth Tokens
        const response = await axios.post(`https://api.msgsndr.com/oauth/token`, body, { headers });
        const { access_token, expires_in, scope, locationId, userType, refresh_token } = response.data;


        // Structure Data
        const data: AuthData = {
            access_token: access_token,
            refresh_token: info.refresh_token ? info.refresh_token : refresh_token,
            expires_in: parseInt(expires_in),
            scope: scope,
            locationId: locationId,
            userType: userType
        }
        return data;
    }

}