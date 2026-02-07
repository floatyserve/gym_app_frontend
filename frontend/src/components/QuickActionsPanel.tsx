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

export function QuickActionsPanel({
                                      onCheckIn,
                                      onRegisterCustomer,
                                      onAssignLocker,
                                      onSearch,
                                      canAssignLocker,
                                  }: Props) {
    return (
        <Card>
            <CardHeader title="Quick actions"/>
            <CardContent>
                <Stack spacing={2}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<LoginIcon/>}
                        onClick={onCheckIn}
                    >
                        Check in customer
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<SearchIcon/>}
                        onClick={onSearch}
                    >
                        Search customers / visits
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<LockIcon/>}
                        disabled={!canAssignLocker}
                        onClick={onAssignLocker}
                    >
                        Assign / reassign locker
                    </Button>

                    <Button
                        variant="text"
                        startIcon={<PersonAddIcon/>}
                        onClick={onRegisterCustomer}
                    >
                        Register new customer
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
