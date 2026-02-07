import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";

interface SearchDialogProps {
    open: boolean;
    onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);

    function handleSearch() {
        // TODO: call your search API here and setResults
        setResults([`Demo result for "${query}"`]);
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Search Customers or Visits</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <TextField label="Search" value={query} onChange={e => setQuery(e.target.value)} fullWidth />
                    <Button variant="contained" onClick={handleSearch} disabled={!query.trim()}>Search</Button>

                    <List>
                        {results.map((r, i) => (
                            <ListItem key={i} divider>
                                <ListItemText primary={r} />
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
