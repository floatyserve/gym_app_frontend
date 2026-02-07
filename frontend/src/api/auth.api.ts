import api from "./api.ts";
import type {LoginRequest} from "../types/auth/LoginRequest.ts";
import type {LoginResponse} from "../types/auth/LoginResponse.ts";

export async function login(req: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post("/auth/login", req);
    return data;
}
