export interface AuthData {
    locationId: string,
    access_token: string,
    refresh_token?: string,
    expires_in?: number,
    userType?: string
    scope?: string
}