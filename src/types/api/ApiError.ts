export type ApiError = {
    code: string;
    message?: string;
    context?: Record<string, unknown>;
};