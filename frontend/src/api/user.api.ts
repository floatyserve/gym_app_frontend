import api from "./api.ts";
import type {User} from "../types/user/User.ts";

const baseURL = "/users"

export async function getById(id: number): Promise<User> {
   return await api.get(`${baseURL}/${id}`)
       .then(res => res.data);
}

export async function deactivateUser(id: number): Promise<void> {
    await api.post(`${baseURL}/${id}/deactivate`);
}

export async function activateUser(id: number): Promise<void> {
    await api.post(`${baseURL}/${id}/activate`);
}
