import { TextField, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { scanEmailForCheckIn } from "../../api/visit.api";
import type { FrontDeskCheckInResponse } from "../../types/checkin/FrontDeskCheckInResponse.ts";

interface Props {
    onSuccess: (data: FrontDeskCheckInResponse) => void;
}

export function IdentifyByEmailForm({ onSuccess }: Props) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email.trim()) return;

        setLoading(true);
        setError("");

        try {
            const checkInData = await scanEmailForCheckIn(email);
            setEmail("");
            onSuccess(checkInData);
        } catch (err) {
            setError("Customer not found.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="Customer email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    error={!!error}
                    helperText={error}
                    disabled={loading}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={!email.trim() || loading}
                >
                    {loading ? "Searching..." : "Proceed"}
                </Button>
            </Stack>
        </form>
    );
}