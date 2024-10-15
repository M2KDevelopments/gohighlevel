import { Scopes } from "./scopes";

export interface Credientials {
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    scopes: Array<Scopes>,
    isWhiteLabel: boolean
}