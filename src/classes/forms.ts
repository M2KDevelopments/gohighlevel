import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ISubmission } from "../interfaces/submission";
import { IForm } from "../interfaces/form";

export class Form {
    private authData?: AuthData;

    /**
     * Endpoints For Forms
     * https://highlevel.stoplight.io/docs/integrations/0af2368376eb2-forms-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * Get Forms
     * https://highlevel.stoplight.io/docs/integrations/49e29c1716c61-get-forms
     * https://public-api.gohighlevel.com/#29a44f93-8ec3-464d-a2d2-a3bce3d70ffc
     * @param locationId
     */
    async getAll(locationId: string="", skip: number = 0, limit = 20, type = "") {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/forms?locationId=${locationId}&limit=${limit}&skip=${skip}${type ? `&type=${type}` : ""}`, { headers });
        return response.data as {
            forms: IForm[],
            total: number,
        };
    }

    

    /**
    * Get Form Submissions
    * https://highlevel.stoplight.io/docs/integrations/a6114bd7685d1-get-forms-submissions
    * @param locationId
    */
    async getSubmissions(locationId: string, skip: number = 0, limit = 20, page = 1, search = "", type = "", startAt = "", endAt = "") {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/forms?locationId=${locationId}&limit=${limit}&page=${page}&skip=${skip}${type ? `&type=${type}` : ""}${startAt ? `&startAt=${startAt}` : ""}${endAt ? `&endAt=${endAt}` : ""}${search ? `&q=${search}` : ""}`, { headers });
        return response.data as {
            submissions: ISubmission[],
            meta: {
                total: number,
                currentPage: number,
                nextPage: string | null,
                prevPage: string | null
            }
        };
    }
}