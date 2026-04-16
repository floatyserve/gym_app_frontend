import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    Chip,
    CircularProgress,
    Box
} from "@mui/material";
import type { FrontDeskCheckInResponse } from "../../types/checkin/FrontDeskCheckInResponse.ts";

interface Props {
    open: boolean;
    data: FrontDeskCheckInResponse | null;
    isLoading: boolean;
    onClose: () => void;
    onSellMembership: () => void;
    onConfirmCheckIn: () => void;
}

export function CheckInDialog({
                                  open,
                                  data,
                                  isLoading,
                                  onClose,
                                  onSellMembership,
                                  onConfirmCheckIn
                              }: Props) {
    if (!data) return null;

    const hasValidMembership = Boolean(
        data.membershipStatus === 'ACTIVE' &&
        (data.membershipType === 'UNLIMITED' || (data.remainingVisits !== null && data.remainingVisits > 0))
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Check In: {data.fullName}</DialogTitle>

            <DialogContent>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" p={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div className="space-y-4 py-2">
                        <section>
                            <Typography variant="subtitle2" color="textSecondary">Contact Info</Typography>
                            <Typography>{data.email}</Typography>
                        </section>

                        <Divider />

                        <section>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Active Membership
                            </Typography>
                            {data.membershipStatus ? (
                                <div className="bg-slate-700 p-3 rounded">
                                    <div className="flex justify-between items-center mb-2">
                                        <Typography variant="h6">
                                            {data.membershipType} ({data.membershipDuration})
                                        </Typography>
                                        <Chip
                                            label={data.membershipStatus}
                                            color={hasValidMembership ? "success" : "error"}
                                            size="small"
                                        />
                                    </div>

                                    {data.endsAt && (
                                        <Typography variant="body2">
                                            Valid until: {new Date(data.endsAt).toLocaleDateString()}
                                        </Typography>
                                    )}

                                    {data.membershipType === 'LIMITED' && (
                                        <Typography
                                            variant="body1"
                                            className={`mt-2 font-mono ${hasValidMembership ? 'text-blue-400' : 'text-red-400 font-bold'}`}
                                        >
                                            Visits Remaining: {data.remainingVisits} / {data.visitLimit}
                                        </Typography>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-red-900/20 p-3 border border-red-500/50 rounded">
                                    <Typography color="error">No active membership found.</Typography>
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </DialogContent>

            <DialogActions className="p-4">
                <Button variant="outlined" color="secondary" onClick={onSellMembership}>
                    Sell Membership
                </Button>
                <div className="grow" />
                <Button onClick={onClose} color="inherit">Cancel</Button>

                <Button
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    onClick={onConfirmCheckIn}
                >
                    Confirm Check-In
                </Button>
            </DialogActions>
        </Dialog>
    );
}