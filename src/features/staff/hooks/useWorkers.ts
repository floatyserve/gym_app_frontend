import {useEffect, useState} from "react";
import type {PageResponse} from "../../../types/api/PageResponse.ts";
import type {SimpleWorkerInfo} from "../../../types/worker/Worker.ts";
import {getAllWorkers} from "../../../api/worker.api.ts";

export function useWorkers() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<PageResponse<SimpleWorkerInfo> | null>(null);
    const [loading, setLoading] = useState(false);

    async function load() {
        setLoading(true);
        try {
            const res = await getAllWorkers(page, pageSize);
            setData(res);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [page, pageSize]);

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