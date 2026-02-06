import {AppLayout} from "../layouts/AppLayout.tsx";
import {ActiveVisitsTable} from "../components/ActiveVisitsCard.tsx";
import {LockerSnapshot} from "../components/LockerSnapshot.tsx";

export function DashboardPage() {
    return (
        <>
            <AppLayout>
                <ActiveVisitsTable/>
                <LockerSnapshot/>
            </AppLayout>
        </>
    );
}