import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ICalendar } from "../interfaces/calendar";
import { CalendarAppointmentNote } from "./calendars.appointmentsnotes";
import { CalendarEvent } from "./calendars.events";
import { CalendarGroup } from "./calendars.groups";
import { CalendarNotification } from "./calendars.notifcations";
import { CalendarResource } from "./calendars.resources";

export class Calendar {
    private authData?: AuthData;
    public appointmentnotes: CalendarAppointmentNote;
    public events :CalendarEvent;
    public groups :CalendarGroup;
    public notifications: CalendarNotification;
    public resources: CalendarResource;

    /**
     * Endpoints For Calendars
     * https://highlevel.stoplight.io/docs/integrations/db572d519b209-get-all-tasks
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
        this.appointmentnotes = new CalendarAppointmentNote(this.authData);
        this.events = new CalendarEvent(this.authData);
        this.groups = new CalendarGroup(this.authData);
        this.notifications = new CalendarNotification(this.authData);
        this.resources = new CalendarResource(this.authData)
    }


    /**
     * 
     * Documentation - https://highlevel.stoplight.io/docs/integrations/e55dec1be7bee-get-calendars
     * @param locationId 
     */
    async getAll(locationId: string, showDrafted: boolean = true) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/calendars?locationId=${locationId}&showDrafted=${showDrafted}`, { headers });
        return response.data.calendars as ICalendar[];
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
        return response.data.calendar as ICalendar;
    }

    /**
    * Get Calendar Free Slots by calendar id
    * Documentation - https://highlevel.stoplight.io/docs/integrations/7f694ee8bd969-get-free-slots
    * @param calendarId 
    * @returns 
    */
    async getFreeslots(calendarId: string, startDate: number, endDate: number, timezone: string = "", userId: string = "userId") {
        const headers = this.authData?.headers;
        let query = ""
        if (timezone) query += `&timezone=${timezone}`
        if (userId) query += `&timezone=${userId}`
        const response = await axios.get(`${this.authData?.baseurl}/calendars/${calendarId}/free-slots?startDate=${startDate}&endDate=${endDate}${query}`, { headers });
        return response.data.calendar as ICalendar;
    }

    /**
     * Create Calendar
     * Documentation - https://highlevel.stoplight.io/docs/integrations/db6affea7570b-create-calendar
     * @param calendar 
     * @returns 
     */
    async add(calendar: ICalendar) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/calendars`, calendar, { headers });
        return response.data.calendar as ICalendar;
    }


    /**
     * Create Block Slot
     * Documentation - https://highlevel.stoplight.io/docs/integrations/5a52896a68879-create-block-slot
     * @param locationId
     * @param startTime
     * @param endTime
     * @param extra 
     * @returns 
     */
    async createBlockSlot(locationId: String, startTime: string, endTime: string, extra?: { calendarId?: string, title?: string, assignedUserId?: string }) {
        const headers = this.authData?.headers;
        const extradata = extra ? extra : {};
        const data = { locationId, startTime, endTime, ...extradata }
        const response = await axios.post(`${this.authData?.baseurl}/calendars/events/block-slots`, data, { headers });
        return response.data as { locationId: String, startTime: string, endTime: string, calendarId?: string, title?: string, assignedUserId?: string };
    }

    /**
     * Update Calendar
     * Documentation - https://highlevel.stoplight.io/docs/integrations/cf683b1696d31-update-calendar
     * @param calendarId 
     * @param calendar 
     * @returns 
     */
    async update(calendarId: string, calendar: ICalendar) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/calendars/${calendarId}`, calendar, { headers });
        return response.data.calendar as ICalendar;
    }

    /**
     * Delete Calendar
     * Documentation - https://highlevel.stoplight.io/docs/integrations/57177f7074647-delete-calendar
     * @param calendarId 
     * @returns 
     */
    async remove(calendarId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/calendars/${calendarId}`, { headers });
        return response.data.succeded as boolean;
    }
}