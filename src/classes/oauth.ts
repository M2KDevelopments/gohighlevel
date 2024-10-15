import { OAuthCredientials } from "../interfaces/oauth.credientials";

export class OAuth {

    /**
     * Returns the OAuth URL for the given credientials.
     * Documentation -  https://highlevel.stoplight.io/docs/integrations/a04191c0fabf9-authorization
     * @param credientials The credientials for the OAuth request.
     * @returns The OAuth URL, encoded as a URI component.
     */
    getOAuthURL(credientials: OAuthCredientials) {
        // https://highlevel.stoplight.io/docs/integrations/a04191c0fabf9-authorization
        const client_id = credientials.clientId;
        const redirect_uri = credientials.redirectUri;
        const scope = credientials.scopes.join(' ');
        const url = `https://marketplace.${credientials.isWhiteLabel ? `leadconnectorhq` : `gohighlevel`}.com/oauth/chooselocation?client_id=${client_id}&response_type=code&scope=${scope}&redirect_uri=${redirect_uri}`;
        return encodeURIComponent(url);
    }

}