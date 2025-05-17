import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { IConversationEmailResponse, IConversationEmailCancelResponse } from "../interfaces/conversation.email";

export class ConversationsEmail {
    private authData?: AuthData;

    /**
     * Endpoints For Conversations Email
     * https://highlevel.stoplight.io/docs/integrations/9b36d7004312c-get-email-by-id
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get Email by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/9b36d7004312c-get-email-by-id
     * @param emailId 
     * @returns 
     */
    async get(emailId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/conversations/emails/${emailId}`, { headers });
        return response.data as IConversationEmailResponse;
    }

    /**
     * Cancel a Scheduled Email Message
     * Documentation - https://highlevel.stoplight.io/docs/integrations/de6b358b5db79-cancel-a-scheduled-email-message
     * @param emailId 
     * @returns 
     */
    async cancel(emailId: string) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/conversations/emails/${emailId}/cancel`, {}, { headers });
        return response.data as IConversationEmailCancelResponse;
    }
}