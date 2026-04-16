import {
    Dialog,
    DialogTitle,
    DialogContent,
    Tabs,
    Tab,
    Box,
} from "@mui/material";
import {useState} from "react";
import {IdentifyByAccessCardForm} from "../quick-actions/IdentifyByAccessCardForm.tsx";
import {IdentifyByEmailForm} from "../quick-actions/IdentifyByEmailForm.tsx";
import type {FrontDeskCheckInResponse} from "../../types/checkin/FrontDeskCheckInResponse.ts";

interface Props {
    open: boolean;
    onClose(): void;
    onIdentified(data: FrontDeskCheckInResponse): void;
}

export function IdentifyCustomerDialog({open, onClose, onIdentified}: Props) {
    const [tab, setTab] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Check in customer</DialogTitle>
            <DialogContent>
                <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                    <Tab label="Access card"/>
                    <Tab label="Email"/>
                </Tabs>

                <Box mt={2}>
                    {tab === 0 && (
                        <IdentifyByAccessCardForm
                            onSuccess={onIdentified}
                        />
                    )}
                    {tab === 1 && (
                        <IdentifyByEmailForm
                            onSuccess={onIdentified}
                        />
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}