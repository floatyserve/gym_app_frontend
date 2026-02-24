import { useEffect, useState } from "react";
import type { DetailedWorkerInfo} from "../../../types/worker/Worker.ts";
import { getWorkerById, updateWorker} from "../../../api/worker.api.ts";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { DetailsDialog } from "../../../components/dialogs/DetailsDialog.tsx";

interface Props {
    workerId: number | null;
    onClose: () => void;
    onUpdated?: () => void;
}

export function WorkerDetailsDialog({ workerId, onClose, onUpdated }: Props) {
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [worker, setWorker] = useState<DetailedWorkerInfo | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editableWorker, setEditableWorker] = useState<DetailedWorkerInfo | null>(null);

    useEffect(() => {
        if (!workerId) return;

        setLoading(true);
        getWorkerById(workerId)
            .then((data) => {
                setWorker(data);
                setEditableWorker(data);
            })
            .finally(() => setLoading(false));
    }, [workerId]);

    function handleCancelEdit() {
        setEditableWorker(worker);
        setEditMode(false);
    }

    async function handleUpdate() {
        if (!worker || !editableWorker) return;

        setUpdating(true);
        try {
            const updated = await updateWorker(worker.id, editableWorker);
            setWorker(updated);
            setEditableWorker(updated);
            setEditMode(false);
            toast.success("Worker updated");

            if (onUpdated) onUpdated();
        } finally {
            setUpdating(false);
        }
    }

    return (
        <DetailsDialog
            open={workerId !== null}
            title="Worker Details"
            onClose={() => {
                onClose();
                setEditMode(false);
            }}
            actions={
                editMode ? (
                    <>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                        <Button variant="contained" onClick={handleUpdate} disabled={updating}>
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setEditMode(true)}>Edit</Button>
                        <Button onClick={onClose}>Close</Button>
                    </>
                )
            }
        >
            {loading && <div>Loading...</div>}

            {!loading && editableWorker && (
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                    <TextField
                        label="Email"
                        value={editableWorker.email}
                        fullWidth
                        disabled={!editMode}
                        onChange={(e) =>
                            setEditableWorker({ ...editableWorker, email: e.target.value })
                        }
                    />

                    <TextField
                        select
                        label="Role"
                        value={editableWorker.role}
                        fullWidth
                        disabled={!editMode}
                        onChange={(e) =>
                            setEditableWorker({ ...editableWorker, role: e.target.value })
                        }
                    >
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="RECEPTIONIST">Receptionist</MenuItem>
                    </TextField>

                    <TextField
                        label="First Name"
                        value={editableWorker.firstName}
                        fullWidth
                        disabled={!editMode}
                        onChange={(e) =>
                            setEditableWorker({ ...editableWorker, firstName: e.target.value })
                        }
                    />

                    <TextField
                        label="Last Name"
                        value={editableWorker.lastName}
                        fullWidth
                        disabled={!editMode}
                        onChange={(e) =>
                            setEditableWorker({ ...editableWorker, lastName: e.target.value })
                        }
                    />

                    <TextField
                        label="Phone Number"
                        value={editableWorker.phoneNumber}
                        fullWidth
                        disabled={!editMode}
                        onChange={(e) =>
                            setEditableWorker({ ...editableWorker, phoneNumber: e.target.value })
                        }
                    />

                    <TextField
                        type="date"
                        label="Birth Date"
                        value={editableWorker.birthDate}
                        fullWidth
                        disabled={!editMode}
                        slotProps={{ inputLabel: { shrink: true } }}
                        onChange={(e) =>
                            setEditableWorker({ ...editableWorker, birthDate: e.target.value })
                        }
                    />

                    <TextField
                        type="date"
                        label="Hired At"
                        value={editableWorker.hiredAt}
                        fullWidth
                        disabled
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                </Box>
            )}
            //TODO: allow to deactivate/reactivate worker
        </DetailsDialog>
    );
}