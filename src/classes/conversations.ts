import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { IConversation, IConversateMessages, InboundMessage, InboundSuccess, ISearchConversation, ISearchConversationParams } from "../interfaces/conversation";
import { ConversationsEmail } from "./conversations.email";
import { ConversationsMessage } from "./conversations.messages";
import { ConversationsProviders } from "./conversations.providers";

export class Conversations {
    private authData?: AuthData;
    public email: ConversationsEmail;
    public messages: ConversationsMessage;
    public providers: ConversationsProviders;

    /**
     * Endpoints For Conversations
     * https://highlevel.stoplight.io/docs/integrations/7fd1120fbd540-conversations-api
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
        this.email = new ConversationsEmail(authData);
        this.messages = new ConversationsMessage(authData);
        this.providers = new ConversationsProviders(authData);
    }

    /**
     * Get Conversation
     * Documentation - https://highlevel.stoplight.io/docs/integrations/d22efcfdb0c80-get-conversation
     * @param conversationId 
     * @returns 
     */
    async get(conversationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/conversations/${conversationId}`, { headers });
        return response.data as IConversation;
    }

    async search(params: ISearchConversationParams) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/conversations/search?locationId=${params.locationId}&contactId=${params.contactId}`, { headers });
        const c: ISearchConversation = response.data;
        return c;
    }

    /**
     * Create Conversation
     * Documentation - https://highlevel.stoplight.io/docs/integrations/8d0b19e09176e-create-conversation
     * @param locationId 
     * @param contactId 
     * @returns 
     */
    async create(locationId: string, contactId: string) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/conversations`, {
            locationId,
            contactId
        }, { headers });
        return response.data as IConversation;
    }

    /**
     * Update Conversation
     * Documentation - https://highlevel.stoplight.io/docs/integrations/f6c7d276afe8e-update-conversation
     * @param conversationId 
     * @param data 
     * @returns 
     */
    async update(conversationId: string, data: Partial<IConversation>) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/conversations/${conversationId}`, data, { headers });
        return response.data as IConversation;
    }

    /**
     * Delete Conversation
     * Documentation - https://highlevel.stoplight.io/docs/integrations/d6b698c33ff49-delete-conversation
     * @param conversationId 
     * @returns 
     */
    async remove(conversationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/conversations/${conversationId}`, { headers });
        return response.data;
    }
}