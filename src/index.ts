import { OAuth } from "./classes/oauth";
import { Credientials } from "./interfaces/credientials";

export class Gohighlevel {
    public credientials: Credientials;
    public oauth: OAuth;
    constructor(credientials: Credientials) {
        this.credientials = credientials;
        this.oauth = new OAuth(credientials)
    }
}


const CLIENT_ID = '643d048591fbb10c4c9a6aa7-lgkl8ary';
const CLIENT_ID_SECRET = '9a139ae1-550b-4b48-8e25-fcd03d7cbd3f';
const redirect_uri = `https://app.mysocial360.com/vavicky/api/gohighrevel/callback`

const GHL = new Gohighlevel({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_ID_SECRET,
    redirectUri: redirect_uri,
    isWhiteLabel: true,
    scopes: ["calendars.write"]
})