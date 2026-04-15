import type {MembershipDuration, MembershipStatus, MembershipType} from "../membership/MembershipTypes.ts";

export interface FrontDeskCheckInResponse {
    customerId: number;
    fullName: string;
    email: string;
    activeCardCode: string;

    membershipType: MembershipType | null;
    membershipStatus: MembershipStatus | null;
    membershipDuration: MembershipDuration | null;
    visitLimit: number | null;
    remainingVisits: number | null;
    startsAt: string | null;
    endsAt: string | null;
}