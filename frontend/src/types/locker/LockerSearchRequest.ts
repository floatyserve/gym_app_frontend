export interface LockerSearchRequest {
    number?: number;
    status?: string;
    occupied?: boolean;
    page: number;
    size: number;
}