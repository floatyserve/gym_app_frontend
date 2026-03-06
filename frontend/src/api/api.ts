import axios from "axios";
import type {ApiError} from "../types/api/ApiError.ts";
import {resolveErrorMessage} from "./errorResolver.ts";
import toast from "react-hot-toast";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        const data = error.response?.data as ApiError | undefined;

        if (error.response?.status === 401) {
            localStorage.removeItem("auth_token");
            window.location.replace("/login");
            return Promise.reject(error);
        }

        const message = data
            ? resolveErrorMessage(data)
            : "Network error. Please try again.";

        toast.error(message);

        return Promise.reject(error);
    }
);

export default api;
