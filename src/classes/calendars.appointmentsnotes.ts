import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ICalendarEventAppointmentNote } from "../interfaces/calendar.appointmentnote";

export class CalendarAppointmentNote {
    private authData?: AuthData;

    /**
     * Endpoints For Calendars Appointments Notes
     * https://highlevel.stoplight.io/docs/integrations/e04d0822bd613-get-notes
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * Get Appointment Notes
     * Documentation - https://highlevel.stoplight.io/docs/integrations/e04d0822bd613-get-notes
     * @param appointmentId
     * @param limit
     * @param offset
     */
    async getAll(appointmentId: string, limit: number, offset: number) {
        if (!limit || isNaN(limit) || limit < 0) return []
        if (!offset || isNaN(offset) || offset < 0) return []
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/calendars/appointments/${appointmentId}/notes?limit=${limit}&offset=${offset}`, { headers });
        return response.data.notes as ICalendarEventAppointmentNote[];
    }


    /**
     * Create Appointment Note
     * Documentation - https://highlevel.stoplight.io/docs/integrations/dcdda866d8b49-create-note
     * @param appointmentId 
     * @param body - Note body (<= 5000 characters)
     * @param userId 
     * @returns 
     */
    async add(appointmentId: string, body: string, userId?: string) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/appointments/${appointmentId}/notes`, { body, userId }, { headers });
        return response.data.note as ICalendarEventAppointmentNote;
    }


    /**
     * Update Appointment Note
     * Documentation - https://highlevel.stoplight.io/docs/integrations/f27408b1ae367-update-note
     * @param appointmentId 
     * @param noteId
     * @param body - Note body (<= 5000 characters)
     * @param userId 
     * @returns 
     */
    async update(appointmentId: string, noteId: string, body: string, userId?: string) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/appointments/${appointmentId}/notes/${noteId}`, { body, userId }, { headers });
        return response.data.note as ICalendarEventAppointmentNote;
    }

    /**
     * Delete Appointment Note
     * Documentation - https://highlevel.stoplight.io/docs/integrations/fe10a2bff1674-delete-note
     * @param appointmentId 
     * @param noteId
     * @returns 
     */
    async remove(appointmentId: string, noteId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/appointments/${appointmentId}/notes/${noteId}`, { headers });
        return response.data.succeded as boolean;
    }
}