import axios from "axios";
import { Gohighlevel } from "..";
import { AuthData } from "../interfaces/auth/authdata";
import { IWorkflow } from "../interfaces/workflow";

export class Workflow {
    private authData?: AuthData;

    /**
     * Endpoints For Workflow
     * https://highlevel.stoplight.io/docs/integrations/3c7cf6a44f362-workflows-api
     */
    constructor(authToken?: AuthData) {
        this.authData = authToken;
    }


    /**
     * Get Workflow
     * https://highlevel.stoplight.io/docs/integrations/070d2f9be5549-get-workflow
     * @param locationId
     */
    async getAll(locationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/workflows?locationId=${locationId}`, { headers });
        return response.data.workflows as IWorkflow[];
    }
}