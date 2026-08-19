function Select({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    error = "",
    helperText = "",
    required = false,
    disabled = false,
    className = "",
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]"
                >
                    {label}

                    {required && (
                        <span className="ml-1 text-[var(--color-danger)]">
                            *
                        </span>
                    )}
                </label>
            )}

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                aria-invalid={Boolean(error)}
                aria-describedby={
                    error
                        ? `${name}-error`
                        : helperText
                            ? `${name}-helper`
                            : undefined
                }
                className={`
                    w-full
                    rounded-[var(--radius-md)]
                    border
                    bg-[var(--color-surface)]
                    px-4
                    py-2.5
                    text-sm
                    text-[var(--color-text-primary)]
                    outline-none
                    transition
                    duration-200
                    focus:ring-2
                    disabled:cursor-not-allowed
                    disabled:bg-[var(--color-slate-100)]
                    disabled:opacity-60
                    ${error
                        ? "border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-red-100"
                        : "border-[var(--border-color-default)] focus:border-[var(--border-color-focus)] focus:ring-[var(--color-primary-50)]"
                    }
                    ${className}
                `}
                {...props}
            >
                <option value="" disabled>
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p
                    id={`${name}-error`}
                    className="mt-1.5 text-sm text-[var(--color-danger)]"
                >
                    {error}
                </p>
            )}

            {!error && helperText && (
                <p
                    id={`${name}-helper`}
                    className="mt-1.5 text-sm text-[var(--color-text-muted)]"
                >
                    {helperText}
                </p>
            )}
        </div>
    );
}

export default Select;