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


export class Conversations {
    private authData?: AuthData;


    /**
     * Endpoints For Conversations
     * https://highlevel.stoplight.io/docs/integrations/7fd1120fbd540-conversations-api
     */
    constructor(authToken?: AuthData) {
        this.authData = authToken;
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


    async create() {

    }

    update() {

    }

    remove() {

    }
}