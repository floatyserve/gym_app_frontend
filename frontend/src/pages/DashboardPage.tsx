import {useState} from "react";
import {AppLayout} from "../layouts/AppLayout.tsx";
import {ActiveVisitsTable} from "../components/ActiveVisitsCard.tsx";
import {LockerSnapshot} from "../components/LockerSnapshot.tsx";
import {QuickActionsPanel} from "../components/QuickActionsPanel.tsx";
import {AssignLockerDialog} from "../components/dialogs/AssignLockerDialog.tsx";
import {CheckInDialog} from "../components/dialogs/CheckInDialog.tsx";
import {RegisterCustomerDialog} from "../components/dialogs/RegisterCustomerDialog.tsx";
import {SearchDialog} from "../components/dialogs/SearchDialog.tsx";
import type {ActiveVisit} from "../types/visit/ActiveVisit";

export function DashboardPage() {
    const [assignLockerOpen, setAssignLockerOpen] = useState(false);
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const [selectedVisit, setSelectedVisit] = useState<ActiveVisit | null>(null);
    const canAssignLocker = Boolean(selectedVisit);

    const [refreshCounter, setRefreshCounter] = useState(0);

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
            <QuickActionsPanel
                onCheckIn={() => setCheckInOpen(true)}
                onRegisterCustomer={() => setRegisterOpen(true)}
                onAssignLocker={handleAssignLocker}
                onSearch={() => setSearchOpen(true)}
                canAssignLocker={canAssignLocker}
            />

            <ActiveVisitsTable
                refreshTrigger={refreshCounter}
                onSelectVisit={setSelectedVisit}/>

            <LockerSnapshot
                refreshTrigger={refreshCounter}
            />

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

            <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)}/>
        </AppLayout>
    );
}
