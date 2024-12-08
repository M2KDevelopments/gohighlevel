import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";

export class Workflow {
    private authData?: AuthData;

    /**
     * Endpoints For Contacts Workflow
     * https://highlevel.stoplight.io/docs/integrations/fe0f421553a9e-add-contact-to-workflow
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Add Contact to Workflow
     * Documentation: https://highlevel.stoplight.io/docs/integrations/fe0f421553a9e-add-contact-to-workflow
     * @param contactId 
     * @param workflowId 
     * @param eventStartTime - e.g 2021-06-23T03:30:00+01:00
     * @returns 
     */
    async add(contactId: string, workflowId: string, eventStartTime: string) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${Gohighlevel.BASEURL}/contacts/${contactId}/workflow/${workflowId}`, { eventStartTime }, { headers });
        return response.data.succeded as boolean;
    }


    /**
     * Delete Contact from Workflow
     * Documentation: https://highlevel.stoplight.io/docs/integrations/86cd9978f66ff-delete-contact-to-workflow
     * @param contactId 
     * @param workflowId 
     * @returns 
     */
    async remove(contactId: string, workflowId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${Gohighlevel.BASEURL}/contacts/${contactId}/workflow/${workflowId}`, { headers });
        return response.data.succeded as boolean;
    }
}