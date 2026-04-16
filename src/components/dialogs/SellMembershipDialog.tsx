import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Stack
} from "@mui/material";
import React, { useState } from "react";
import { createMembership } from "../../api/membership.api.ts";
import type { MembershipType, MembershipDuration } from "../../types/membership/MembershipTypes.ts";
import type { FrontDeskCheckInResponse } from "../../types/checkin/FrontDeskCheckInResponse.ts";

interface Props {
    open: boolean;
    customerData: FrontDeskCheckInResponse | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function SellMembershipDialog({ open, customerData, onClose, onSuccess }: Props) {
    const [type, setType] = useState<MembershipType>('UNLIMITED');
    const [duration, setDuration] = useState<MembershipDuration>('MONTH');
    const [visitLimit, setVisitLimit] = useState<number>(10);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!customerData) return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        if (!customerData) {
            console.error("CRITICAL: Attempted to submit membership without customer data.");
            alert("An unexpected error occurred. Please close this dialog and try scanning the card again.");
            return;
        }

        try {
            await createMembership({
                customerId: customerData.customerId,
                type: type,
                duration: duration,
                visitLimit: type === 'LIMITED' ? visitLimit : undefined,
            });

            onSuccess();
        } catch (error) {
            console.debug("Membership creation failed, handled by interceptor.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Sell Membership</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={3} mt={1}>
                        <TextField
                            label="Customer"
                            value={customerData.fullName}
                            disabled
                            fullWidth
                        />

                        <TextField
                            select
                            label="Membership Type"
                            value={type}
                            onChange={(e) => setType(e.target.value as MembershipType)}
                            fullWidth
                        >
                            <MenuItem value="UNLIMITED">Unlimited Visits</MenuItem>
                            <MenuItem value="LIMITED">Limited Visits</MenuItem>
                        </TextField>

                        <TextField
                            select
                            label="Duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value as MembershipDuration)}
                            fullWidth
                        >
                            <MenuItem value="MONTH">1 Month</MenuItem>
                            <MenuItem value="YEAR">1 Year</MenuItem>
                        </TextField>

                        {type === 'LIMITED' && (
                            <TextField
                                label="Number of Visits"
                                type="number"
                                value={visitLimit}
                                onChange={(e) => setVisitLimit(Number(e.target.value))}
                                fullWidth
                                required
                                inputProps={{ min: 1 }}
                            />
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} color="inherit" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Complete Sale"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}