import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/auth.api.ts";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AuthLayout } from "../layouts/AuthLayout";
import type {ApiError} from "../types/api/ApiError.ts";
import {resolveErrorMessage} from "../api/errorResolver.ts";

export function ChangePasswordPage() {
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const passwordsEqual = (p1: string, p2: string) => p1 === p2;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!passwordsEqual(newPassword, confirmPassword)) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await changePassword({ oldPassword, newPassword });
            navigate("/");
        } catch (err: any) {
            const data = err.response?.data as ApiError | undefined;
            if (data) {
               setError(resolveErrorMessage(data));
            } else {
                setError("An error occurred");
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <AuthLayout
            title="Update Password"
            subtitle="You must change your password before continuing"
            error={error}
            onSubmit={handleSubmit}
        >
            <div className="space-y-4">
                <Input
                    type="password"
                    placeholder="Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" loading={loading} loadingText="Updating...">
                Change Password
            </Button>
        </AuthLayout>
    );
}