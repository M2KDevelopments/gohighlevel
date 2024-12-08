import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Gohighlevel } from "..";
import { ICourse } from "../interfaces/course";


export class Course {
    private authData?: AuthData;
    /**
     * Endpoints For Course
     * https://highlevel.stoplight.io/docs/integrations/ddc0780ee588c-memberships-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Import Courses
     * https://highlevel.stoplight.io/docs/integrations/7ca9bb420fe98-import-courses
     */
    async import(course: ICourse) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${Gohighlevel.BASEURL}/courses/courses-exporter/public/import`, course, { headers });
        return response.data;
    }

}




