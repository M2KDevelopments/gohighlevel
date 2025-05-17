import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";

export class ConversationsProviders {
    private authData?: AuthData;

    /**
     * Endpoints For Conversations Agent/Ai-Bot is typing a message indicator for live chat

     * https://highlevel.stoplight.io/docs/integrations/5ec7feb2ce5e8-agent-ai-bot-is-typing-a-message-indicator-for-live-chat
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Agent/Ai-Bot is typing a message indicator for live chat
     * Documentation - https://highlevel.stoplight.io/docs/integrations/5ec7feb2ce5e8-agent-ai-bot-is-typing-a-message-indicator-for-live-chat
     * @param locationId 
     * @param isTyping 
     * @param visitorId 
     * @param conversationId 
     * @returns 
     */
    async indicateAITyping(locationId:string, isTyping:string, visitorId:string, conversationId:string) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/conversations/providers/live-chat/typing`, { locationId, isTyping, visitorId, conversationId }, { headers });
        return response.data.success as boolean;
    }

}