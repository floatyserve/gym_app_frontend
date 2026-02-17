import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@mui/material";
import {muiTheme} from "./muiTheme.ts";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 5000
            }}
        >
        </Toaster>
        <ThemeProvider theme={muiTheme}>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
