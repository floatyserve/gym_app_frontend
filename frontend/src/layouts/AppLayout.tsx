import * as React from "react";
import {Header} from "../components/Header.tsx";

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-slate-900 text-slate-100">
                <header className="h-14 border-b border-slate-800 flex items-center px-4">
                    <span className="font-semibold">Gym App</span>
                </header>

                <main className="p-4">
                    {children}
                </main>
            </div>
        </>
    );
}