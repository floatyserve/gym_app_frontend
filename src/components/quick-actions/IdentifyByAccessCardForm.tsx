import { TextField, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { scanCardForCheckIn } from "../../api/visit.api";
import type { FrontDeskCheckInResponse } from "../../types/checkin/FrontDeskCheckInResponse.ts";

interface Props {
    onSuccess: (data: FrontDeskCheckInResponse) => void;
}

export function IdentifyByAccessCardForm({ onSuccess }: Props) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);
        setError("");

        try {
            const checkInData = await scanCardForCheckIn(code);
            setCode("");
            onSuccess(checkInData);
        } catch (err) {
            setError("Card not found or unassigned.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="Access card code"
                    autoFocus
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                        setError("");
                    }}
                    error={!!error}
                    helperText={error}
                    disabled={loading}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={!code.trim() || loading}
                >
                    {loading ? "Searching..." : "Proceed"}
                </Button>
            </Stack>
        </form>
    );
}