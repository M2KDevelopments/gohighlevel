import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";
import { ICompany } from "../interfaces/company";


export class Company {
    private authData?: AuthData;

    /**
     * Endpoints For Campaigns
     * https://highlevel.stoplight.io/docs/integrations/ba0a4912b7899-companies-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get company by id
     * Documentation - https://highlevel.stoplight.io/docs/integrations/cc7b8a7892119-get-company
     */
    async get(companyId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/companies/${companyId}`, { headers });
        const company: Array<ICompany> = response.data.company;
        return company;
    }

}




