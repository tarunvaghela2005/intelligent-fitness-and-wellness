const sizeStyles = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
};

function Loader({
    size = "md",
    text = "",
    fullScreen = false,
    className = "",
}) {
    const loader = (
        <div
            className={`
                flex
                items-center
                justify-center
                gap-3
                ${className}
            `}
            role="status"
            aria-label={text || "Loading"}
        >
            <span
                className={`
                    animate-spin
                    rounded-full
                    border-[var(--color-slate-200)]
                    border-t-[var(--color-brand)]
                    ${sizeStyles[size]}
                `}
                aria-hidden="true"
            />

            {text && (
                <span className="text-sm text-[var(--color-text-secondary)]">
                    {text}
                </span>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
                {loader}
            </div>
        );
    }

    return loader;
}

export default Loader;