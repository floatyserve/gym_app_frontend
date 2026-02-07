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

    if (!stats) {
        return <div className="bg-slate-800 p-4 rounded">Loading lockers…</div>;
    }

    return (
        <div className="bg-slate-800 p-4 rounded space-y-2">
            <h2 className="font-semibold">Lockers</h2>

            <div className="text-sm">
                <div>Total: {stats.totalCount}</div>
                <div className="text-emerald-400">Available: {stats.availableCount}</div>
                <div className="text-yellow-400">Occupied: {stats.occupiedCount}</div>
                <div className="text-red-400">Out of order: {stats.outOfOrderCount}</div>
            </div>
        </div>
    );
}
