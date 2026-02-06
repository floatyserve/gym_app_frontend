import api from "./client.ts";
import type {Worker} from "../types/worker/Worker.ts";

const baseURL = "/workers"

export async function getByUserId(userId: number): Promise<Worker> {
    return await api.get(`${baseURL}/by-user-id/${userId}`)
        .then(res => res.data);
}