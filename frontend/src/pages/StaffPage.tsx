import {useEffect, useState} from "react";
import type {OnboardWorkerRequest} from "../types/worker/OnboardWorkerRequest.ts";
import type {PageResponse} from "../types/api/PageResponse.ts";
import {getAllWorkers, onboardWorker} from "../api/worker.api.ts";
import {AppLayout} from "../layouts/AppLayout.tsx";
import type {GridColDef} from "@mui/x-data-grid";
import type {DetailedWorkerInfo, SimpleWorkerInfo} from "../types/worker/Worker.ts";
import {Box, Button, MenuItem, TextField} from "@mui/material";
import {PagedTable} from "../components/PagedTable.tsx";
import {CreateEntityDialog} from "../components/dialogs/CreateEntityDialog.tsx";
import toast from "react-hot-toast";

function StaffPage() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [data, setData] = useState<PageResponse<SimpleWorkerInfo> | null>(null);
    const [loading, setLoading] = useState(false);

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [createFields, setCreateFields] = useState<OnboardWorkerRequest>({
        email: "",
        password: "",
        role: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDate: "",
    });
    function resetCreateFields() {
        setCreateFields({
            email: "",
            password: "",
            role: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDate: "",
        });
    }

    const [creating, setCreating] = useState(false);

    useEffect(() => {
        load();
    }, [page, pageSize]);

    async function load() {
        setLoading(true);
        try {
            const res = await getAllWorkers(
                page,
                pageSize,
            );

            setData(res);
        } catch (e) {
            console.error("Failed to load workers", e);
            throw e;
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate() {
        const isEmpty = (v: string) => !v || !v.trim();

        if (Object.values(createFields).some(isEmpty)) {
            toast.error("All fields are required");
            return;
        }

        setCreating(true);

        try {
            await onboardWorker(createFields);
            setOpenCreateModal(false);
            toast.success("Created new worker");
            resetCreateFields();
            await load();
        }
        finally {
            setCreating(false);
        }
    }

    function showDetails(id: number) {
        //TODO: show modal with details with the option of editing entity
        console.log(id);
    }

    const columns: GridColDef[] = [
        {field: "id", headerName: "ID", align: "center", headerAlign: "center", width: 70},
        {field: "fullName", headerName: "Full Name", flex: 1},
        {field: "email", headerName: "Email", flex: 1},
        {field: "role", headerName: "Role", flex: 1},
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            align: "center",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                const row = params.row as SimpleWorkerInfo;
                return (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => showDetails(row.id)}
                    >
                        Details
                    </Button>
                );
            }
        },
    ];

    return (
        <AppLayout>
            <div className="bg-slate-800 rounded p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Workers
                </h2>
                <div className="flex justify-center md:justify-end">
                    <Button
                        variant="contained"
                        onClick={() => setOpenCreateModal(true)}
                    >
                        Onboard Worker
                    </Button>
                </div>

                <PagedTable
                    data={data}
                    columns={columns}
                    loading={loading}
                    getRowId={(row) => row.id}
                    onPageChange={(newPage, newSize) => {
                        setPage(newPage);
                        setPageSize(newSize);
                    }}
                />

                <CreateEntityDialog
                    open={openCreateModal}
                    title="Onboard Worker"
                    onClose={() => {
                        setOpenCreateModal(false);
                        resetCreateFields();
                    }}
                    onSubmit={handleCreate}
                    loading={creating}
                >
                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
                        gap={3}
                    >
                        <TextField fullWidth label="Email" />
                        <TextField fullWidth label="Password" />

                        <TextField
                            fullWidth
                            label="Role"
                            select
                            sx={{ gridColumn: { md: "span 2" } }}
                        >
                            <MenuItem defaultValue="" sx={{
                                textDecoration: "italic",
                                color: "text.secondary",
                            }}>Role</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="RECEPTIONIST">Receptionist</MenuItem>
                        </TextField>

                        <TextField fullWidth label="First Name" />
                        <TextField fullWidth label="Last Name" />
                        <TextField fullWidth label="Phone Number" />
                        <TextField
                            fullWidth
                            label="Birth Date"
                            type="date"
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                    </Box>
                </CreateEntityDialog>
            </div>
        </AppLayout>
    );
}

export default StaffPage;