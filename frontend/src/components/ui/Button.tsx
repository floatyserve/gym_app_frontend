import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: string;
}

export function Button({
                           children,
                           loading = false,
                           loadingText = "Please wait...",
                           className = "",
                           ...props
                       }: ButtonProps) {
    return (
        <button
            disabled={loading || props.disabled}
            className={`
                w-full p-3 rounded-xl font-bold text-white transition-all
                bg-blue-600 hover:bg-blue-500 
                shadow-lg shadow-blue-900/20
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
            {...props}
        >
            {loading ? loadingText : children}
        </button>
    );
}