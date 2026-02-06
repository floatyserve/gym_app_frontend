import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/client";
import type {User} from "../types/user/User.ts";
import {getById} from "../api/user.api.ts";
import {login as apiLogin} from "../api/auth.api.ts";

interface JwtPayload {
    sub: string; // user id as string
    pwd_changed: boolean;
    exp: number;
    iat: number;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("auth_token");
            if (token) {
                try {
                    const decoded = jwtDecode<JwtPayload>(token);
                    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    const user = await getById(Number(decoded.sub));
                    setUser(user);
                } catch {
                    localStorage.removeItem("auth_token");
                    setUser(null);
                }
            }
            setLoading(false);
        }

        fetchUser();
    }, []);

    async function login(email: string, password: string) {
        const res = await apiLogin({email, password});
        const token = res.token;

        localStorage.setItem("auth_token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const decoded = jwtDecode<JwtPayload>(token);

        setUser(await getById(Number(decoded.sub)));
    }

    function logout() {
        localStorage.removeItem("auth_token");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
