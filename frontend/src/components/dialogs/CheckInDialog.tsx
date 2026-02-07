import {
    Dialog,
    DialogTitle,
    DialogContent,
    Tabs,
    Tab,
    Box,
} from "@mui/material";
import { useState } from "react";
import { CheckInByAccessCardForm } from "../quick-actions/CheckInByAccessCardForm.tsx";
import { CheckInByEmailForm } from "../quick-actions/CheckInByEmailForm.tsx";

interface Props {
    open: boolean;
    onClose(): void;
    onSuccess(): void;
}

export function CheckInDialog({ open, onClose, onSuccess }: Props) {
    const [tab, setTab] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Check in customer</DialogTitle>
            <DialogContent>
                <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                    <Tab label="Access card" />
                    <Tab label="Email" />
                </Tabs>

                <Box mt={2}>
                    {tab === 0 && (
                        <CheckInByAccessCardForm
                            onSuccess={onSuccess}
                        />
                    )}
                    {tab === 1 && (
                        <CheckInByEmailForm
                            onSuccess={onSuccess}
                        />
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
