import api from "./api.ts"
import type {AccessCard} from "../types/access-card/AccessCard.ts";
import type {PageResponse} from "../types/api/PageResponse.ts";
import type {CreateAccessCardRequest} from "../types/access-card/CreateAccessCardRequest.ts";
import type {AssignAccessCardRequest} from "../types/access-card/AssignAccessCardRequest.ts";
import type {AccessCardSearchRequest} from "../types/access-card/AccessCardSearchRequest.ts";

const baseUrl = "/access-cards";
const assignmentsUrl = "/card-assignments";

export async function getByCode(cardCode: string): Promise<AccessCard> {
    return await api.get(`${baseUrl}/by-code`, {
        params: {
            cardCode: cardCode
        }
    }).then(res => res.data);
}

export async function searchAccessCards(
    params: AccessCardSearchRequest
): Promise<PageResponse<AccessCard>> {
    return api.get("/access-cards", { params })
        .then(res => res.data);
}

export async function getCardsByCustomerId(customerId: number): Promise<AccessCard[]> {
    return await api.get(`customers/${customerId}${baseUrl}`)
        .then(res => res.data);
}

export async function revokeCard(cardId: number): Promise<AccessCard> {
    return await api.post(`${baseUrl}/${cardId}/revoke`)
        .then(res => res.data);
}

export async function markCardAsLost(cardId: number): Promise<AccessCard> {
    return await api.post(`${baseUrl}/${cardId}/mark-lost`)
        .then(res => res.data);
}

export async function createAccessCard(request: CreateAccessCardRequest): Promise<AccessCard> {
    return await api.post(`${baseUrl}`, request)
        .then(res => res.data);
}

export async function assignCardToCustomer(request: AssignAccessCardRequest): Promise<AccessCard> {
    return await api.post(`${assignmentsUrl}/assign`, request)
        .then(res => res.data);
}

export async function createAssignCard(request: CreateAccessCardRequest): Promise<AccessCard> {
    return await api.post(`${baseUrl}`, request)
        .then(res => res.data);
}

export async function detachCardFromCustomer(cardCode: string): Promise<AccessCard> {
    return await api.post(`${assignmentsUrl}/detach`, null, {
        params: {
            cardCode: cardCode
        }
    }).then(res => res.data);
}

export async function replaceCardForCustomer(request: AssignAccessCardRequest): Promise<AccessCard> {
    return await api.post(`${assignmentsUrl}/replace`, request)
        .then(res => res.data);
}