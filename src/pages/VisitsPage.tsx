import { useState } from "react";
import { useVisits } from "../features/visits/hooks/useVisits.ts";
import { AppLayout } from "../layouts/AppLayout.tsx";
import { Button, TextField, MenuItem } from "@mui/material"; // Added MenuItem
import { VisitsTable } from "../features/visits/components/VisitTable.tsx";

interface Filters {
    customerEmail: string;
    receptionistEmail: string;
    active: boolean | undefined;
    checkedInAfter: string;
    checkedInBefore: string;
    checkedOutAfter: string;
    checkedOutBefore: string;
    lockerNumber: string;
}

function VisitsPage() {
    const [filters, setFilters] = useState<Filters>({
        customerEmail: "",
        receptionistEmail: "",
        active: undefined,
        checkedInAfter: "",
        checkedInBefore: "",
        checkedOutAfter: "",
        checkedOutBefore: "",
        lockerNumber: "",
    });

    const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);

    const {
        data,
        loading,
        setPage,
        setPageSize,
        reload
    } = useVisits(appliedFilters);

    function handleFilterChange<K extends keyof Filters>(key: K, value: Filters[K]) {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }

    function handleSearch() {
        setPage(0);
        setAppliedFilters({
            ...filters,
            checkedInAfter: toInstantString(filters.checkedInAfter),
            checkedInBefore: toInstantString(filters.checkedInBefore),
            checkedOutAfter: toInstantString(filters.checkedOutAfter),
            checkedOutBefore: toInstantString(filters.checkedOutBefore),
        });
    }

    function toInstantString(localDateTime: string): string {
        if (!localDateTime) return "";
        try {
            return new Date(localDateTime).toISOString();
        } catch (e) {
            return "";
        }
    }

    const inputStyle = { width: 250 };

    return (
        <AppLayout>
            <div className="bg-slate-800 rounded p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Visits
                </h2>

                <div className="flex flex-col gap-6 mb-6">
                    <div className="flex flex-wrap gap-4">
                        <TextField
                            label="Customer Email"
                            value={filters.customerEmail}
                            onChange={(e) =>
                                handleFilterChange("customerEmail", e.target.value)
                            }
                            sx={inputStyle}
                        />

                        <TextField
                            label="Worker Email"
                            value={filters.receptionistEmail}
                            onChange={(e) =>
                                handleFilterChange("receptionistEmail", e.target.value)
                            }
                            sx={inputStyle}
                        />

                        <TextField
                            label="Locker Number"
                            type="number"
                            value={filters.lockerNumber}
                            onChange={(e) =>
                                handleFilterChange("lockerNumber", e.target.value)
                            }
                            sx={inputStyle}
                        />

                        <TextField
                            select
                            label="Active"
                            value={filters.active === undefined ? "" : filters.active ? "YES" : "NO"}
                            onChange={(e) => {
                                const val = e.target.value;
                                const activeVal = val === "YES" ? true : val === "NO" ? false : undefined;
                                handleFilterChange("active", activeVal);
                            }}
                            sx={{ minWidth: 100 }}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="YES">Yes</MenuItem>
                            <MenuItem value="NO">No</MenuItem>
                        </TextField>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <TextField
                            label="Checked In After"
                            type="datetime-local"
                            value={filters.checkedInAfter}
                            onChange={(e) =>
                                handleFilterChange("checkedInAfter", e.target.value)
                            }
                            slotProps={{inputLabel:{ shrink: true }}}
                            sx={inputStyle}
                        />

                        <TextField
                            label="Checked In Before"
                            type="datetime-local"
                            value={filters.checkedInBefore}
                            onChange={(e) =>
                                handleFilterChange("checkedInBefore", e.target.value)
                            }
                            slotProps={{inputLabel:{ shrink: true }}}
                            sx={inputStyle}
                        />

                        <TextField
                            label="Checked Out After"
                            type="datetime-local"
                            value={filters.checkedOutAfter}
                            onChange={(e) =>
                                handleFilterChange("checkedOutAfter", e.target.value)
                            }
                            slotProps={{inputLabel:{ shrink: true }}}
                            sx={inputStyle}
                        />

                        <TextField
                            label="Checked Out Before"
                            type="datetime-local"
                            value={filters.checkedOutBefore}
                            onChange={(e) =>
                                handleFilterChange("checkedOutBefore", e.target.value)
                            }
                            slotProps={{inputLabel:{ shrink: true }}}
                            sx={inputStyle}
                        />

                        <Button
                            variant="contained"
                            onClick={handleSearch}
                            size="large"
                        >
                            Search
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={reload}
                            size="large"
                        >
                            Refresh Data
                        </Button>
                    </div>
                </div>

                <VisitsTable
                    variant="history"
                    data={data}
                    loading={loading}
                    getRowId={(row) => row.id}
                    onPageChange={(newPage, newPageSize) => {
                        setPage(newPage);
                        setPageSize(newPageSize);
                    }}
                />

            </div>
        </AppLayout>
    );
}

export default VisitsPage;