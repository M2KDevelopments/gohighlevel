export interface AuthData {
    locationId: string,
    access_token: string,
    refresh_token?: string,
    expires_in?: number,
    userType?: string
    scope?: string,
    headers?: {
        Version: "2021-04-15" | string,
        Authorization?: string,
        Accept: 'application/json' | string
    }
}