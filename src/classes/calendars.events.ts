import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ICalendarEvent, ICalendarEventAppointment } from "../interfaces/calendar.event";

export class CalendarEvent {
    private authData?: AuthData;

    /**
     * Endpoints For Calendar Events and Appointments
     * https://highlevel.stoplight.io/docs/integrations/a83f44a3112a4-get-calendar-events
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * Get Calendar Events
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a83f44a3112a4-get-calendar-events
     * @param locationId 
     * @param startTime
     * @param endTime
     * @param extra
     */
    async getAll(locationId: String, startTime: string, endTime: string, extra?: { userId?: string, groupId?: string, calendarId?: string }) {
        const headers = this.authData?.headers;
        let query = ''
        if (extra) {
            if (extra.userId) query += `&userId=${extra.userId}`;
            if (extra.groupId) query += `&groupId=${extra.groupId}`;
            if (extra.calendarId) query += `&calendarId=${extra.calendarId}`;
        }
        const response = await axios.get(`${this.authData?.baseurl}/calendars/events?locationId=${locationId}&startTime=${startTime}&endTime=${endTime}${query}`, { headers });
        return response.data.events as ICalendarEvent[];
    }

    /**
     * Get Calendar Block Slots
     * Documentation - http://highlevel.stoplight.io/docs/integrations/e31320c70cfde-get-blocked-slots
     * @param locationId 
     * @param startTime
     * @param endTime
     * @param extra
     */
    async getBlockSlots(locationId: String, startTime: string, endTime: string, extra?: { userId?: string, groupId?: string, calendarId?: string }) {
        const headers = this.authData?.headers;
        let query = '';
        if (extra) {
            if (extra.userId) query += `&userId=${extra.userId}`;
            if (extra.groupId) query += `&groupId=${extra.groupId}`;
            if (extra.calendarId) query += `&calendarId=${extra.calendarId}`;
        }
        const response = await axios.get(`${this.authData?.baseurl}/calendars/blocked-slots?locationId=${locationId}&startTime=${startTime}&endTime=${endTime}${query}`, { headers });
        return response.data.events as ICalendarEvent[];
    }


    /**
     * Get Appointments
     * Documentation - https://highlevel.stoplight.io/docs/integrations/bc4114ff64e38-get-appointment
     * @param eventId - Event Id or Instance id. For recurring appointments send masterEventId to modify original series.
     * @returns 
     */
    async getAppointments(eventId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/calendars/events/appointments/${eventId}`, { headers });
        return response.data.event as ICalendarEvent;
    }


    /**
     * Create Appointment 
     * Documentation - http://highlevel.stoplight.io/docs/integrations/a192f863cad27-create-appointment
     * @param locationId
     * @param contactId
     * @param startTime
     * @param calendar 
     * @returns 
     */
    async addAppointment(locationId:string, contactId:string, startTime:string, calendar: ICalendarEventAppointment) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/calendars/events/appointments`, {locationId, contactId, ...calendar, startTime}, { headers });
        return response.data as ICalendarEventAppointment;
    }



    /**
     * Update Appointment
     * Documentation - https://highlevel.stoplight.io/docs/integrations/3a1380a3a9df8-update-appointment
     * @param eventId 
     * @param event 
     * @returns 
     */
    async updateAppointment(eventId: string, event: ICalendarEventAppointment) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/calendars/events/appointments/${eventId}`, event, { headers });
        return response.data as ICalendarEventAppointment;
    }


    /**
     * Update Block Slot - Update block slot by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/098186acbb8db-update-block-slot
     * @param eventId 
     * @param event 
     * @returns 
     */
    async updateBlockSlot(eventId: string, slot: { calendarId: string, startTime: string, endTime: string, title: string, assignedUserId: string }) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/calendars/events/block-slots/${eventId}`, slot, { headers });
        return response.data as { calendarId: string, startTime: string, endTime: string, title: string, assignedUserId: string };
    }


    /**
     * Delete Event
     * Documentation - https://highlevel.stoplight.io/docs/integrations/96b85108e6d3b-delete-event
     * @param eventId 
     * @returns 
     */
    async remove(eventId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/calendars/events/${eventId}`, { headers });
        return response.data.succeded as boolean;
    }
}