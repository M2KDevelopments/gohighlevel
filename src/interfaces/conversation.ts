
export interface IConversation {
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

export interface ISearchConversationParams {
    locationId: string,
    contactId?: string,
}
export interface ISearchConversation {
    conversation: Array<IConversation>,
    total: number,
    traceId: string
}

export interface IConversateMessages {
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
export interface InboundMessage {
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
export interface InboundSuccess {
    success: boolean,
    conversationId: string,
    messageId: string,
    traceId: string
}
