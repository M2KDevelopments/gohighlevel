import axios from "axios";
import { Gohighlevel } from "..";
import { AuthData } from "../interfaces/auth/authdata";
import { ISubmission } from "../interfaces/submission";
import { IForm } from "../interfaces/form";

export class Form {
    private authData?: AuthData;

    /**
     * Endpoints For Forms
     * https://highlevel.stoplight.io/docs/integrations/0af2368376eb2-forms-api
     */
    constructor(authToken?: AuthData) {
        this.authData = authToken;
    }


    /**
     * Get Forms
     * https://highlevel.stoplight.io/docs/integrations/49e29c1716c61-get-forms
     * @param locationId
     */
    async getAll(locationId: string, skip: number = 0, limit = 20, type = "") {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/forms?locationId=${locationId}&limit=${limit}&skip=${skip}${type ? `&type=${type}` : ""}`, { headers });
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
        const response = await axios.get(`${Gohighlevel.BASEURL}/forms?locationId=${locationId}&limit=${limit}&page=${page}&skip=${skip}${type ? `&type=${type}` : ""}${startAt ? `&startAt=${startAt}` : ""}${endAt ? `&endAt=${endAt}` : ""}${search ? `&q=${search}` : ""}`, { headers });
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