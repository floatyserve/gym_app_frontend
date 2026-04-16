import type {PageResponse} from "../../../types/api/PageResponse.ts";
import type {SimpleWorkerInfo} from "../../../types/worker/Worker.ts";
import type {GridColDef} from "@mui/x-data-grid";
import {PagedTable} from "../../../components/PagedTable.tsx";
import {Button} from "@mui/material";

interface Props {
    data: PageResponse<SimpleWorkerInfo> | null;
    loading: boolean;
    page: number;
    pageSize: number;
    onPageChange: (page: number, size: number) => void;
    onDetails: (id: number) => void;
}

export function WorkersTable({
                                 data,
                                 loading,
                                 onPageChange,
                                 onDetails
                             }: Props) {

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70, headerAlign: "center", align: "center" },
        { field: "fullName", headerName: "Full Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "role", headerName: "Role", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onDetails(params.row.id)}
                >
                    Details
                </Button>
            )
        }
    ];

    return (
        <PagedTable
            data={data}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            onPageChange={onPageChange}
        />
    );
}