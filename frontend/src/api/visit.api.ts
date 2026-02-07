import api from "./api.ts";
import type {Visit} from "../types/visit/Visit.ts";
import type {ActiveVisit} from "../types/visit/ActiveVisit.ts";
import type {PageResponse} from "../types/page/PageResponse.ts";
import type {CheckInByAccessCardRequest, CheckInByCustomerEmailRequest} from "../types/visit/CheckInRequest.ts";

const visitsUrl = "/visits";
const customersUrl = "/customers";

export async function getAll(from: string, to: string): Promise<PageResponse<Visit>> {
    return await api.get(`${visitsUrl}/?from=${from}&to=${to}`)
        .then(res => res.data);
}

export async function getAllActive(
    page: number,
    size: number
): Promise<PageResponse<ActiveVisit>> {
    return api
        .get(`/visits/active?page=${page}&size=${size}`)
        .then(res => res.data);
}

export async function getAllVisitsForCustomer(customerId: number): Promise<PageResponse<Visit>> {
    return await api.get(`${customersUrl}/${customerId}/visits`)
        .then(res => res.data);
}

export async function getActiveVisitForCustomer(customerId: number): Promise<ActiveVisit> {
    return await api.get(`${customersUrl}/${customerId}/visits/active`)
        .then(res => res.data);
}

export async function checkInByAccessCard(body: CheckInByAccessCardRequest): Promise<Visit> {
    return await api.post(`/visits/check-in`, body)
        .then(res => res.data);
}

export async function checkInByCustomerEmail(body: CheckInByCustomerEmailRequest): Promise<Visit> {
    return await api.post(`${visitsUrl}/check-in/by-email`, body)
        .then(res => res.data);
}

export async function checkOut(visitId: number): Promise<Visit> {
    return await api.post(`${visitsUrl}/${visitId}/check-out`)
        .then(res => res.data);
}