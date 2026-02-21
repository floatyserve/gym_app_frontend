import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
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
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>

            <DialogActions>
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