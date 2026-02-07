import { TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { checkInByCustomerEmail } from "../../api/visit.api";

interface Props {
    onSuccess(): void;
}

export function CheckInByEmailForm({ onSuccess }: Props) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function submit() {
        setLoading(true);
        await checkInByCustomerEmail({ customerEmail: email });
        setEmail("");
        setLoading(false);
        onSuccess();
    }

    return (
        <Stack spacing={2}>
            <TextField
                label="Customer email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Button
                variant="contained"
                disabled={!email || loading}
                onClick={submit}
            >
                Check in
            </Button>
        </Stack>
    );
}
