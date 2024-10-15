export interface AuthToken {
    access_token: string,
    refresh_token?: string,
    expires_in: number,
    locationId: string,
    userType: string
    scope: string
}