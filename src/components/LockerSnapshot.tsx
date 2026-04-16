import { useEffect, useState } from "react";
import { getStats } from "../api/locker.api";
import type { LockerStats } from "../types/locker/LockerStats";

interface Props {
    refreshTrigger: number;
}

export function LockerSnapshot({ refreshTrigger }: Props) {
    const [stats, setStats] = useState<LockerStats | null>(null);

    useEffect(() => {
        getStats().then(setStats);
    }, [refreshTrigger]);

    const cardStyle = "bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700/50 h-full";

    if (!stats) {
        return (
            <div className={`${cardStyle} flex items-center justify-center`}>
                <div className="text-slate-400 animate-pulse">Loading lockers...</div>
            </div>
        );
    }

    return (
        <div className={cardStyle}>
            <h2 className="text-xl font-bold text-center text-white mb-6">
                Lockers Status
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Total */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center justify-center">
                    <div className="text-sm font-medium text-slate-400 mb-1">Total</div>
                    <div className="text-3xl font-bold text-white">
                        {stats.totalCount}
                    </div>
                </div>

                {/* Available */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center justify-center">
                    <div className="text-sm font-medium text-emerald-400/80 mb-1">Available</div>
                    <div className="text-3xl font-bold text-emerald-400 drop-shadow-sm">
                        {stats.availableCount}
                    </div>
                </div>

                {/* Occupied */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center justify-center">
                    <div className="text-sm font-medium text-yellow-400/80 mb-1">Occupied</div>
                    <div className="text-3xl font-bold text-yellow-400 drop-shadow-sm">
                        {stats.occupiedCount}
                    </div>
                </div>

                {/* Out of Order */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center justify-center">
                    <div className="text-sm font-medium text-red-400/80 mb-1">Out of order</div>
                    <div className="text-3xl font-bold text-red-400 drop-shadow-sm">
                        {stats.outOfOrderCount}
                    </div>
                </div>
            </div>
        </div>
    );
}