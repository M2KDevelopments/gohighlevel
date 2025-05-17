import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    IConversationMessageResponse, 
    IConversationMessagesResponse, 
    ISendMessageRequest, 
    IOutboundCallRequest,
    IUpdateMessageStatusRequest,
    IMessageStatusResponse,
    IMessageRecordingResponse,
    IMessageTranscriptionResponse
} from "../interfaces/conversation.message";

export class ConversationsMessage {
    private authData?: AuthData;

    /**
     * Endpoints For Conversation Messages
     * https://highlevel.stoplight.io/docs/integrations/a503551cadede-get-message-by-message-id
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get Message by Message ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/a503551cadede-get-message-by-message-id
     * @param messageId 
     * @returns 
     */
    async get(messageId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/conversations/messages/${messageId}`, { headers });
        return response.data as IConversationMessageResponse;
    }

    /**
     * Get Messages by Conversation ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/ab21134dad173-get-messages-by-conversation-id
     * @param conversationId 
     * @returns 
     */
    async getByConversation(conversationId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/conversations/${conversationId}/messages`, { headers });
        return response.data as IConversationMessagesResponse;
    }

    /**
     * Send a New Message
     * Documentation - https://highlevel.stoplight.io/docs/integrations/5853cb0a54971-send-a-new-message
     * @param conversationId 
     * @param message 
     * @returns 
     */
    async send(conversationId: string, message: ISendMessageRequest) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/conversations/${conversationId}/messages`, message, { headers });
        return response.data as IConversationMessageResponse;
    }

    /**
     * Add an Inbound Message
     * Documentation - https://highlevel.stoplight.io/docs/integrations/3c9036411fcc3-add-an-inbound-message
     * @param conversationId 
     * @param message 
     * @returns 
     */
    async addInbound(conversationId: string, message: ISendMessageRequest) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/conversations/messages/inbound`, {
            ...message,
            conversationId,
            direction: "inbound"
        }, { headers });
        return response.data as IConversationMessageResponse;
    }

    /**
     * Add an External Outbound Call
     * Documentation - https://highlevel.stoplight.io/docs/integrations/d032812b4e850-add-an-external-outbound-call
     * @param conversationId 
     * @param call 
     * @returns 
     */
    async addOutboundCall(conversationId: string, call: IOutboundCallRequest) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/conversations/${conversationId}/calls/outbound`, call, { headers });
        return response.data as IConversationMessageResponse;
    }

    /**
     * Cancel a Scheduled Message
     * Documentation - https://highlevel.stoplight.io/docs/integrations/f7e0bc96bf0a4-cancel-a-scheduled-message
     * @param messageId 
     * @returns 
     */
    async cancel(messageId: string) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/conversations/messages/${messageId}/cancel`, {}, { headers });
        return response.data as IMessageStatusResponse;
    }

    /**
     * Update Message Status
     * Documentation - https://highlevel.stoplight.io/docs/integrations/4518573836035-update-message-status
     * @param messageId 
     * @param status 
     * @returns 
     */
    async updateStatus(messageId: string, status: IUpdateMessageStatusRequest) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${this.authData?.baseurl}/conversations/messages/${messageId}/status`, status, { headers });
        return response.data as IMessageStatusResponse;
    }

    /**
     * Get Recording by Message ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/72f801089fbac-get-recording-by-message-id
     * @param messageId 
     * @returns 
     */
    async getRecording(messageId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/conversations/messages/${messageId}/recording`, { headers });
        return response.data as IMessageRecordingResponse;
    }

    /**
     * Get Transcription by Message ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/9f8e2c1696a55-get-transcription-by-message-id
     * @param messageId 
     * @returns 
     */
    async getTranscription(messageId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/conversations/messages/${messageId}/transcription`, { headers });
        return response.data as IMessageTranscriptionResponse;
    }
}