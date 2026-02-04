import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
            await login(email, password);
            navigate("/");
        } catch {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-slate-800 p-6 rounded space-y-4"
            >
                <h1 className="text-xl text-white font-semibold text-center">Login</h1>

                <input
                    type="email"
                    name="email"
                    autoComplete="username"
                    className="text-white w-full p-2 rounded bg-slate-700"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    className="text-white w-full p-2 rounded bg-slate-700"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <div className="text-red-400 text-sm">{error}</div>}

                <button
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 p-2 rounded"
                >
                    {loading ? "Logging in…" : "Login"}
                </button>
            </form>
        </div>
    );
}
