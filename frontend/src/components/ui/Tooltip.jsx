function Tooltip({ text, children }) {
    return (
        <div className="group relative inline-flex">

            {children}

            <div
                role="tooltip"
                className="
                    pointer-events-none
                    absolute
                    bottom-full
                    left-1/2
                    z-50
                    mb-2
                    w-max
                    max-w-xs
                    -translate-x-1/2
                    scale-95
                    rounded-lg
                    bg-slate-900
                    px-3
                    py-2
                    text-xs
                    font-medium
                    leading-relaxed
                    text-white
                    opacity-0
                    shadow-lg
                    transition-all
                    duration-200
                    group-hover:scale-100
                    group-hover:opacity-100
                "
            >
                {text}

                {/* Small arrow */}
                <span
                    className="
                        absolute
                        left-1/2
                        top-full
                        -translate-x-1/2
                        border-4
                        border-transparent
                        border-t-slate-900
                    "
                />
            </div>

        </div>
    );
}

export default Tooltip;