import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
    cssVariables: true,
    palette: {
        mode: "dark",
        background: {
            default: "#0f172a",
            paper: "#1e293b",
        },
        primary: {
            main: "#3b82f6",
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: { root: { backgroundImage: "none" } },
        },
    },
});