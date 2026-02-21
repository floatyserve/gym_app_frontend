import { useEffect, useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

import { PagedTable } from "../components/PagedTable.tsx";
import { createLocker, searchLockers } from "../api/locker.api.ts";
import type { PageResponse } from "../types/api/PageResponse.ts";
import type { Locker } from "../types/locker/Locker.ts";
import { CreateEntityDialog } from "../components/dialogs/CreateEntityDialog.tsx";
import { AppLayout } from "../layouts/AppLayout.tsx";

interface Filters {
    number: string;
    status: string;
    occupied: string;
}

function LockersPage() {
    const [filters, setFilters] = useState<Filters>({
        number: "",
        status: "",
        occupied: "",
    });

    const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [data, setData] = useState<PageResponse<Locker> | null>(null);
    const [loading, setLoading] = useState(false);

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [newNumber, setNewNumber] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        if (appliedFilters) {
            load();
        }
    }, [page, pageSize, appliedFilters]);

    async function load() {
        if (!appliedFilters) return;

        setLoading(true);
        try {
            const res = await searchLockers({
                number:
                    appliedFilters.number.trim() !== ""
                        ? Number(appliedFilters.number)
                        : undefined,
                status: appliedFilters.status || undefined,
                occupied:
                    appliedFilters.occupied === ""
                        ? undefined
                        : appliedFilters.occupied === "true",
                page,
                size: pageSize,
            });

            setData(res);
        } catch (err) {
            console.error("Failed to load lockers", err);
        } finally {
            setLoading(false);
        }
    }

    function handleFilterChange<K extends keyof Filters>(
        key: K,
        value: Filters[K]
    ) {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    }

    function handleSearch() {
        setPage(0);
        setAppliedFilters(filters);
    }

    async function handleCreate() {
        if (!newNumber.trim()) return;

        setCreating(true);
        try {
            await createLocker({
                number: Number(newNumber.trim()),
            });

            setOpenCreateModal(false);
            setNewNumber("");
            await load();
        } finally {
            setCreating(false);
        }
    }

    const columns: GridColDef[] = [
        {
            field: "number",
            headerName: "Number",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "occupied",
            headerName: "Occupied",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
    ];

    return (
        <AppLayout>
            <div className="bg-slate-800 rounded p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Lockers
                </h2>

                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex flex-wrap gap-4">
                        <TextField
                            label="Locker Number"
                            value={filters.number}
                            onChange={(e) =>
                                handleFilterChange("number", e.target.value)
                            }
                        />

                        <TextField
                            select
                            label="Status"
                            value={filters.status}
                            onChange={(e) =>
                                handleFilterChange("status", e.target.value)
                            }
                            sx={{ minWidth: 150 }}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                            <MenuItem value="OUT_OF_ORDER">OUT_OF_ORDER</MenuItem>
                        </TextField>

                        <TextField
                            select
                            label="Occupied"
                            value={filters.occupied}
                            onChange={(e) =>
                                handleFilterChange("occupied", e.target.value)
                            }
                            sx={{ minWidth: 150 }}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </TextField>

                        <Button
                            variant="contained"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <Button
                            variant="contained"
                            onClick={() => setOpenCreateModal(true)}
                        >
                            Create Locker
                        </Button>
                    </div>
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
                    title="Create Locker"
                    onClose={() => setOpenCreateModal(false)}
                    onSubmit={handleCreate}
                    loading={creating}
                >
                    <TextField
                        label="Locker Number"
                        fullWidth
                        margin="normal"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                    />
                </CreateEntityDialog>
            </div>
        </AppLayout>
    );
}

export default LockersPage;