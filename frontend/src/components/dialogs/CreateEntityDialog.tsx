import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider
} from "@mui/material";
import type {ReactNode} from "react";

interface CreateEntityDialogProps {
    open: boolean;
    title: string;
    onClose: () => void;
    onSubmit: () => void;
    submitLabel?: string;
    loading?: boolean;
    children: ReactNode;
}

export function CreateEntityDialog({
                                       open,
                                       title,
                                       onClose,
                                       onSubmit,
                                       submitLabel = "Create",
                                       loading = false,
                                       children,
                                   }: CreateEntityDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ pb: 1 }}>
                {title}
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3 }}>
                {children}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    disabled={loading}
                >
                    {submitLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}