function Card({
    children,
    title,
    description,
    header,
    footer,
    padding = "md",
    hover = false,
    className = "",
    ...props
}) {
    const paddingStyles = {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    };

    return (
        <div
            className={`
                rounded-[var(--radius-xl)]
                border
                border-[var(--border-color-default)]
                bg-[var(--color-surface)]
                shadow-[var(--shadow-sm)]
                transition
                duration-200
                ${hover ? "hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]" : ""}
                ${paddingStyles[padding]}
                ${className}
            `}
            {...props}
        >
            {(title || description || header) && (
                <div
                    className={
                        padding === "none"
                            ? "border-b border-[var(--border-color-default)] p-6"
                            : "mb-5"
                    }
                >
                    {header ? (
                        header
                    ) : (
                        <>
                            {title && (
                                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                                    {title}
                                </h2>
                            )}

                            {description && (
                                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                                    {description}
                                </p>
                            )}
                        </>
                    )}
                </div>
            )}

            <div>{children}</div>

            {footer && (
                <div
                    className={`
                        mt-5
                        border-t
                        border-[var(--border-color-default)]
                        pt-4
                    `}
                >
                    {footer}
                </div>
            )}
        </div>
    );
}

export default Card;