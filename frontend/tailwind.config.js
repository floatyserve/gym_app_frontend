/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--mui-palette-background-default)",
                paper: "var(--mui-palette-background-paper)",

                primary: "var(--mui-palette-text-primary)",
                secondary: "var(--mui-palette-text-secondary)",

                brand: {
                    main: "var(--mui-palette-primary-main)",
                    dark: "var(--mui-palette-primary-dark)",
                    contrast: "var(--mui-palette-primary-contrastText)",
                },

                error: "var(--mui-palette-error-main)",
                divider: "var(--mui-palette-divider)",
            },
        },
    },
    plugins: [],
};