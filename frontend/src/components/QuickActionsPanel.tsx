import {Card, CardContent, CardHeader, Stack, Button} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface Props {
    onCheckIn(): void;
    onRegisterCustomer(): void;
    onAssignLocker(): void;
    onSearch(): void;
    canAssignLocker: boolean;
}

const COLORS = {
    bg: "#1e293b",
    text: "#e2e8f0",
    border: "#334155",
    primaryMain: "#1976d2",
};

export function QuickActionsPanel({
                                      onCheckIn,
                                      onRegisterCustomer,
                                      onAssignLocker,
                                      onSearch,
                                      canAssignLocker,
                                  }: Props) {

    const outlinedButtonStyle = {
        borderRadius: "12px",
        textTransform: "none",
        color: COLORS.text,
        borderColor: COLORS.border,
        "&:hover": {
            borderColor: "#94a3b8",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
        }
    };

    return (
        <Card
            sx={{
                backgroundColor: COLORS.bg,
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                color: COLORS.text,
            }}
        >
            <CardHeader
                title="Quick actions"
                titleTypographyProps={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    textAlign: "center",
                    color: COLORS.text
                }}
                sx={{ pb: 0 }}
            />

            <CardContent>
                <Stack spacing={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<LoginIcon />}
                        onClick={onCheckIn}
                        sx={{
                            borderRadius: "12px",
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                    >
                        Check in customer
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<SearchIcon />}
                        onClick={onSearch}
                        sx={outlinedButtonStyle}
                    >
                        Search customers / visits
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<LockIcon />}
                        disabled={!canAssignLocker}
                        onClick={onAssignLocker}
                        sx={outlinedButtonStyle}
                    >
                        Assign / reassign locker
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<PersonAddIcon />}
                        onClick={onRegisterCustomer}
                        sx={outlinedButtonStyle}
                    >
                        Register new customer
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}