import { TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { checkInByAccessCard } from "../../api/visit.api";

interface Props {
    onSuccess(): void;
}

export function CheckInByAccessCardForm({ onSuccess }: Props) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    async function submit() {
        setLoading(true);
        await checkInByAccessCard({ accessCardCode: code });
        setCode("");
        setLoading(false);
        onSuccess();
    }

    return (
        <Stack spacing={2}>
            <TextField
                label="Access card code"
                autoFocus
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
            />

            <Button
                variant="contained"
                disabled={!code || loading}
                onClick={submit}
            >
                Check in
            </Button>
        </Stack>
    );
}
