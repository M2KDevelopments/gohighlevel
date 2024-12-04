import { AuthData } from "../interfaces/auth/authdata";
import { CallbackInfo } from "../interfaces/auth/callback";
import { Credientials } from "../interfaces/auth/credientials";
import axios from 'axios';

export class OAuth {

    private credientials: Credientials;


    /**
     * Creates an OAuth instance with the given credientials for GHL.
     * @param credientials - The credientials for the OAuth flow.
     */
    constructor(credientials: Credientials) {
        this.credientials = credientials;
    }

    /**
     * Returns the OAuth URL for the given credientials.
     * Documentation -  https://highlevel.stoplight.io/docs/integrations/a04191c0fabf9-authorization
     * You can set up an app in Gohighlevel Marketplace - https://marketplace.gohighlevel.com/
     * @returns The OAuth URL, encoded as a URI component.
     */
    getOAuthURL() {
        // https://highlevel.stoplight.io/docs/integrations/a04191c0fabf9-authorization
        const client_id = this.credientials.clientId;
        const redirect_uri = encodeURIComponent(this.credientials.redirectUri);
        const scope = encodeURIComponent(this.credientials.scopes.join(' '));
        const url = `https://marketplace.${this.credientials.isWhiteLabel ? `leadconnectorhq` : `gohighlevel`}.com/oauth/chooselocation?client_id=${client_id}&response_type=code&scope=${scope}&redirect_uri=${redirect_uri}`;
        return url;
    }


    /**
     * Retrieves the authentication tokens based on the provided information.
     * If neither a refresh token nor a code is provided, an error is thrown.
     * 
     * @param info - The CallbackInfo containing the code or refresh token.
     * @returns The authentication tokens including the access token, refresh token, expires in time, scope, location ID, and user type.
     */
    async getCallbackAuthTokens(info: CallbackInfo) {
        if (!info.code && !info.refresh_token) throw new Error("Please enter a refresh token or code");

        const body = info.code ?
            new URLSearchParams({
                grant_type: "authorization_code",
                client_id: this.credientials.clientId,
                client_secret: this.credientials.clientSecret,
                code: info.code,
            }) :
            new URLSearchParams({
                grant_type: "refresh_token",
                client_id: this.credientials.clientId,
                client_secret: this.credientials.clientSecret,
                refresh_token: info.refresh_token!
            })


        // Headers
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

        // Make API Call to get Auth Tokens
        const response = await axios.post(`https://api.msgsndr.com/oauth/token`, body, { headers });
        const { access_token, expires_in, scope, locationId, userType, refresh_token } = response.data;


        // Structure Data
        const data: AuthData = {
            access_token: access_token,
            refresh_token: info.refresh_token ? info.refresh_token : refresh_token,
            expires_in: parseInt(expires_in),
            scope: scope,
            locationId: locationId,
            userType: userType
        }
        return data;
    }

    /***
     * ADD SCOPES
     */
    private addScope(scope: string) {
        const set = new Set<string>();
        for (const s of this.credientials.scopes) set.add(s);
        set.add(scope);
        this.credientials.scopes = Array.from(set.values())
        return this;
    }


    // Blogs
    scopeBlogsPostReadonly() { return this.addScope("blogs/post.write"); }
    scopeBlogsPostUpdateWrite() { return this.addScope('blogs/post-update.write'); }
    scopeBlogsCheckSlugReadonly() { return this.addScope("blogs/check-slug.readonly"); }
    scopeBlogsCategoryReadonly() { return this.addScope('blogs/category.readonly'); }
    scopeBlogsAuthReadonly() { return this.addScope("blogs/author.readonly"); }


    // Businesses
    scopeBusinessesReadonly() { return this.addScope("businesses.readonly"); }
    scopeBusinessesWrite() { return this.addScope('businesses.write'); }

    // Companies
    scopeCompaniesReadonly() { return this.addScope('companies.readonly'); }

    // Calendars
    scopeCalendarsReadonly() { return this.addScope("calendars.readonly"); }
    scopeCalendarsWrite() { return this.addScope("calendars.write"); }
    scopeCalendarsEventsReadonly() { return this.addScope("calendars/events.readonly"); }
    scopeCalendarsEventsWrite() { return this.addScope('calendars/events.write'); }
    scopeCalendarsGroupsReadonly() { return this.addScope("calendars/groups.readonly"); }
    scopeCalendarsGroupsWrite() { return this.addScope('calendars/groups.write'); }
    scopeCalendarsResourcesReadonly() { return this.addScope("calendars/resources.readonly"); }
    scopeCalendarsResourcesWrite() { return this.addScope('calendars/resources.write'); }

    // Campaigns
    scopeCampaignsReadonly() { return this.addScope('campaigns.readonly'); }

    // Contacts
    scopeContactsReadonly() { return this.addScope("contacts.readonly"); }
    scopeContactsWrite() { return this.addScope("contacts.write"); }

    // Conversations
    scopeConversationsReadonly() { return this.addScope("conversations.readonly"); }
    scopeConversationsWrite() { return this.addScope("conversations.write"); }
    scopeConversationsMessagesReadonly() { return this.addScope("conversations/message.readonly"); }
    scopeConversationsMessagesWrite() { return this.addScope("conversations/message.write"); }
    scopeConversationsReports() { return this.addScope("conversations/reports.write"); }

    // Courses
    scopeCoursesReadonly() { return this.addScope("courses.readonly"); }
    scopeCoursesWrite() { return this.addScope("courses.write"); }

    // Forms
    scopeFormsReadonly() { return this.addScope("forms.readonly"); }
    scopeFormsWrite() { return this.addScope("forms.write"); }


    // Funnnels
    scopeFunnnelsRedirectReadonly() { return this.addScope("funnels/redirect.readonly"); }
    scopeFunnnelsRedirectWrite() { return this.addScope("funnels/redirect.write"); }
    scopeFunnnelsPageWrite() { return this.addScope("funnels/page.readonly"); }
    scopeFunnnelsPageCountReadonly() { return this.addScope("funnels/pagecount.readonly"); }
    scopeFunnnelsFunnelReadonly() { return this.addScope("funnels/funnel.readonly"); }

    // Invoices
    scopeInvoicesReadonly() { return this.addScope("invoices.readonly"); }
    scopeInvoicesWrite() { return this.addScope("invoices.write"); }
    scopeInvoicesScheduleReadonly() { return this.addScope("invoices/schedule.readonly"); }
    scopeInvoicesScheduleWrite() { return this.addScope("invoices/schedule.write"); }
    scopeInvoicesTemplateReadonly() { return this.addScope("invoices/template.readonly"); }
    scopeInvoicesTemplateWrite() { return this.addScope("invoices/template.write"); }

    // Links
    scopeLinksReadonly() { return this.addScope("links.readonly"); }
    scopeLinksWrite() { return this.addScope("links.write"); }


    // Locations
    scopeLocationsReadonly() { return this.addScope("locations.readonly"); }
    scopeLocationsWrite() { return this.addScope("locations.write"); }
    scopeLocationsCustomValuesReadonly() { return this.addScope("locations/customValues.readonly"); }
    scopeLocationsCustomValuesWrite() { return this.addScope("locations/customValues.write"); }
    scopeLocationsCustomFieldsReadonly() { return this.addScope("locations/customFields.readonly"); }
    scopeLocationsCustomFieldsWrite() { return this.addScope("locations/customFields.write"); }
    scopeLocationsTasksReadonly() { return this.addScope("locations/tasks.readonly"); }
    scopeLocationsTasksWrite() { return this.addScope("locations/tasks.write"); }
    scopeLocationsTagsReadonly() { return this.addScope("locations/tags.readonly"); }
    scopeLocationsTagsWrite() { return this.addScope("locations/tags.write"); }
    scopeLocationsTemplatesReadonly() { return this.addScope("locations/templates.readonly"); }


    // LC-Email
    scopeLCEmail() { return this.addScope("lc-email.readonly"); }

    // Medias
    scopeMediasReadonly() { return this.addScope("medias.readonly"); }
    scopeMediasWrite() { return this.addScope("medias.write"); }


    // Payments
    scopePaymentsOrdersReadonly() { return this.addScope("payments/orders.readonly"); }
    scopePaymentsOrdersWrite() { return this.addScope("payments/orders.write"); }
    scopePaymentsIntegrationReadonly() { return this.addScope("payments/integration.readonly"); }
    scopePaymentsIntegrationWrite() { return this.addScope("payments/integration.write"); }
    scopePaymentsTransactionsReadonly() { return this.addScope("payments/transactions.readonly"); }
    scopePaymentsSubscriptionsReadonly() { return this.addScope("payments/subscriptions.readonly"); }
    scopePaymentsCustomProviderReadonly() { return this.addScope("payments/custom-provider.readonly"); }
    scopePaymentsCustomProviderWrite() { return this.addScope("payments/custom-provider.write"); }


    // Products
    scopeProductsReadonly() { return this.addScope("products.readonly"); }
    scopeProductsWrite() { return this.addScope("products.write"); }
    scopeProductsPricesReadonly() { return this.addScope("products/prices.readonly"); }
    scopeProductsPricesWrite() { return this.addScope("products/prices.write"); }
    scopeProductsCollectionReadonly() { return this.addScope("products/collection.readonly"); }
    scopeProductsCollectionWrite() { return this.addScope("products/collection.write"); }


    // Oauth
    scopeOauthReadonly() { return this.addScope("oauth.readonly"); }
    scopeOauthWrite() { return this.addScope("oauth.write"); }

    // Objects
    scopeObjectsSchemaReadonly() { return this.addScope("objects/schema.readonly"); }
    scopeObjectsSchemaWrite() { return this.addScope("objects/schema.write"); }
    scopeObjectsRecordReadonly() { return this.addScope("objects/record.readonly"); }
    scopeObjectsRecordWrite() { return this.addScope("objects/record.write"); }

    // Opportunities
    scopeOpportunitiesReadonly() { return this.addScope("opportunities.readonly"); }
    scopeOpportunitiesWrite() { return this.addScope("opportunities.write"); }

    // Saas
    scopeSaasCompanyReadonly() { return this.addScope("saas/company.readonly"); }
    scopeSaasCompanyWrite() { return this.addScope("saas/company.write"); }
    scopeSaasLocationReadonly() { return this.addScope("saas/location.readonly"); }
    scopeSaasLocationWrite() { return this.addScope("saas/location.write"); }


    // Snapshots
    scopeSnapshotsReadonly() { return this.addScope("snapshots.readonly"); }
    scopeSnapshotsWrite() { return this.addScope("snapshots.write"); }


    // Store
    scopeStoreShippingReadonly() { return this.addScope("store/shipping.readonly"); }
    scopeStoreShippingWrite() { return this.addScope("store/shipping.write"); }
    scopeStoreSettingReadonly() { return this.addScope("store/setting.readonly"); }
    scopeStoreSettingWrite() { return this.addScope("store/setting.write"); }


    // Surveys
    scopeSurveysReadonly() { return this.addScope("surveys.readonly"); }


    // Users
    scopeUsersReadonly() { return this.addScope("users.readonly"); }
    scopeUsersWrite() { return this.addScope("users.write"); }


    // Wordpress Site
    scopeWordPressSiteReadonly() { return this.addScope("wordpress.site.readonly"); }

    // Workflows
    scopeWorkflowsReadonly() { return this.addScope("workflows.readonly"); }

}


 