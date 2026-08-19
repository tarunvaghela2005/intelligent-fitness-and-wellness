const variantStyles = {
    success: {
        container:
            "border-green-200 bg-green-50 text-green-800",
        icon:
            "bg-green-100 text-green-700",
    },

    warning: {
        container:
            "border-amber-200 bg-amber-50 text-amber-800",
        icon:
            "bg-amber-100 text-amber-700",
    },

    danger: {
        container:
            "border-red-200 bg-red-50 text-red-800",
        icon:
            "bg-red-100 text-red-700",
    },

    info: {
        container:
            "border-sky-200 bg-sky-50 text-sky-800",
        icon:
            "bg-sky-100 text-sky-700",
    },
};

const icons = {
    success: "✓",
    warning: "!",
    danger: "×",
    info: "i",
};

function Alert({
    variant = "info",
    title,
    children,
    onClose,
    className = "",
    ...props
}) {
    const styles = variantStyles[variant] || variantStyles.info;

    return (
        <div
            role="alert"
            className={`
                flex
                items-start
                gap-3
                rounded-[var(--radius-lg)]
                border
                p-4
                ${styles.container}
                ${className}
            `}
            {...props}
        >
            <div
                className={`
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    font-bold
                    ${styles.icon}
                `}
                aria-hidden="true"
            >
                {icons[variant]}
            </div>

            <div className="min-w-0 flex-1">
                {title && (
                    <h3 className="font-semibold">
                        {title}
                    </h3>
                )}

                <div
                    className={`
                        text-sm
                        ${title ? "mt-1" : ""}
                    `}
                >
                    {children}
                </div>
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close alert"
                    className="
                        shrink-0
                        rounded-[var(--radius-md)]
                        px-2
                        py-1
                        text-lg
                        leading-none
                        opacity-70
                        transition
                        hover:bg-black/5
                        hover:opacity-100
                        focus:outline-none
                        focus:ring-2
                        focus:ring-current
                    "
                >
                    ×
                </button>
            )}
        </div>
    );
}

export default Alert;