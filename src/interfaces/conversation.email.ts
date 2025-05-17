export interface IConversationEmail {
    id: string,
    conversationId: string,
    messageId: string,
    status: "scheduled" | "sent" | "cancelled",
    scheduledAt: string,
    subject: string,
    body: string,
    from: string,
    to: string[],
    cc?: string[],
    bcc?: string[],
    attachments?: string[]
}

export interface IConversationEmailResponse {
    email: IConversationEmail,
    traceId: string
}

export interface IConversationEmailCancelResponse {
    success: boolean,
    traceId: string
} 