import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@mui/material";
import {muiTheme} from "./muiTheme.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={muiTheme}>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
