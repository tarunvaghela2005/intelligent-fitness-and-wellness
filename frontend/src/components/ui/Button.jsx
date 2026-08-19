const variantStyles = {
    primary:
        "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] focus:ring-[var(--color-primary-500)]",

    secondary:
        "bg-[var(--color-secondary-600)] text-white hover:bg-[var(--color-secondary-700)] focus:ring-[var(--color-secondary-500)]",

    outline:
        "border border-[var(--border-color-default)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-slate-100)] focus:ring-[var(--color-primary-500)]",

    ghost:
        "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-slate-100)] focus:ring-[var(--color-primary-500)]",

    danger:
        "bg-[var(--color-danger)] text-white hover:bg-red-700 focus:ring-red-500",

    ai:
        "bg-[var(--color-ai)] text-white hover:bg-[var(--color-ai-hover)] focus:ring-[var(--color-accent-500)]",
};

const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
};

function Button({
    children,
    variant = "primary",
    size = "md",
    type = "button",
    loading = false,
    disabled = false,
    className = "",
    ...props
}) {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-[var(--radius-md)]
                font-medium
                transition-colors
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}
            `}
            {...props}
        >
            {loading && (
                <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden="true"
                />
            )}

            {loading ? "Loading..." : children}
        </button>
    );
}

export default Button;