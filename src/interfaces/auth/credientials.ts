export interface Credientials {
    // https://highlevel.stoplight.io/docs/integrations/0443d7d1a4bd0-overview
    clientId?: string,
    clientSecret?: string,
    redirectUri?: string,
    userType?: 'Location' | 'Company',
    scopes?: string[],
    isWhiteLabel?: boolean,


    // or - https://public-api.gohighlevel.com/#intro
    apiKey?: string,
}