import type {GridRowSelectionModel, GridColDef, GridRowId} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import type {PageResponse} from "../../../types/api/PageResponse.ts";
import {PagedTable} from "../../../components/PagedTable.tsx";

interface Props<T> {
    variant: "active" | "history";
    data: PageResponse<T> | null;
    loading: boolean;
    onPageChange: (page: number, size: number) => void;
    getRowId: (row: T) => number;
    onSelectVisit?: (visit: T | null) => void;
    onCheckOut?: (visitId: number) => void;
}

export function VisitsTable<T extends Record<string, any>>({
                                                               variant,
                                                               data,
                                                               loading,
                                                               onPageChange,
                                                               getRowId,
                                                               onSelectVisit,
                                                               onCheckOut
                                                           }: Props<T>) {
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({
        type: "include",
        ids: new Set<GridRowId>()
    });

    const isHistory = variant === "history";

    useEffect(() => {
        if (onSelectVisit) {
            if (selectionModel.ids.size === 1 && data && data.items) {
                const selectedId = Array.from(selectionModel.ids)[0];
                const selectedVisit = data.items.find(v => getRowId(v) === selectedId) ?? null;
                onSelectVisit(selectedVisit);
            } else {
                onSelectVisit(null);
            }
        }
    }, [selectionModel, data, onSelectVisit, getRowId]);

    useEffect(() => {
        setSelectionModel({type: "include", ids: new Set()});
    }, [data]);

    const columns: GridColDef[] = [
        ...(isHistory ? [
            {
                field: "id",
                headerName: "ID",
                minWidth: 60,
                flex: 0.2,
                align: "center",
                headerAlign: "center",
                valueGetter: (_, row) => getRowId(row)
            }
        ] as GridColDef[] : []),
        {field: "customerFullName", headerName: "Customer Name", flex: 1},
        {field: "customerEmail", headerName: "Customer Email", flex: 1},

        ...(isHistory ? [
            {field: "receptionistFullName", headerName: "Worker Name", flex: 1},
            {field: "receptionistEmail", headerName: "Worker Email", flex: 1},
        ] as GridColDef[] : []),

        {
            field: "checkedInAt",
            headerName: "Checked in",
            flex: 1,
            align: "center",
            headerAlign: "center",
            valueFormatter: (value: string) => {
                if (!value) return "—";
                const date = new Date(value);
                return isHistory
                    ? date.toLocaleString("en-GB",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    : date.toLocaleTimeString("en-GB",
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        });
            },
        },

        ...(isHistory ? [
            {
                field: "checkedOutAt",
                headerName: "Checked out",
                flex: 1,
                align: "center",
                headerAlign: "center",
                valueFormatter: (value: string) => {
                    if (!value) return "—";
                    const date = new Date(value);
                    return date.toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                },
            }
        ] as GridColDef[] : []),

        {
            field: "lockerNumber",
            headerName: "Locker",
            width: 90,
            align: "center",
            headerAlign: "center",
            valueGetter: (_, row) => row.lockerNumber ?? "—",
        },
    ];

    if (onCheckOut) {
        columns.push({
            field: "actions",
            headerName: "Actions",
            width: 130,
            align: "center",
            headerAlign: "center",
            sortable: false,
            renderCell: (params) => (
                <button
                    onClick={() => onCheckOut(getRowId(params.row))}
                    className="text-red-400 hover:underline"
                >
                    Check-out
                </button>
            ),
        });
    }

    return (
        <PagedTable
            data={data}
            columns={columns}
            loading={loading}
            getRowId={getRowId}
            onPageChange={onPageChange}
            checkboxSelection={false}
            disableSelectionOnClick={false}
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelectionModel) => setSelectionModel(newSelectionModel)}
        />
    );
}