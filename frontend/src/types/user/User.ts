export interface User {
    id: number;
    email: string;
    role: string;
    active: boolean;
    passwordChanged: boolean;
}

export interface PendingUser {
    id: number;
    passwordChanged: boolean;
}
