import {useState} from "react";
import {AppLayout} from "../layouts/AppLayout.tsx";
import {Button} from "@mui/material";
import {WorkersTable} from "../features/staff/components/WorkersTable.tsx";
import {useWorkers} from "../features/staff/hooks/useWorkers.ts";
import {CreateWorkerDialog} from "../features/staff/components/CreateWorkerDialog.tsx";
import {WorkerDetailsDialog} from "../features/staff/components/WorkerDetailsDialog.tsx";

function StaffPage() {
    const {
        data,
        loading,
        page,
        pageSize,
        setPage,
        setPageSize,
        reload
    } = useWorkers();

    const [openCreate, setOpenCreate] = useState(false);
    const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);

    return (
        <AppLayout>
            <div className="bg-slate-800 rounded p-4">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Workers
                </h2>

                <div className="flex justify-center md:justify-end">
                    <Button
                        variant="contained"
                        onClick={() => setOpenCreate(true)}
                        sx={{margin: "0 auto", display: "block", mb: 2}}
                    >
                        Onboard Worker
                    </Button>
                </div>

                <WorkersTable
                    data={data}
                    loading={loading}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={(p, s) => {
                        setPage(p);
                        setPageSize(s);
                    }}
                    onDetails={(id) => setSelectedWorkerId(id)}
                />

                <CreateWorkerDialog
                    open={openCreate}
                    onClose={() => setOpenCreate(false)}
                    onCreated={reload}
                />

                <WorkerDetailsDialog
                    workerId={selectedWorkerId}
                    onClose={() => setSelectedWorkerId(null)}
                    onUpdated={reload}
                />
            </div>
        </AppLayout>
    );
}

export default StaffPage;