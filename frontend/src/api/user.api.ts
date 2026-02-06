import api from "./client.ts";
import type {User} from "../types/user/User.ts";

const baseURL = "/users"

export async function getById(id: number): Promise<User> {
   return await api.get(`${baseURL}/${id}`)
       .then(res => res.data);
}
