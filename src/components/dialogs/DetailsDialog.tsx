import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider
} from "@mui/material";
import type {ReactNode} from "react";

interface DetailsDialogProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    actions?: ReactNode;
}

export function DetailsDialog({
                                  open,
                                  title,
                                  onClose,
                                  children,
                                  actions
                              }: DetailsDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <Divider/>
            <DialogContent sx={{pt: 3}}>
                {children}
            </DialogContent>
            <DialogActions>
                {actions ?? <Button onClick={onClose}>Close</Button>}
            </DialogActions>
        </Dialog>
    );
}