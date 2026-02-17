import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Stack,
    Button,
} from "@mui/material";
import {useState} from "react";
import {registerCustomer} from "../../api/customer.api.ts";

interface Props {
    open: boolean;

    onClose(): void;
}

export function RegisterCustomerDialog({open, onClose}: Props) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accessCardCode, setAccessCardCode] = useState("");

    async function submit() {
         await registerCustomer(
             {
                 fullName,
                 email,
                 phoneNumber,
                 cardCode: accessCardCode
            });

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
                    <TextField
                        label="Access card code"
                        value={accessCardCode}
                        onChange={(e) => setAccessCardCode(e.target.value)}
                    />

                    <Button variant="contained" onClick={submit}>
                        Register
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
