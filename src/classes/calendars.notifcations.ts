import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ICalendarNotification } from "../interfaces/calendar.notification";

export class CalendarNotification {
    private authData?: AuthData;

    /**
     * Endpoints For Calendar Notificationss
     * https://highlevel.stoplight.io/docs/integrations/a83f44a3112a4-get-calendar-events
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * 
     * Documentation - https://highlevel.stoplight.io/docs/integrations/8a5a55426e404-get-notifications
     * @param calendarId 
     */
    async getAll(calendarId: string, extra?: { altId?: string, altType: "calendar" | string, deleted?: boolean, isActive?: boolean, limit?: number, skip?: number }) {
        const headers = this.authData?.headers;
        let query = '';
        if(extra){
            if(extra.altId) query =`altId=${extra.altId}&`;
            if(extra.altType) query =`altType=${extra.altType}&`
            if(extra.deleted) query =`deleted=${extra.deleted}&`
            if(extra.isActive) query =`isActive=${extra.isActive}&`
            if(extra.limit) query =`limit=${extra.limit}&`
            if(extra.skip) query =`skip=${extra.skip}&`
        }
        const response = await axios.get(`${this.authData?.baseurl}/calendars/${calendarId}/notifications?${query}`, { headers });
        return response.data as ICalendarNotification[];
    }



    /**
     * Get Calendar Notifications by calendar id
     * Documentation - https://highlevel.stoplight.io/docs/integrations/3a295c24b3d40-get-notification
     * @param calendarId 
     * @param notificationId
     * @returns 
     */
    async get(calendarId: string, notificationId:string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/calendars/${calendarId}/notifications/${notificationId}`, { headers });
        return response.data as ICalendarNotification;
    }


    /**
     * Create Calendar Notifications
     * Documentation - https://highlevel.stoplight.io/docs/integrations/fbf84496c5327-create-notification
     * @param calendarId 
     * @param notifications 
     * @returns 
     */
    async add(calendarId: string, notifications: Array<ICalendarNotification>) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/calendars/${calendarId}/notifications/`, notifications, { headers });
        return response.data as ICalendarNotification[];
    }


    /**
     * Update Calendar Notifications
     * Documentation - https://highlevel.stoplight.io/docs/integrations/ab6b01fe746d2-update-notification
     * @param calendarId 
     * @param notificationId
     * @param notifcation 
     * @returns 
     */
    async update(calendarId: string, notificationId:string, notifcation: ICalendarNotification) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/calendars/${calendarId}/notifications/${notificationId}`, notifcation, { headers });
        return response.data.calendar as ICalendarNotification;
    }

    /**
     * Delete Calendar Notifications
     * Documentation - https://highlevel.stoplight.io/docs/integrations/3287e5de5babf-delete-a-calendar-notification
     * @param calendarId 
     * @param notificationId
     * @returns 
     */
    async remove(calendarId: string, notificationId:string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/calendars/${calendarId}/notifications/${notificationId}`, { headers });
        return response.data.message as string;
    }
}