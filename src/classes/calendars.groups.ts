import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ICalendarGroup } from "../interfaces/calendar.group";

export class CalendarGroup {
    private authData?: AuthData;

    /**
     * Endpoints For Calendars
     * https://highlevel.stoplight.io/docs/integrations/89e47b6c05e67-get-groups
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * 
     * Documentation - https://highlevel.stoplight.io/docs/integrations/89e47b6c05e67-get-groups
     * @param locationId 
     */
    async getAll() {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/calendars/groups`, { headers });
        return response.data.calendars as CalendarGroup[];
    }

    /**
     * Get Calendar by calendar id
     * Documentation - https://highlevel.stoplight.io/docs/integrations/946f5e91e2532-get-calendar
     * @param calendarId 
     * @returns 
     */
    async get(calendarId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/calendars/${calendarId}`, { headers });
        return response.data.calendar as ICalendarGroup;
    }

    /**
     * Validate group slug
     * Documentation - https://highlevel.stoplight.io/docs/integrations/afefaa9b33ca0-validate-group-slug
     * @param locationId
     * @param slug
     * @returns 
     */
    async verifySlug(locationId: string, slug: string) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/calendars/groups/validate-slug`, { locationId, slug }, { headers });
        return response.data.available as boolean;
    }

    /**
     * Create Calendar Group
     * Documentation - https://highlevel.stoplight.io/docs/integrations/fefceb241288c-create-calendar-group
     * @param calendargroup 
     * @returns 
     */
    async add(calendargroup: ICalendarGroup) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/calendars/groups`, calendargroup, { headers });
        return response.data.group as ICalendarGroup;
    }


    

    /**
     * Update Group
     * Documentation - https://highlevel.stoplight.io/docs/integrations/585481332e909-update-group
     * @param groupId 
     * @param name
     * @param description
     * @param slug 
     * @returns 
     */
    async update(groupId: string, name: string, description: string, slug: string) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/calendars/groups/${groupId}`, { name, description, slug }, { headers });
        return response.data.group as ICalendarGroup;
    }

    /**
     * Delete Group
     * Documentation - https://highlevel.stoplight.io/docs/integrations/e8c53752f025d-delete-group
     * @param groupId 
     * @returns 
     */
    async remove(groupId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/calendars/groups/${groupId}`, { headers });
        return response.data.succeded as boolean;
    }


    /**
     * Disable Group
     * Documentation - http://highlevel.stoplight.io/docs/integrations/aed8aeb313d97-disable-group
     * @param groupId 
     * @param isActive
     * @returns 
     */
    async disabled(groupId: String, isActive:boolean) {
        const headers = this.authData?.headers;
        const data = { isActive }
        const response = await axios.put(`${this.authData?.baseurl}/calendars/groups/${groupId}/status`, data, { headers });
        return response.data.success as boolean;
    }
}