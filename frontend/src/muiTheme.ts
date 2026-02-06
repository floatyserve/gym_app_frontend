import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#0f172a", // slate-900
            paper: "#1e293b",   // slate-800
        },
        text: {
            primary: "#e5e7eb", // slate-200
            secondary: "#94a3b8",
        },
    },
});
