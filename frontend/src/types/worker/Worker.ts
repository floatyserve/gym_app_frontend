export interface DetailedWorkerInfo {
    id: number;
    email: string;
    role: string;
    active: boolean;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
    hiredAt: string;
    userId: number;
}

export interface SimpleWorkerInfo {
    id: number;
    fullName: string;
    email: string;
    role: string;
}