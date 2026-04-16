import {useEffect, useState} from "react";
import type {Customer} from "../../../types/customer/Customer.ts";
import {getCustomerById, updateCustomer} from "../../../api/customer.api.ts";
import type {UpdateCustomerRequest} from "../../../types/customer/UpdateCustomerRequest.ts";
import toast from "react-hot-toast";
import {DetailsDialog} from "../../../components/dialogs/DetailsDialog.tsx";
import {Box, Button, TextField} from "@mui/material";

interface Props {
    customerId: number | null;
    onClose: () => void;
    onUpdate: () => void;
}

export function CustomerDetailsDialog({customerId, onClose, onUpdate}: Props) {
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editableCustomer, setEditableCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        if (!customerId) return;

        setLoading(true);
        getCustomerById(customerId)
            .then((data) => {
                setCustomer(data);
                setEditableCustomer(data);
            })
            .finally(() => setLoading(false));
    }, [customerId]);

    function handleCancelEdit() {
        setEditableCustomer(customer);
        setEditMode(false);
    }

    async function handleUpdate() {
        if (!customer || !editableCustomer) return;
        setUpdating(true);
        try {
            const updated = await updateCustomer(
                customer.id,
                {
                    fullName: editableCustomer.fullName,
                    phoneNumber: editableCustomer.phoneNumber,
                    email: editableCustomer.email,
                } as UpdateCustomerRequest
            );
            setCustomer(updated);
            setEditableCustomer(updated);
            setEditMode(false);
            toast.success("Customer updated");

            if (onUpdate) onUpdate();
        }
        finally {
            setUpdating(false);
        }
    }

    return (
        <DetailsDialog
            open={customerId !== null}
            title="Customer Details"
            onClose={() => {
                onClose();
                setEditMode(false);
            }}
            actions={
                editMode ? (
                    <>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                        <Button variant="contained" onClick={handleUpdate} disabled={updating}>
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setEditMode(true)}>Edit</Button>
                        <Button onClick={onClose}>Close</Button>
                    </>
                )
            }
        >
            {loading && <div>Loading...</div>}

            {!loading && editableCustomer && (
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                    <TextField
                        label="ID"
                        value={editableCustomer.id}
                        fullWidth
                        disabled
                    />

                    <TextField
                        label="Full Name"
                        value={editableCustomer.fullName}
                        fullWidth
                        disabled={!editMode}
                        onChange={(e) =>
                            setEditableCustomer({...editableCustomer, fullName: e.target.value})
                        }
                    />

                    <TextField
                        label="Email"
                        value={editableCustomer.email}
                        fullWidth
                        disabled={!editMode}
                        onChange={(e) =>
                            setEditableCustomer({...editableCustomer, email: e.target.value})
                        }
                    />

                    <TextField
                        label="Phone Number"
                        value={editableCustomer.phoneNumber}
                        fullWidth
                        disabled={!editMode}
                        onChange={(e) =>
                            setEditableCustomer({...editableCustomer, phoneNumber: e.target.value})
                        }
                    />

                    <TextField
                        label="Registered At"
                        value={new Date(editableCustomer.createdAt).toLocaleString()}
                        fullWidth
                        disabled
                    />

                    <TextField
                        label="Access Card Code"
                        value={editableCustomer.cardCode || "N/A"}
                        fullWidth
                        disabled
                    />
                </Box>
            )}
        </DetailsDialog>
    );
}