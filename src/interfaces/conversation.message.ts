export interface IConversationMessage {
    id: string,
    conversationId: string,
    type: "SMS" | "Email" | "WhatsApp" | "GMB" | "IG" | "FB" | "Custom" | "WebChat" | "Live_Chat" | "Call",
    status: "scheduled" | "sent" | "delivered" | "read" | "failed" | "cancelled",
    direction: "inbound" | "outbound",
    scheduledAt?: string,
    sentAt?: string,
    deliveredAt?: string,
    readAt?: string,
    failedAt?: string,
    cancelledAt?: string,
    message: string,
    html?: string,
    subject?: string,
    from?: string,
    to?: string[],
    cc?: string[],
    bcc?: string[],
    attachments?: string[],
    call?: {
        to: string,
        from: string,
        status: "ending" | "completed" | "answered" | "busy" | "no-answer" | "failed" | "canceled" | "voicemail",
        duration?: number,
        recordingUrl?: string,
        transcription?: string
    }
}

export interface IConversationMessageResponse {
    message: IConversationMessage,
    traceId: string
}

export interface IConversationMessagesResponse {
    messages: IConversationMessage[],
    total: number,
    traceId: string
}

export interface ISendMessageRequest {
    type: "SMS" | "Email" | "WhatsApp" | "GMB" | "IG" | "FB" | "Custom" | "WebChat" | "Live_Chat" | "Call",
    message: string,
    scheduledAt?: string,
    html?: string,
    subject?: string,
    from?: string,
    to?: string[],
    cc?: string[],
    bcc?: string[],
    attachments?: string[]
}

export interface IOutboundCallRequest {
    to: string,
    from: string
}

export interface IUpdateMessageStatusRequest {
    status: "delivered" | "read" | "failed"
}

export interface IMessageStatusResponse {
    success: boolean,
    traceId: string
}

export interface IMessageRecordingResponse {
    recordingUrl: string,
    traceId: string
}

export interface IMessageTranscriptionResponse {
    transcription: string,
    traceId: string
} 