import * as React from "react";
import { Header } from "../components/Header.tsx";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AppLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => setOpen(prev => !prev);

    return (
        <>
            <Header onMenuClick={toggleDrawer} />

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
            >
                <List sx={{ width: 250 }}>
                    <ListItemButton onClick={() => navigate("/access-cards")}>
                        <ListItemText primary="Access Cards" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/lockers")}>
                        <ListItemText primary="Lockers" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/customers")}>
                        <ListItemText primary="Customers" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/staff")}>
                        <ListItemText primary="Workers" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate("/visits")}>
                        <ListItemText primary="Visits" />
                    </ListItemButton>
                </List>
            </Drawer>

            <div className="min-h-screen bg-paper text-primary">
                <main className="p-4">
                    {children}
                </main>
            </div>
        </>
    );
}
