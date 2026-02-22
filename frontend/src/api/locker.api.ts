import api from "./api.ts";
import type {Locker} from "../types/locker/Locker.ts";
import type {LockerStats} from "../types/locker/LockerStats.ts";
import type {PageResponse} from "../types/api/PageResponse.ts";
import type {LockerSearchRequest} from "../types/locker/LockerSearchRequest.ts";
import type {CreateLockerRequest} from "../types/locker/CreateLockerRequest.ts";

const baseURL = "/lockers"

export async function searchLockers(
    params: LockerSearchRequest
): Promise<PageResponse<Locker>> {
    return await api.get(baseURL, {params})
        .then(res => res.data);
}

export async function getStats(): Promise<LockerStats> {
    return await api.get(`${baseURL}/stats`)
        .then(res => res.data);
}

export async function createLocker(
    request: CreateLockerRequest
): Promise<Locker> {
    return await api.post(baseURL, request)
        .then(res => res.data);
}

export async function markLockerOutOfOrder(lockerId: number): Promise<Locker> {
    return await api.post(`${baseURL}/${lockerId}/out-of-order`)
        .then(res => res.data);
}

export async function markLockerAvailable(lockerId: number): Promise<Locker> {
    return await api.post(`${baseURL}/${lockerId}/restore`)
        .then(res => res.data);
}

export async function reassignLockerToVisitAutomatically(visitId: number): Promise<Locker> {
    return await api.post(`/visits/${visitId}${baseURL}/reassign`)
        .then(res => res.data);
}

export async function reassignLockerToVisitManually(
    visitId: number,
    newLockerNumber: number
): Promise<Locker> {
    return api
        .post(`/visits/${visitId}${baseURL}/reassign/${newLockerNumber}`)
        .then(res => res.data);
}


