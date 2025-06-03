import { useState } from "react";

const TextareaField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    maxLength,
    minLength,
    error,
    disabled,
    className = "",
    rows = 4,
}) => {
    return (
        <div className="relative text-text-white">
            <label className="block text-xs text-text-white">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder || label}
                maxLength={maxLength}
                minLength={minLength}
                disabled={disabled}
                rows={rows}
                className={`mt-1 block w-full text-text-white text-xs bg-[#ffffff13] backdrop-blur-md placeholder:text-text-white border-white rounded shadow-sm border p-2 outline-none transition-all duration-300
        ${error ? "border-red-500" : ""}
        ${disabled ? "bg-[#ffffff13] backdrop-blur-md1 cursor-not-allowed opacity-60" : ""}
        ${className}
        `}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default TextareaField;
