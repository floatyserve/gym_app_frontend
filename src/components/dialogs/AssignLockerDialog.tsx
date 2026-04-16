import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Typography,
    Divider,
} from "@mui/material";
import {useState} from "react";
import {
    reassignLockerToVisitAutomatically,
    reassignLockerToVisitManually,
} from "../../api/locker.api.ts";
import type {ActiveVisit} from "../../types/visit/ActiveVisit.ts";

interface Props {
    open: boolean;
    visit: ActiveVisit | null;

    onClose(): void;

    onSuccess(): void;
}

export function AssignLockerDialog({
                                       open,
                                       visit,
                                       onClose,
                                       onSuccess,
                                   }: Props) {
    const [lockerNumber, setLockerNumber] = useState("");

    if (!visit) return null;

    const visitId = visit.visitId;

    async function assignAutomatically() {
        await reassignLockerToVisitAutomatically(visitId);
        onSuccess();
    }

    async function assignManually() {
        await reassignLockerToVisitManually(
            visitId,
            Number(lockerNumber)
        );
        onSuccess();
    }

    return (
        <>
            {visit && (
                <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                    <DialogTitle>Reassign locker</DialogTitle>

                    <DialogContent>
                        <Stack spacing={2}>
                            <Typography fontWeight={600}>
                                {visit.customerFullName}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Current locker:{" "}
                                {visit.lockerNumber ? `#${visit.lockerNumber}` : "None"}
                            </Typography>

                            <Divider/>

                            <Button
                                variant="contained"
                                onClick={assignAutomatically}
                            >
                                Reassign automatically
                            </Button>

                            <Divider/>

                            <TextField
                                label="Manual locker number"
                                type="number"
                                value={lockerNumber}
                                onChange={(e) => setLockerNumber(e.target.value)}
                            />

                            <Button
                                variant="outlined"
                                disabled={!lockerNumber}
                                onClick={assignManually}
                            >
                                Assign specific locker
                            </Button>
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={onClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}
