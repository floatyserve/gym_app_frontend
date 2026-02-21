import {useEffect, useState} from "react";
import {TextField, Button, MenuItem} from "@mui/material";
import type {GridColDef} from "@mui/x-data-grid";


import {PagedTable} from "../components/PagedTable.tsx";
import {createAccessCard, searchAccessCards} from "../api/access-card.api.ts";
import type {AccessCard} from "../types/access-card/AccessCard.ts";
import type {PageResponse} from "../types/api/PageResponse.ts";
import {AppLayout} from "../layouts/AppLayout.tsx";
import {CreateEntityDialog} from "../components/dialogs/CreateEntityDialog.tsx";

interface Filters {
    code: string;
    status: string;
    customerId: string;
}

export function AccessCardsPage() {
    const [filters, setFilters] = useState<Filters>({
        code: "",
        status: "",
        customerId: "",
    });

    const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [data, setData] = useState<PageResponse<AccessCard> | null>(null);
    const [loading, setLoading] = useState(false);

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [newCode, setNewCode] = useState("");
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
            const res = await searchAccessCards({
                code: appliedFilters.code || undefined,
                status: appliedFilters.status || undefined,
                customerId: appliedFilters.customerId
                    ? Number(appliedFilters.customerId)
                    : undefined,
                page,
                size: pageSize,
            });

            setData(res);
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
        if (!newCode.trim()) return;

        setCreating(true);
        try {
            await createAccessCard({code: newCode.trim()});
            setOpenCreateModal(false);
            setNewCode("");
            await load();
        } finally {
            setCreating(false);
        }
    }

    const columns: GridColDef[] = [
        {
            field: "code",
            headerName: "Code",
            flex: 1,
            sortComparator: (v1, v2) =>
                new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare(v1, v2),
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "customerFullName",
            headerName: "Customer",
            flex: 1,
        },
    ];

    return (
        <AppLayout>
            <div className="bg-slate-800 rounded p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Access Cards
                </h2>

                <div className="flex flex-col gap-4 mb-4">

                    <div className="flex flex-wrap gap-4">
                        <TextField
                            label="Card Code"
                            value={filters.code}
                            onChange={(e) =>
                                handleFilterChange("code", e.target.value)
                            }
                        />

                        <TextField
                            select
                            label="Status"
                            value={filters.status}
                            onChange={(e) =>
                                handleFilterChange("status", e.target.value)
                            }
                            sx={{minWidth: 150}}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                            <MenuItem value="LOST">LOST</MenuItem>
                            <MenuItem value="DAMAGED">DAMAGED</MenuItem>
                            <MenuItem value="BLOCKED">BLOCKED</MenuItem>
                        </TextField>

                        <TextField
                            label="Customer ID"
                            value={filters.customerId}
                            onChange={(e) =>
                                handleFilterChange("customerId", e.target.value)
                            }
                        />

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
                            Create Card
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
                    title="Create Access Card"
                    onClose={() => setOpenCreateModal(false)}
                    onSubmit={handleCreate}
                    loading={creating}
                >
                    <TextField
                        label="Card Code"
                        fullWidth
                        margin="normal"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                    />
                </CreateEntityDialog>

            </div>
        </AppLayout>
    );
}
