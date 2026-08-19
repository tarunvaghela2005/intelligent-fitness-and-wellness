import { useEffect } from "react";

const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
};

function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = "md",
    closeOnOverlayClick = true,
    showCloseButton = true,
}) {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = (event) => {
        if (
            closeOnOverlayClick &&
            event.target === event.currentTarget
        ) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="presentation"
            onMouseDown={handleOverlayClick}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby={
                    description ? "modal-description" : undefined
                }
                className={`
                    w-full
                    ${sizeStyles[size]}
                    max-h-[90vh]
                    overflow-y-auto
                    rounded-[var(--radius-xl)]
                    border
                    border-[var(--border-color-default)]
                    bg-[var(--color-surface)]
                    shadow-[var(--shadow-xl)]
                `}
            >
                <div className="flex items-start justify-between border-b border-[var(--border-color-default)] px-6 py-4">
                    <div className="pr-4">
                        {title && (
                            <h2
                                id="modal-title"
                                className="text-lg font-semibold text-[var(--color-text-primary)]"
                            >
                                {title}
                            </h2>
                        )}

                        {description && (
                            <p
                                id="modal-description"
                                className="mt-1 text-sm text-[var(--color-text-secondary)]"
                            >
                                {description}
                            </p>
                        )}
                    </div>

                    {showCloseButton && (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close modal"
                            className="
                                rounded-[var(--radius-md)]
                                p-2
                                text-[var(--color-text-muted)]
                                transition
                                hover:bg-[var(--color-slate-100)]
                                hover:text-[var(--color-text-primary)]
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[var(--color-primary-500)]
                            "
                        >
                            <span
                                aria-hidden="true"
                                className="text-xl leading-none"
                            >
                                ×
                            </span>
                        </button>
                    )}
                </div>

                <div className="px-6 py-5">
                    {children}
                </div>

                {footer && (
                    <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[var(--border-color-default)] px-6 py-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;