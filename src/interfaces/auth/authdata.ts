export interface AuthData {
    access_token: string,
    locationId?: string,
    companyId?: string,
    refresh_token?: string,
    expires_in?: number,
    userType?: string,
    useAPIKey?: boolean,
    scope?: "Company" | "Location" | string,
    headers?: {
        Version: "2021-04-15" | string,
        Authorization?: string,
        Accept: 'application/json' | string
    }
}