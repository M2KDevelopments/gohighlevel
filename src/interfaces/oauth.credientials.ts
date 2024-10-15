import { Scopes } from "./scopes"

export interface OAuthCredientials {
    clientId: string
    redirectUri: string,
    scopes: Array<Scopes>
    isWhiteLabel: boolean
}