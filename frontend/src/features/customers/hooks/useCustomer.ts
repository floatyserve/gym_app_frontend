import {useEffect, useState} from "react";
import type {PageResponse} from "../../../types/api/PageResponse.ts";
import type {Customer} from "../../../types/customer/Customer.ts";
import {searchCustomers} from "../../../api/customer.api.ts";

interface CustomerFilters {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    cardCode?: string;
}

export function useCustomers(filters: CustomerFilters | null) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<PageResponse<Customer> | null>(null);
    const [loading, setLoading] = useState(false);

    async function load() {
        if (!filters) return;

        setLoading(true);
        try {
            const res = await searchCustomers({
                ...Object.fromEntries(
                    Object.entries(filters).filter(([, v]) => {
                        if (v == null) return false;
                        if (typeof v === "string") return v.trim() !== "";
                        return true;
                    })
                ),
                page,
                size: pageSize
            });

            setData(res);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [page, pageSize, filters]);

    return {
        data,
        loading,
        page,
        pageSize,
        setPage,
        setPageSize,
        reload: load
    };
}