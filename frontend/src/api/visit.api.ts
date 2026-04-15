import api from "./api.ts";
import type {HistoryVisit} from "../types/visit/HistoryVisit.ts";
import type {ActiveVisit} from "../types/visit/ActiveVisit.ts";
import type {PageResponse} from "../types/api/PageResponse.ts";
import type {VisitSearchRequest} from "../types/visit/VisitSearchRequest.ts";
import type {FrontDeskCheckInResponse} from "../types/checkin/FrontDeskCheckInResponse.ts";

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
        .get(`${visitsUrl}/active?page=${page}&size=${size}`)
        .then(res => res.data);
}

export async function confirmCheckIn(customerId: number): Promise<void> {
    return await api.post(`${visitsUrl}/check-in`, { customerId })
        .then(res => res.data);
}

export async function scanCardForCheckIn(cardCode: string): Promise<FrontDeskCheckInResponse> {
    return await api.get(`/check-in/scan/${cardCode}`)
        .then(res => res.data);   
}

export async function scanEmailForCheckIn(email: string): Promise<FrontDeskCheckInResponse> {
    return await api.get(`/check-in/email/${email}`)
        .then(res => res.data);
}

export async function checkOut(visitId: number): Promise<void> {
    return await api.post(`${visitsUrl}/${visitId}/check-out`)
        .then(res => res.data);
}