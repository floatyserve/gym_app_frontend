import api from "./api.ts";
import type {DetailedWorkerInfo, SimpleWorkerInfo} from "../types/worker/Worker.ts";
import type {OnboardWorkerRequest} from "../types/worker/OnboardWorkerRequest.ts";
import type {PageResponse} from "../types/api/PageResponse.ts";

const baseURL = "/workers"

export async function getSelf(): Promise<DetailedWorkerInfo> {
    return await api.get(`${baseURL}/me`)
        .then(res => res.data);
}

export async function getAllWorkers(
    page: number, pageSize: number
): Promise<PageResponse<SimpleWorkerInfo>> {
    return await api.get(baseURL, {params: {page, size: pageSize}})
        .then(res => res.data);
}

export async function onboardWorker(request: OnboardWorkerRequest): Promise<SimpleWorkerInfo> {
    return await api.post(`${baseURL}`, request)
        .then(res => res.data);
}