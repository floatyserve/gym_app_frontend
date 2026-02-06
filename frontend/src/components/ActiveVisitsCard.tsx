import { type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllActive, checkOut } from "../api/visit.api";
import type { ActiveVisit } from "../types/visit/ActiveVisit";
import type { PageResponse } from "../types/page/PageResponse";
import {PagedTable} from "./PagedTable.tsx";

export function ActiveVisitsTable() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<PageResponse<ActiveVisit> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        load();
    }, [page, pageSize]);

    async function load() {
        setLoading(true);
        try {
            const res = await getAllActive(page, pageSize);
            setData(res);
        } finally {
            setLoading(false);
        }
    }

    async function handleCheckout(visitId: number) {
        await checkOut(visitId);
        load();
    }

    const columns: GridColDef[] = [
        {
            field: "customerFullName",
            headerName: "Customer",
            flex: 1,
        },
        {
            field: "checkedInAt",
            headerName: "Checked in",
            width: 120,
            valueFormatter: (value: string) =>
                new Date(value).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
        },
        {
            field: "lockerNumber",
            headerName: "Locker",
            width: 90,
            valueGetter: (_, row) =>
                row.lockerNumber ? `#${row.lockerNumber}` : "—",
        },
        {
            field: "actions",
            headerName: "",
            width: 130,
            sortable: false,
            renderCell: (params) => (
                <button
                    onClick={() => handleCheckout(params.row.visitId)}
                    className="text-red-400 hover:underline"
                >
                    Check-out
                </button>
            ),
        },
    ];

    return (
        <div className="bg-slate-800 rounded p-3">
            <h2 className="font-semibold mb-2">Active Visits</h2>

            <PagedTable
                data={data}
                columns={columns}
                loading={loading}
                getRowId={(row) => row.visitId}
                onPageChange={(page, size) => {
                    setPage(page);
                    setPageSize(size);
                }}
            />
        </div>
    );
}

