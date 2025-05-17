import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IEmailVerificationResponse,
    IEmailVerificationParams 
} from "../interfaces/email";

export class Email {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Verify Email
     * Documentation - https://highlevel.stoplight.io/docs/integrations/47a095a7cf1af-email-verification
     * @param params 
     * @returns 
     */
    async verify(params: IEmailVerificationParams) {
        const headers = this.authData?.headers;
        const response = await axios.post(
            `${this.authData?.baseurl}/emails/verify`,
            params,
            { headers }
        );
        return response.data as IEmailVerificationResponse;
    }
}
