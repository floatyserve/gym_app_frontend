import api from "./client.ts";
import type {Locker} from "../types/locker/Locker.ts";
import type {LockerStats} from "../types/locker/LockerStats.ts";
import type {PageResponse} from "../types/page/PageResponse.ts";

const baseURL = "/lockers"

export async function getAll(): Promise<PageResponse<Locker>> {
    return await api.get(baseURL)
        .then(res => res.data);
}

export async function getStats(): Promise<LockerStats> {
    return await api.get(`${baseURL}/stats`)
        .then(res => res.data);
}

