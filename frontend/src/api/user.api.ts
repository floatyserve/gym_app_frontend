import api from "./client.ts";
import type {User} from "../types/User.ts";

const baseURL = "/users"

export async function getById(id: number): Promise<User> {
   return await api.get<User>(`${baseURL}/${id}`)
       .then(res => res.data);
}
