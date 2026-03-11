export interface CustomerSearchRequest {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    cardCode?: string;
    page: number;
    size: number;
}