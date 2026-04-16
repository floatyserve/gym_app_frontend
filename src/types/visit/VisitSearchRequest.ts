export interface VisitSearchRequest {
    customerEmail?: string;
    receptionistEmail?: string;
    active?: boolean;
    checkedInAfter?: string;
    checkedInBefore?: string;
    checkedOutAfter?: string;
    checkedOutBefore?: string;
    lockerNumber?: number;
    page: number;
    size: number;
}