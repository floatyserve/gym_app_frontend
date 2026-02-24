import {useState} from "react";
import type {OnboardWorkerRequest} from "../../../types/worker/OnboardWorkerRequest.ts";
import toast from "react-hot-toast";
import {onboardWorker} from "../../../api/worker.api.ts";
import {CreateEntityDialog} from "../../../components/dialogs/CreateEntityDialog.tsx";
import {Box, TextField} from "@mui/material";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

export function CreateWorkerDialog({open, onClose, onCreated}: Props) {
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState<OnboardWorkerRequest>({
        email: "",
        password: "",
        role: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDate: "",
    });

    async function handleSubmit() {
        if (Object.values(form).some(v => !v || !v.trim())) {
            toast.error("All fields are required");
            return;
        }

        setCreating(true);
        try {
            await onboardWorker(form);
            toast.success("Created new worker");
            onCreated();
            onClose();
        } finally {
            setCreating(false);
        }
    }

    return (
        <CreateEntityDialog
            open={open}
            title="Onboard Worker"
            onClose={onClose}
            onSubmit={handleSubmit}
            loading={creating}
        >
            <Box display="grid"
                 gridTemplateColumns={{xs: "1fr", md: "1fr 1fr"}}
                 gap={3}
            >
                <TextField
                    label="First Name"
                    fullWidth
                    value={form.firstName}
                    onChange={(e) => setForm({...form, firstName: e.target.value})}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    value={form.lastName}
                    onChange={(e) => setForm({...form, lastName: e.target.value})}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <TextField
                    label="Role"
                    fullWidth
                    value={form.role}
                    onChange={(e) => setForm({...form, role: e.target.value})}
                />
                <TextField
                    label="Phone Number"
                    fullWidth
                    value={form.phoneNumber}
                    onChange={(e) => setForm({...form, phoneNumber: e.target.value})}
                />
                <TextField
                    label="Birth Date"
                    type="date"
                    fullWidth
                    slotProps={{inputLabel: {shrink: true}}}
                    value={form.birthDate}
                    onChange={(e) => setForm({...form, birthDate: e.target.value})}
                />
            </Box>
        </CreateEntityDialog>
    );
}