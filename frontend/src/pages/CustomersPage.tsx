import {useState} from "react";
import {AppLayout} from "../layouts/AppLayout.tsx";
import {Button, TextField} from "@mui/material";
import {useCustomers} from "../features/customers/hooks/useCustomer.ts";
import {CustomersTable} from "../features/customers/components/CustomersTable.tsx";
import {RegisterCustomerDialog} from "../features/customers/components/RegisterCustomerDialog.tsx";

interface Filters {
    fullName: string;
    email: string;
    phoneNumber: string;
    cardCode: string;
}

function CustomersPage() {

    const [filters, setFilters] = useState<Filters>({
        fullName: "",
        email: "",
        phoneNumber: "",
        cardCode: "",
    });

    const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);

    const {
        data,
        loading,
        page,
        pageSize,
        setPage,
        setPageSize,
        reload
    } = useCustomers(appliedFilters);

    const [openCreate, setOpenRegister] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

    function handleFilterChange<K extends keyof Filters>(key: K, value: Filters[K]) {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }

    function handleSearch() {
        setPage(0);
        setAppliedFilters(filters);
    }

    return (
        <AppLayout>
            <div className="bg-slate-800 rounded p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Customers
                </h2>

                <div className="flex flex-col gap-4 mb-4">

                    <div className="flex flex-wrap gap-4">
                        <TextField
                            label="Full Name"
                            value={filters.fullName}
                            onChange={(e) =>
                                handleFilterChange("fullName", e.target.value)
                            }
                        />

                        <TextField
                            label="Email"
                            value={filters.email}
                            onChange={(e) =>
                                handleFilterChange("email", e.target.value)
                            }
                        />

                        <TextField
                            label="Phone Number"
                            value={filters.phoneNumber}
                            onChange={(e) =>
                                handleFilterChange("phoneNumber", e.target.value)
                            }
                        />

                        <TextField
                            label="Access Card Code"
                            value={filters.cardCode}
                            onChange={(e) =>
                                handleFilterChange("cardCode", e.target.value)
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
                            onClick={() => setOpenRegister(true)}
                        >
                            Register new customer
                        </Button>
                    </div>

                </div>

                <CustomersTable
                    data={data}
                    loading={loading}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={(p, s) => {
                        setPage(p);
                        setPageSize(s);
                    }}
                    //TODO: open window with customer details including access card info and visits history
                    onDetails={(id) => setSelectedCustomerId(id)}
                />

                <RegisterCustomerDialog
                    open={openCreate}
                    onClose={() => setOpenRegister(false)}
                    onRegistered={reload}
                />

            </div>
        </AppLayout>
    );
}

export default CustomersPage;