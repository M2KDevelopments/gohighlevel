import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";
import { IAppointment } from "../interfaces/appointment";

export class Appointment {
    private authData?: AuthData;

    /**
     * Endpoints For Appointments
     * https://highlevel.stoplight.io/docs/integrations/6015cf49a7ae8-get-appointments-for-contact
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * Get appointments for contact
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6015cf49a7ae8-get-appointments-for-contact
     */
    async get(contactId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/contacts/${contactId}/appointments/`, { headers });
        const events: Array<IAppointment> = response.data.events;
        return events;
    }
}