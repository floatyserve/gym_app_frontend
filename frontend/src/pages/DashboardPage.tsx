import {useEffect, useState} from "react";
import {AppLayout} from "../layouts/AppLayout.tsx";
import {LockerSnapshot} from "../components/LockerSnapshot.tsx";
import {QuickActionsPanel} from "../components/QuickActionsPanel.tsx";
import {AssignLockerDialog} from "../components/dialogs/AssignLockerDialog.tsx";
import {CheckInDialog} from "../components/dialogs/CheckInDialog.tsx";
import {RegisterCustomerDialog} from "../features/customers/components/RegisterCustomerDialog.tsx";
import type {ActiveVisit} from "../types/visit/ActiveVisit";
import {useNavigate} from "react-router-dom";
import type {PageResponse} from "../types/api/PageResponse.ts";
import {VisitsTable} from "../features/visits/components/VisitTable.tsx";
import {checkOut, getAllActive} from "../api/visit.api.ts";

export function DashboardPage() {
    const [assignLockerOpen, setAssignLockerOpen] = useState(false);
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const [selectedVisit, setSelectedVisit] = useState<ActiveVisit | null>(null);
    const canAssignLocker = Boolean(selectedVisit);

    const [refreshCounter, setRefreshCounter] = useState(0);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<PageResponse<ActiveVisit> | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadActiveVisits();
    }, [page, pageSize, refreshCounter]);

    async function loadActiveVisits() {
        setLoading(true);
        try {
            const res = await getAllActive(page, pageSize);
            setData(res);
        } finally {
            setLoading(false);
        }
    }

    function handleAssignLocker() {
        if (!selectedVisit) {
            alert("Select an active visit first");
            return;
        }
        setAssignLockerOpen(true);
    }

    async function handleCheckout(visitId: number) {
        await checkOut(visitId);
        refreshData();
    }

    function refreshData() {
        setRefreshCounter(prev => prev + 1);
    }

    return (
        <AppLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-4xl mx-auto">
                <QuickActionsPanel
                    onCheckIn={() => setCheckInOpen(true)}
                    onRegisterCustomer={() => setRegisterOpen(true)}
                    onAssignLocker={handleAssignLocker}
                    onSearchCustomers={() => navigate("/customers")}
                    onSearchVisits={() => navigate("/visits")}
                    canAssignLocker={canAssignLocker}
                />

                <LockerSnapshot refreshTrigger={refreshCounter}/>
            </div>


            <div className="bg-slate-800 rounded p-3">
                <h2 className="font-semibold text-center text-xl mb-2">Active Visits</h2>
                <VisitsTable
                    variant="active"
                    data={data}
                    loading={loading}
                    getRowId={(row) => row.visitId}
                    onPageChange={(p, s) => { setPage(p); setPageSize(s); }}
                    onSelectVisit={setSelectedVisit}
                    onCheckOut={handleCheckout}
                />
            </div>

            <AssignLockerDialog
                open={assignLockerOpen}
                visit={selectedVisit}
                onClose={() => setAssignLockerOpen(false)}
                onSuccess={() => {
                    setAssignLockerOpen(false);
                    refreshData();
                }}
            />

            <CheckInDialog
                open={checkInOpen}
                onClose={() => setCheckInOpen(false)}
                onSuccess={() => {
                    setCheckInOpen(false);
                    refreshData()
                }}
            />

            <RegisterCustomerDialog
                open={registerOpen}
                onClose={() => setRegisterOpen(false)}
            />
        </AppLayout>
    );
}
