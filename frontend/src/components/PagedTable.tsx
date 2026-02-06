import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import type { PageResponse } from "../types/page/PageResponse";

type Props<T> = {
    data: PageResponse<T> | null | undefined;
    columns: GridColDef[];
    loading: boolean;
    getRowId: (row: T) => number | string;
    onPageChange: (page: number, size: number) => void;
};

export function PagedTable<T>({
                                  data,
                                  columns,
                                  loading,
                                  getRowId,
                                  onPageChange,
                              }: Props<T>) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    return (
        <DataGrid
            rows={data?.items ?? []}
            columns={columns}
            getRowId={getRowId}
            rowCount={data?.totalItems ?? 0}
            loading={loading}

            paginationMode="server"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
                setPage(model.page);
                setPageSize(model.pageSize);
                onPageChange(model.page, model.pageSize);
            }}

            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            autoHeight

            sx={{
                border: "none",
                backgroundColor: "transparent",

                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#1e293b",
                    borderBottom: "1px solid #334155",
                },

                "& .MuiDataGrid-row": {
                    backgroundColor: "#0f172a",
                },

                "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#1e293b",
                },

                "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #1e293b",
                },

                "& .MuiDataGrid-footerContainer": {
                    borderTop: "1px solid #334155",
                    backgroundColor: "#0f172a",
                },
            }}
        />
    );
}
