import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {type SessionUser, useAuth} from "../context/AuthContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AuthLayout } from "../layouts/AuthLayout";

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const sessionUser = await login(email, password);
            const destination = getDestination(sessionUser);

            if (destination) {
                navigate(destination);
            }
        } catch {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    }

    function getDestination(sessionUser: SessionUser | null): string | null {
        if (!sessionUser) return null;
        if (sessionUser && "passwordChanged" in sessionUser ) return "/change-password";
        return "/";
    }

    return (
        <AuthLayout
            title="Welcome"
            subtitle="Please sign in to your account"
            error={error}
            onSubmit={handleSubmit}
        >
            <div className="space-y-4">
                <Input
                    type="email"
                    name="email"
                    autoComplete="username"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" loading={loading} loadingText="Logging in…">
                Sign In
            </Button>
        </AuthLayout>
    );
}