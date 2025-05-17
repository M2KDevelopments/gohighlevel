export interface IEmailVerificationResponse {
    status: "valid" | "invalid" | "unknown";
    email: string;
    domain: string;
    isDisposable: boolean;
    isFreeEmail: boolean;
    isRoleEmail: boolean;
    traceId: string;
}

export interface IEmailVerificationParams {
    email: string;
} 