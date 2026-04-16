import type {
    MembershipDuration,
    MembershipStatus,
    MembershipType,
} from "./MembershipTypes.ts";

export interface Membership {
    id: number;
    customerFullName: string;
    type: MembershipType;
    duration: MembershipDuration;
    visitLimit: number;
    status: MembershipStatus;
    startsAt: string;
    endsAt: string;
}

export interface ActiveMembership {
    id: number;
    customerFullName: string;
    customerEmail: string;
    type: MembershipType;
    duration: MembershipDuration;
    visitLimit: number;
    remainingVisits: number;
    status: MembershipStatus;
    startsAt: string;
    endsAt: string;
}

