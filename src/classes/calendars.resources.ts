import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ICalendarResource } from "../interfaces/calendar.resource";

export class CalendarResource {
    private authData?: AuthData;

    /**
     * Endpoints For Calendars Resources
     * https://highlevel.stoplight.io/docs/integrations/146912d6a9c38-get-calendar-resource
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * List Calendar Resources
     * Documentation - https://highlevel.stoplight.io/docs/integrations/e3a7d63a0134b-list-calendar-resources
     * @param resourceId
     * @param resourceType
     */
    async getAll(resourceType: "equipments" | "rooms") {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/calendars/resources/${resourceType}`, { headers });
        return response.data as ICalendarResource[];
    }

    

    /**
     * Get Resources
     * Documentation - https://highlevel.stoplight.io/docs/integrations/146912d6a9c38-get-calendar-resource
     * @param resourceId
     * @param resourceType
     */
    async get(resourceId: string, resourceType: "equipments" | "rooms") {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/calendars/resources/${resourceType}/${resourceId}`, { headers });
        return response.data as ICalendarResource;
    }


    /**
     * Create Resource
     * Documentation - https://highlevel.stoplight.io/docs/integrations/cad3af068e0e0-create-calendar-resource
     * @param resourceId
     * @param resourceType
     * @param body
     * @returns 
     */
    async add(resourceType: "equipments" | "rooms", body: ICalendarResource) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/calendars/resources/${resourceType}`, body, { headers });
        return response.data.note as ICalendarResource;
    }


    /**
     * Update Resource
     * Documentation - https://highlevel.stoplight.io/docs/integrations/20987bed71eb0-update-calendar-resource
     * @param resourceId
     * @param resourceType
     * @param body
     * @returns 
     */
    async update(resourceId: string, resourceType: "equipments" | "rooms", body: ICalendarResource) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/calendars/resources/${resourceType}/${resourceId}`, body, { headers });
        return response.data.note as ICalendarResource;
    }

    /**
     * Delete Resource
     * Documentation - https://highlevel.stoplight.io/docs/integrations/ca9afd52d4d0e-delete-calendar-resource
     * @param resourceId 
     * @param noteId
     * @returns 
     */
    async remove(resourceId: string, resourceType: "equipments" | "rooms") {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/calendars/resources/${resourceType}/${resourceId}`, { headers });
        return response.data.succeded as boolean;
    }
}