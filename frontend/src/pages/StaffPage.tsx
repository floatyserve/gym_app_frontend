import {useEffect, useState} from "react";
import type {OnboardWorkerRequest} from "../types/worker/OnboardWorkerRequest.ts";
import type {PageResponse} from "../types/api/PageResponse.ts";
import {getAllWorkers, getWorkerById, onboardWorker, updateWorker} from "../api/worker.api.ts";
import {AppLayout} from "../layouts/AppLayout.tsx";
import type {GridColDef} from "@mui/x-data-grid";
import type {DetailedWorkerInfo, SimpleWorkerInfo} from "../types/worker/Worker.ts";
import {Box, Button, MenuItem, TextField} from "@mui/material";
import {PagedTable} from "../components/PagedTable.tsx";
import {CreateEntityDialog} from "../components/dialogs/CreateEntityDialog.tsx";
import toast from "react-hot-toast";
import {DetailsDialog} from "../components/dialogs/DetailsDialog.tsx";

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

    const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
    const [selectedWorker, setSelectedWorker] = useState<DetailedWorkerInfo | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editableWorker, setEditableWorker] = useState<DetailedWorkerInfo | null>(null);
    const [updating, setUpdating] = useState(false);

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
            console.log(createFields);
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
        } finally {
            setCreating(false);
        }
    }

    async function handleUpdate() {
        if (!selectedWorker || !editableWorker) return;

        setUpdating(true);

        try {
            const updated = await updateWorker(selectedWorker.id, editableWorker);

            setSelectedWorker(updated);
            setEditableWorker(updated);
            setEditMode(false);

            toast.success("Worker updated");

            await load();
        } finally {
            setUpdating(false);
        }
    }

    function handleCancelEdit() {
        setEditableWorker(selectedWorker);
        setEditMode(false);
    }

    async function showDetails(id: number) {
        setSelectedWorkerId(id);
        setDetailsLoading(true);

        try {
            const data = await getWorkerById(id);
            setSelectedWorker(data);
            setEditableWorker(data);
        } finally {
            setDetailsLoading(false);
        }
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
                        gridTemplateColumns={{xs: "1fr", md: "1fr 1fr"}}
                        gap={3}
                    >
                        <TextField
                            fullWidth
                            label="Email"
                            value={createFields.email}
                            onChange={(e) =>
                                setCreateFields({
                                    ...createFields,
                                    email: e.target.value
                                })
                            }
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            value={createFields.password}
                            onChange={(e) =>
                                setCreateFields({
                                    ...createFields,
                                    password: e.target.value
                                })
                            }
                        />

                        <TextField
                            fullWidth
                            label="Role"
                            select
                            value={createFields.role}
                            onChange={(e) =>
                                setCreateFields({
                                    ...createFields,
                                    role: e.target.value
                                })
                            }
                            sx={{gridColumn: {md: "span 2"}}}
                        >
                            <MenuItem value="">
                                <em>Select role</em>
                            </MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="RECEPTIONIST">Receptionist</MenuItem>
                        </TextField>

                        <TextField
                            fullWidth
                            label="First Name"
                            value={createFields.firstName}
                            onChange={(e) =>
                                setCreateFields({
                                    ...createFields,
                                    firstName: e.target.value
                                })
                            }
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            value={createFields.lastName}
                            onChange={(e) =>
                                setCreateFields({
                                    ...createFields,
                                    lastName: e.target.value
                                })
                            }
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={createFields.phoneNumber}
                            onChange={(e) =>
                                setCreateFields({
                                    ...createFields,
                                    phoneNumber: e.target.value
                                })
                            }
                        />
                        <TextField
                            fullWidth
                            label="Birth Date"
                            type="date"
                            slotProps={{inputLabel: {shrink: true}}}
                            value={createFields.birthDate}
                            onChange={(e) =>
                                setCreateFields({
                                    ...createFields,
                                    birthDate: e.target.value
                                })
                            }
                        />
                    </Box>
                </CreateEntityDialog>
                <DetailsDialog
                    open={selectedWorkerId !== null}
                    title="Worker Details"
                    onClose={() => {
                        setSelectedWorkerId(null);
                        setSelectedWorker(null);
                        setEditMode(false);
                    }}
                    actions={
                        editMode ? (
                            <>
                                <Button onClick={handleCancelEdit}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleUpdate}
                                    disabled={updating}
                                >
                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => setEditMode(true)}>
                                    Edit
                                </Button>
                                <Button onClick={() => {
                                    setSelectedWorkerId(null);
                                    setSelectedWorker(null);
                                }}>
                                    Close
                                </Button>
                            </>
                        )
                    }
                >
                    {detailsLoading && <div>Loading...</div>}

                    {!detailsLoading && editableWorker && (
                        <Box
                            display="grid"
                            gridTemplateColumns="1fr 1fr"
                            gap={2}
                        >
                            <TextField
                                label="Email"
                                value={editableWorker.email}
                                fullWidth
                                size="small"
                                disabled={!editMode}
                                onChange={(e) =>
                                    setEditableWorker({
                                        ...editableWorker,
                                        email: e.target.value
                                    })
                                }
                            />

                            <TextField
                                select
                                label="Role"
                                value={editableWorker.role}
                                fullWidth
                                size="small"
                                disabled={!editMode}
                                onChange={(e) =>
                                    setEditableWorker({
                                        ...editableWorker,
                                        role: e.target.value
                                    })
                                }
                            >
                                <MenuItem value="ADMIN">Admin</MenuItem>
                                <MenuItem value="RECEPTIONIST">Receptionist</MenuItem>
                            </TextField>

                            <TextField
                                label="First Name"
                                value={editableWorker.firstName}
                                fullWidth
                                size="small"
                                disabled={!editMode}
                                onChange={(e) =>
                                    setEditableWorker({
                                        ...editableWorker,
                                        firstName: e.target.value
                                    })
                                }
                            />

                            <TextField
                                label="Last Name"
                                value={editableWorker.lastName}
                                fullWidth
                                size="small"
                                disabled={!editMode}
                                onChange={(e) =>
                                    setEditableWorker({
                                        ...editableWorker,
                                        lastName: e.target.value
                                    })
                                }
                            />

                            <TextField
                                label="Phone Number"
                                value={editableWorker.phoneNumber}
                                fullWidth
                                size="small"
                                disabled={!editMode}
                                onChange={(e) =>
                                    setEditableWorker({
                                        ...editableWorker,
                                        phoneNumber: e.target.value
                                    })
                                }
                            />

                            <TextField
                                type="date"
                                label="Birth Date"
                                value={editableWorker.birthDate}
                                fullWidth
                                size="small"
                                disabled={!editMode}
                                slotProps={{inputLabel: {shrink: true}}}
                                onChange={(e) =>
                                    setEditableWorker({
                                        ...editableWorker,
                                        birthDate: e.target.value
                                    })
                                }
                            />
                        </Box>
                    )}
                </DetailsDialog>
            </div>
        </AppLayout>
    );
}

export default StaffPage;