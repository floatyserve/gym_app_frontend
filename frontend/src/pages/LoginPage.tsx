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

    const inputStyles = `
        w-full p-3 rounded-xl outline-none transition-all
        bg-slate-900 text-slate-100 border border-slate-700
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        placeholder:text-slate-500
    `;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700/50 space-y-6"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                    <p className="text-sm text-slate-400">Please sign in to your account</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            autoComplete="username"
                            className={inputStyles}
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            className={inputStyles}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-400 text-sm font-medium text-center bg-red-500/10 p-2 rounded">
                        {error}
                    </div>
                )}

                <button
                    disabled={loading}
                    className={`
                        w-full p-3 rounded-xl font-bold text-white transition-all
                        bg-blue-600 hover:bg-blue-500 
                        shadow-lg shadow-blue-900/20
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                >
                    {loading ? "Logging in…" : "Sign In"}
                </button>
            </form>
        </div>
    );
}