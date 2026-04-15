import type {MembershipDuration, MembershipType} from "./MembershipTypes.ts";

export interface CreateMembershipRequest {
    customerId: number;
    type: MembershipType;
    duration: MembershipDuration;
    visitLimit?: number;
}