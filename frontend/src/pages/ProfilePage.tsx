import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSelf} from "../api/worker.api";
import type { DetailedWorkerInfo } from "../types/worker/Worker.ts";
import { AppLayout } from "../layouts/AppLayout.tsx";

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-slate-700/50 last:border-0">
            <span className="text-sm font-medium text-slate-400">{label}</span>
            <span className="text-slate-200 font-medium mt-1 sm:mt-0">{value}</span>
        </div>
    );
}

export function ProfilePage() {
    const { user } = useAuth();
    const [data, setData] = useState<DetailedWorkerInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            if (!user) return;

            try {
                const fetchedWorker = await getSelf();
                setData(fetchedWorker);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [user]);

    const formatDate = (dateString: string) => {
        return new Date(dateString)
            .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            .replace(/\//g, "-");
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString)
            .toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            })
            .replace(/\//g, "-");
    };

    if (loading) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center h-64 text-slate-400 animate-pulse">
                    Loading profile...
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

                <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden">

                    <div className="p-6 sm:p-8 bg-slate-800/50 border-b border-slate-700">

                        <div className="flex items-center gap-6">
                            <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-900/20">
                                {data && data.firstName[0].toUpperCase()}
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {data
                                        ? `${data.firstName} ${data.lastName}`
                                        : "User Account"}
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-900/30 text-blue-200 border border-blue-800">
                                        {data?.role}
                                    </span>
                                    <span
                                        className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                                            data?.active
                                                ? "bg-emerald-900/30 text-emerald-300 border-emerald-800"
                                                : "bg-red-900/30 text-red-300 border-red-800"
                                        }`}
                                    >
                                        {data?.active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-8">

                        {data && (
                            <section>
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    Personal Information
                                </h3>
                                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                    <InfoRow label="User ID" value={<span className="font-mono text-xs">{data?.id}</span>} />
                                    <InfoRow label="Email Address" value={data?.email} />
                                    <InfoRow label="Full Name" value={`${data.firstName} ${data.lastName}`} />
                                    <InfoRow label="Phone Number" value={data.phoneNumber} />
                                    <InfoRow label="Birth Date" value={formatDate(data.birthDate)} />
                                    <InfoRow label="Hire Date" value={formatDateTime(data.hiredAt)} />
                                </div>
                            </section>
                        )}

                        <div className="pt-4">
                            <button
                                onClick={() => alert("TODO: implement")}
                                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}