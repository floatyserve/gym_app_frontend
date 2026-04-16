import api from "./api.ts";
import type { PageResponse } from "../types/api/PageResponse.ts";
import type { Membership } from "../types/membership/Membership.ts";
import type { ActiveMembership } from "../types/membership/Membership.ts";
import type { CreateMembershipRequest } from "../types/membership/CreateMembershipRequest.ts";

const customersURL = "/customers";
const membershipsURL = "/memberships";

export async function getCustomerMemberships(
    customerId: number,
    page: number = 0,
    size: number = 10
): Promise<PageResponse<Membership>> {
    return await api.get(`${customersURL}/${customerId}${membershipsURL}`, {
        params: { page, size }
    }).then(res => res.data);
}

export async function getActiveMembership(customerId: number): Promise<ActiveMembership> {
    return await api.get(`${customersURL}/${customerId}${membershipsURL}/active`)
        .then(res => res.data);
}

export async function createMembership(request: CreateMembershipRequest): Promise<Membership> {
    return await api.post(`${membershipsURL}`, request)
        .then(res => res.data);
}

export async function cancelMembership(membershipId: number): Promise<void> {
    return await api.post(`${membershipsURL}/${membershipId}/cancel`)
        .then(res => res.data);
}