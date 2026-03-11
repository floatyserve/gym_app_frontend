import type {PageResponse} from "../../../types/api/PageResponse.ts";
import type {GridColDef} from "@mui/x-data-grid";
import {PagedTable} from "../../../components/PagedTable.tsx";
import {Button} from "@mui/material";
import type {Customer} from "../../../types/customer/Customer.ts";

interface Props {
    data: PageResponse<Customer> | null;
    loading: boolean;
    page: number;
    pageSize: number;
    onPageChange: (page: number, size: number) => void;
    onDetails: (id: number) => void;
}

export function CustomersTable({
                                   data,
                                   loading,
                                   onPageChange,
                                   onDetails
                               }: Props) {

    const columns: GridColDef[] = [
        {field: "id", headerName: "ID", width: 70, headerAlign: "center", align: "center"},
        {field: "fullName", headerName: "Full Name", flex: 1},
        {field: "phoneNumber", headerName: "Phone Number", flex: 1},
        {field: "email", headerName: "Email", flex: 1},
        {
            field: "createdAt",
            headerName: "Registered At",
            flex: 1,
            valueGetter: (value: string) =>
                value ? new Date(value).toLocaleString() : "-"
        },
        {
            field: "cardCode",
            headerName: "Active Access Card Code",
            flex: 1,
            valueGetter: (value: string | null) =>
                value ?? "-"
        },
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