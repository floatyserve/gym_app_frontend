import api from "./api.ts";
import type {LoginRequest} from "../types/auth/LoginRequest.ts";
import type {LoginResponse} from "../types/auth/LoginResponse.ts";
import type {ChangePasswordRequest} from "../types/auth/ChangePasswordRequest.ts";

export async function login(req: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post("/auth/login", req);
    return data;
}

export async function changePassword(
    req: ChangePasswordRequest
): Promise<LoginResponse> {
    const { data } = await api.post("/auth/change-password", req);
    return data;
}
