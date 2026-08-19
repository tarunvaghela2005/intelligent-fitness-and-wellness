const variantStyles = {
    primary:
        "bg-[var(--color-primary-50)] text-[var(--color-primary-700)]",

    secondary:
        "bg-[var(--color-secondary-50)] text-[var(--color-secondary-700)]",

    success:
        "bg-green-50 text-green-700",

    warning:
        "bg-amber-50 text-amber-700",

    danger:
        "bg-red-50 text-red-700",

    info:
        "bg-sky-50 text-sky-700",

    ai:
        "bg-[var(--color-ai-light)] text-[var(--color-ai)]",

    neutral:
        "bg-[var(--color-slate-100)] text-[var(--color-slate-700)]",
};

const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm",
};

function Badge({
    children,
    variant = "neutral",
    size = "md",
    className = "",
    ...props
}) {
    return (
        <span
            className={`
                inline-flex
                items-center
                justify-center
                rounded-[var(--radius-full)]
                font-medium
                whitespace-nowrap
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}
            `}
            {...props}
        >
            {children}
        </span>
    );
}

export default Badge;