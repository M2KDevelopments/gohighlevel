export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: {
        type: string,
        role: string,
        locationIds: Array<string>
    },
    permissions: {
        campaignsEnabled: boolean,
        campaignsReadOnly: boolean,
        contactsEnabled: boolean,
        workflowsEnabled: boolean,
        triggersEnabled: boolean,
        funnelsEnabled: boolean,
        websitesEnabled: boolean,
        opportunitiesEnabled: boolean,
        dashboardStatsEnabled: boolean,
        bulkRequestsEnabled: boolean,
        appointmentsEnabled: boolean,
        reviewsEnabled: boolean,
        onlineListingsEnabled: boolean,
        phoneCallEnabled: boolean,
        conversationsEnabled: boolean,
        assignedDataOnly: boolean,
        adwordsReportingEnabled: boolean,
        membershipEnabled: boolean,
        facebookAdsReportingEnabled: boolean,
        attributionsReportingEnabled: boolean,
        settingsEnabled: boolean,
        tagsEnabled: boolean,
        leadValueEnabled: boolean,
        marketingEnabled: boolean
    }
}