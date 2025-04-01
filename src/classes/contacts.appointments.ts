import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";
import { IAppointment } from "../interfaces/appointment";

export class Appointment {
    private authData?: AuthData;

    /**
     * Endpoints For Appointments
     * https://highlevel.stoplight.io/docs/integrations/6015cf49a7ae8-get-appointments-for-contact
     * https://public-api.gohighlevel.com/#dbf523a3-c344-44cc-adf7-34b68c40dc81
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * Get appointments for contact. For both GHL App and API
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6015cf49a7ae8-get-appointments-for-contact
     * Documentation - https://public-api.gohighlevel.com/#af42b0d8-f002-4d09-a1a9-f860d653127f
     */
    async get(contactId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/contacts/${contactId}/appointments/`, { headers });
        const events: Array<IAppointment> = response.data.events;
        return events;
    }
}