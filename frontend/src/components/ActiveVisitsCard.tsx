import type { GridRowSelectionModel, GridColDef, GridRowId } from "@mui/x-data-grid";


import { useEffect, useState } from "react";
import { getAllActive, checkOut } from "../api/visit.api";
import type { ActiveVisit } from "../types/visit/ActiveVisit";
import type { PageResponse } from "../types/page/PageResponse";
import { PagedTable } from "./PagedTable.tsx";

interface Props {
    onSelectVisit(visit: ActiveVisit | null): void;
    refreshTrigger: number;
}

export function ActiveVisitsTable({ onSelectVisit, refreshTrigger }: Props) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<PageResponse<ActiveVisit> | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({
        type: "include",
        ids: new Set<GridRowId>()
    });

    useEffect(() => {
        load();
    }, [page, pageSize, refreshTrigger]);

    useEffect(() => {
        if (selectionModel.ids.size === 1 && data) {
            const selectedId = Array.from(selectionModel.ids)[0];
            const selectedVisit = data.items.find(v => v.visitId === selectedId) ?? null;
            onSelectVisit(selectedVisit);
        } else {
            onSelectVisit(null);
        }
    }, [selectionModel, data, onSelectVisit]);

    async function load() {
        setLoading(true);
        try {
            const res = await getAllActive(page, pageSize);
            setData(res);
            setSelectionModel({
                type: "include",
                ids: new Set()
            });
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
            field: "customerEmail",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "checkedInAt",
            headerName: "Checked in",
            width: 120,
            align: "center",
            headerAlign: "center",
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
            align: "center",
            headerAlign: "center",
            valueGetter: (_, row) => row.lockerNumber ?? "—",
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 130,
            align: "center",
            headerAlign: "center",
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
                checkboxSelection={false}
                disableSelectionOnClick={false}
                selectionModel={selectionModel}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}

            />
        </div>
    );
}
