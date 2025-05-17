import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { ISurvey } from "../interfaces/survey";
import { ISubmission } from "../interfaces/submission";

export class Survey {
    private authData?: AuthData;

    /**
     * Endpoints For Surveys
     * https://highlevel.stoplight.io/docs/integrations/3c7cf6a44f362-workflows-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }


    /**
     * Get Surveys
     * https://highlevel.stoplight.io/docs/integrations/1e9fdbe3f2013-get-surveys
     * @param locationId
     */
    async getAll(locationId: string, skip: number = 0, limit = 20, type = "") {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/surveys?locationId=${locationId}&limit=${limit}&skip=${skip}${type ? `&type=${type}` : ""}`, { headers });
        return response.data as {
            surveys: ISurvey[],
            total: number,
        };
    }

    /**
    * Get Survey Submissions
    * https://highlevel.stoplight.io/docs/integrations/288c25c7e319a-get-surveys-submissions
    * @param locationId
    */
    async getSubmissions(locationId: string, skip: number = 0, limit = 20, page = 1, search = "", type = "", startAt = "", endAt = "") {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/surveys?locationId=${locationId}&limit=${limit}&page=${page}&skip=${skip}${type ? `&type=${type}` : ""}${startAt ? `&startAt=${startAt}` : ""}${endAt ? `&endAt=${endAt}` : ""}${search ? `&q=${search}` : ""}`, { headers });
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