import React from "react";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    error?: string | null;
    onSubmit: (e: React.FormEvent) => void;
    children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, error, onSubmit, children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-sm bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700/50 space-y-6"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                    <p className="text-sm text-slate-400">{subtitle}</p>
                </div>

                {children}

                {error && (
                    <div className="text-red-400 text-sm font-medium text-center bg-red-500/10 p-2 rounded">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}