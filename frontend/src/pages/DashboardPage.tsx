import {useState} from "react";
import {AppLayout} from "../layouts/AppLayout.tsx";
import {ActiveVisitsTable} from "../components/ActiveVisitsCard.tsx";
import {LockerSnapshot} from "../components/LockerSnapshot.tsx";
import {QuickActionsPanel} from "../components/QuickActionsPanel.tsx";
import {AssignLockerDialog} from "../components/dialogs/AssignLockerDialog.tsx";
import {CheckInDialog} from "../components/dialogs/CheckInDialog.tsx";
import {RegisterCustomerDialog} from "../features/customers/components/RegisterCustomerDialog.tsx";
import type {ActiveVisit} from "../types/visit/ActiveVisit";
import {useNavigate} from "react-router-dom";

export function DashboardPage() {
    const [assignLockerOpen, setAssignLockerOpen] = useState(false);
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const [selectedVisit, setSelectedVisit] = useState<ActiveVisit | null>(null);
    const canAssignLocker = Boolean(selectedVisit);

    const [refreshCounter, setRefreshCounter] = useState(0);

    const navigate = useNavigate();

    function handleAssignLocker() {
        if (!selectedVisit) {
            alert("Select an active visit first");
            return;
        }
        setAssignLockerOpen(true);
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
                    onSearch={() => navigate("/customers")}
                    canAssignLocker={canAssignLocker}
                />

                <LockerSnapshot refreshTrigger={refreshCounter}/>
            </div>


            <ActiveVisitsTable
                refreshTrigger={refreshCounter}
                onSelectVisit={setSelectedVisit}/>

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
