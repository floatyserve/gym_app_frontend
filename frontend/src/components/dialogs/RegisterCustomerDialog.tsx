import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Stack,
    Button,
} from "@mui/material";
import {useState} from "react";
import {createCustomer} from "../../api/customer.api.ts";

interface Props {
    open: boolean;

    onClose(): void;
}
//TODO: add access card on registration
export function RegisterCustomerDialog({open, onClose}: Props) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    async function submit() {
        await createCustomer({fullName, email, phoneNumber});
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Register customer</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <Button variant="contained" onClick={submit}>
                        Register
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
