import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    ISaaSLocationResponse,
    IUpdateSaaSSubscription,
    IEnableSaaS,
    IUpdateRebilling,
    ISaaSResponse,
    IPauseLocation
} from "../interfaces/saas";

export class SaaS {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get Locations by Stripe ID with Company ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/17e63a64621dc-get-locations-by-stripe-id-with-company-id
     * @param companyId 
     * @param stripeId 
     * @returns 
     */
    async getLocationsByStripeId(companyId: string, stripeId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(
            `${this.authData?.baseurl}/companies/${companyId}/locations/stripe/${stripeId}`,
            { headers }
        );
        return response.data as ISaaSLocationResponse;
    }

    /**
     * Update SaaS Subscription
     * Documentation - https://highlevel.stoplight.io/docs/integrations/3ed6984d6d3d3-update-saa-s-subscription
     * @param locationId 
     * @param data 
     * @returns 
     */
    async updateSubscription(locationId: string, data: IUpdateSaaSSubscription) {
        const headers = this.authData?.headers;
        const response = await axios.patch(
            `${this.authData?.baseurl}/locations/${locationId}/subscription`,
            data,
            { headers }
        );
        return response.data as ISaaSResponse;
    }

    /**
     * Disable SaaS for Locations
     * Documentation - https://highlevel.stoplight.io/docs/integrations/ae2bab1a54b4b-disable-saa-s-for-locations
     * @param locationIds 
     * @returns 
     */
    async disable(locationIds: string[]) {
        const headers = this.authData?.headers;
        const response = await axios.post(
            `${this.authData?.baseurl}/locations/disable`,
            { locationIds },
            { headers }
        );
        return response.data as ISaaSResponse;
    }

    /**
     * Enable SaaS for Sub Account (formerly Location)
     * Documentation - https://highlevel.stoplight.io/docs/integrations/b7ee10fc892a5-enable-saa-s-for-sub-account-formerly-location
     * @param locationId 
     * @param data 
     * @returns 
     */
    async enable(locationId: string, data: IEnableSaaS) {
        const headers = this.authData?.headers;
        const response = await axios.post(
            `${this.authData?.baseurl}/locations/${locationId}/enable`,
            data,
            { headers }
        );
        return response.data as ISaaSResponse;
    }

    /**
     * Pause Location
     * Documentation - https://highlevel.stoplight.io/docs/integrations/7ad2b7afa2a8c-pause-location
     * @param locationId 
     * @param data 
     * @returns 
     */
    async pause(locationId: string, data?: IPauseLocation) {
        const headers = this.authData?.headers;
        const response = await axios.post(
            `${this.authData?.baseurl}/locations/${locationId}/pause`,
            data || {},
            { headers }
        );
        return response.data as ISaaSResponse;
    }

    /**
     * Update Rebilling
     * Documentation - https://highlevel.stoplight.io/docs/integrations/cad43318bd5dc-update-rebilling
     * @param locationId 
     * @param data 
     * @returns 
     */
    async updateRebilling(locationId: string, data: IUpdateRebilling) {
        const headers = this.authData?.headers;
        const response = await axios.patch(
            `${this.authData?.baseurl}/locations/${locationId}/rebilling`,
            data,
            { headers }
        );
        return response.data as ISaaSResponse;
    }
}
