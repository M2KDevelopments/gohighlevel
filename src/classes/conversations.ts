import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";

interface IConversation {
    id: string,
    locationId: string,
    dateAdded: number,
    dateUpdated: number,
    lastMessageDate: number,
    unreadCount: number,
    followers: [],
    contactId: string,
    fullName: string,
    contactName: string,
    email: string,
    tags: string[],
    type: string,
    scoring: [],
    lastMessageType: string,
    sort: number[]
}
interface ISearchConversationParams {
    locationId: string,
    contactId?: string,
}
interface ISearchConversation {
    conversation: Array<IConversation>,
    total: number,
    traceId: string
}
interface IConversateMessages {
    messages: {
        lastMessageId?: string,
        nextPage: boolean,
        messages: Array<any>
    },

    traceId: string
}

/**
 * https://highlevel.stoplight.io/docs/integrations/3c9036411fcc3-add-an-inbound-message
 */
interface InboundMessage {
    type: "SMS" | "Email" | "WhatsApp" | "GMB" | "IG" | "FB" | "Custom" | "WebChat" | "Live_Chat" | "Call",

    /** Array of urls */
    attachments?: string[],
    message: string,
    conversationId: string,

    /** Conversation Providers are created in the GHL Market Place you can find the IDS there */
    conversationProviderId: string,
    direction: "inbound" | "outbound",

    /** Date format e.g 2024-11-20T14:15:22Z*/
    date: string,

    html?: string,
    subject?: string,
    emailFrom?: string,
    emailTo?: string,
    emailCc?: string[],
    emailBcc?: string[],
    emailMessageId?: string,
    call: {
        to: string,
        from: string,
        status: "ending" | "completed" | "answered" | "busy" | "no-answer" | "failed" | "canceled" | "voicemail"

    }
}
interface InboundSuccess {
    success: boolean,
    conversationId: string,
    messageId: string,
    traceId: string
}

export class Conversations {
    private authData?: AuthData;


    /**
     * Endpoints For Conversations
     * https://highlevel.stoplight.io/docs/integrations/7fd1120fbd540-conversations-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    getAll() {

    }

    get(conversationId: string) {

    }


    async search(params: ISearchConversationParams) {
        const access_token = this.authData?.access_token;
        const headers = {
            "Version": "2021-04-15",
            "Authorization": "Bearer " + access_token,
            "Accept": 'application/json'
        }
        const response = await axios.get(`https://services.leadconnectorhq.com/conversations/search?locationId=${params.locationId}&contactId=${params.contactId}`, { headers });
        const c: ISearchConversation = response.data;
        return c;
    }

    async getMessages(conversationId: string) {
        const access_token = this.authData?.access_token;
        const headers = {
            "Version": "2021-04-15",
            "Authorization": "Bearer " + access_token,
            "Accept": 'application/json'
        }
        const response = await axios.get(`https://services.leadconnectorhq.com/conversations/${conversationId}/messages`, { headers });
        const c: IConversateMessages = response.data;
        return c;
    }


    async addInboundMessage(props: InboundMessage) {
        const access_token = this.authData?.access_token;
        const headers = {
            "Version": "2021-04-15",
            "Authorization": "Bearer " + access_token,
            "Accept": 'application/json'
        }
        const response = await axios.post(`https://services.leadconnectorhq.com/conversations/messages/inbound`, props, { headers });
        const c: InboundSuccess = response.data;
        return c;
    }


    async create() {

    }

    update() {

    }

    remove() {

    }
}