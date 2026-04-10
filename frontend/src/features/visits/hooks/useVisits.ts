import {useEffect, useState} from "react";
import type {PageResponse} from "../../../types/api/PageResponse.ts";
import {searchVisits} from "../../../api/visit.api.ts";
import type {HistoryVisit} from "../../../types/visit/HistoryVisit.ts";

interface VisitFilters {
    customerEmail?: string;
    receptionistEmail?: string;
    active?: boolean;
    checkedInAfter?: string;
    checkedInBefore?: string;
    checkedOutAfter?: string;
    checkedOutBefore?: string;
    lockerNumber?: string;
}

export function useVisits(filters: VisitFilters | null) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<PageResponse<HistoryVisit> | null>(null);
    const [loading, setLoading] = useState(false);

    async function load() {
        if (!filters) return;

        setLoading(true);
        try {
            const res = await searchVisits({
                ...Object.fromEntries(
                    Object.entries(filters).filter(([, v]) => {
                        if (v == null) return false;
                        if (typeof v === "string") return v.trim() !== "";
                        return true;
                    })
                ),
                page,
                size: pageSize
            });

            setData(res);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [page, pageSize, filters]);

    return {
        data,
        loading,
        page,
        pageSize,
        setPage,
        setPageSize,
        reload: load
    };
}