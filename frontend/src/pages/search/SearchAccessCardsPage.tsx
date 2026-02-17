import {useState} from "react";
import {TextField, Button, MenuItem, Card, CardContent, Typography} from "@mui/material";
import {searchAccessCards} from "../../api/access-card.api.ts";
import {AppLayout} from "../../layouts/AppLayout.tsx";

export function SearchAccessCardsPage() {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [results, setResults] = useState<any[]>([]);

    async function handleSearch() {
        const response = await searchAccessCards({
            code: code || undefined,

            status: status || undefined,
        });

        setResults(response.items);
    }

    return (
        <AppLayout>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Search Access Cards
                    </Typography>

                    <div className="flex gap-4 mb-4">
                        <TextField
                            label="Card Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />

                        <TextField
                            select
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            sx={{minWidth: 150}}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                            <MenuItem value="LOST">LOST</MenuItem>
                            <MenuItem value="DAMAGED">DAMAGED</MenuItem>
                            <MenuItem value="BLOCKED">BLOCKED</MenuItem>
                        </TextField>

                        <TextField
                            type="number"
                            inputProps={{min: 1, step: 1}}
                            label="Customer ID"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}

                        />

                        <Button variant="contained" onClick={handleSearch}>
                            Search
                        </Button>
                    </div>

                    {results.map((card) => (
                        <div key={card.id}>
                            {card.code} — {card.status}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </AppLayout>
    );
}
