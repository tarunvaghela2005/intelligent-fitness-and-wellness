function EmptyState({
    icon = "📭",
    title = "No data found",
    description,
    action,
    size = "md",
    className = "",
}) {
    const sizeStyles = {
        sm: {
            container: "py-8",
            icon: "text-3xl",
            title: "text-base",
            description: "text-sm",
        },

        md: {
            container: "py-12",
            icon: "text-4xl",
            title: "text-lg",
            description: "text-sm",
        },

        lg: {
            container: "py-16",
            icon: "text-5xl",
            title: "text-xl",
            description: "text-base",
        },
    };

    const styles = sizeStyles[size] || sizeStyles.md;

    return (
        <div
            className={`
                flex
                flex-col
                items-center
                justify-center
                text-center
                ${styles.container}
                ${className}
            `}
        >
            <div
                className={`
                    mb-4
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--color-slate-100)]
                    ${styles.icon}
                `}
                aria-hidden="true"
            >
                {icon}
            </div>

            <h2
                className={`
                    font-semibold
                    text-[var(--color-text-primary)]
                    ${styles.title}
                `}
            >
                {title}
            </h2>

            {description && (
                <p
                    className={`
                        mt-2
                        max-w-md
                        text-[var(--color-text-secondary)]
                        ${styles.description}
                    `}
                >
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-5">
                    {action}
                </div>
            )}
        </div>
    );
}

export default EmptyState;