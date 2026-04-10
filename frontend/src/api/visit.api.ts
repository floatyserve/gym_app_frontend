import api from "./api.ts";
import type {HistoryVisit} from "../types/visit/HistoryVisit.ts";
import type {ActiveVisit} from "../types/visit/ActiveVisit.ts";
import type {PageResponse} from "../types/api/PageResponse.ts";
import type {CheckInByAccessCardRequest, CheckInByCustomerEmailRequest} from "../types/visit/CheckInRequest.ts";
import type {VisitSearchRequest} from "../types/visit/VisitSearchRequest.ts";

const visitsUrl = "/visits";

export async function searchVisits(
    params: VisitSearchRequest
): Promise<PageResponse<HistoryVisit>> {
    return await api
        .get(`${visitsUrl}`, {params})
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

export async function checkInByAccessCard(body: CheckInByAccessCardRequest): Promise<void> {
    return await api.post(`/visits/check-in`, body)
        .then(res => res.data);
}

export async function checkInByCustomerEmail(body: CheckInByCustomerEmailRequest): Promise<void> {
    return await api.post(`${visitsUrl}/check-in/by-email`, body)
        .then(res => res.data);
}

export async function checkOut(visitId: number): Promise<void> {
    return await api.post(`${visitsUrl}/${visitId}/check-out`)
        .then(res => res.data);
}