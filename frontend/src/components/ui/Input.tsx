import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = "", ...props }: InputProps) {
    const inputStyles = `
        w-full p-3 rounded-xl outline-none transition-all
        bg-slate-900 text-slate-100 border border-slate-700
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        placeholder:text-slate-500
        ${className}
    `;

    return (
        <input
            className={inputStyles.trim()}
            {...props}
        />
    );
}