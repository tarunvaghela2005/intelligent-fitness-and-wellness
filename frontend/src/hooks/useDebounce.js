import { useState, useEffect } from "react";

// ==========================================
// useDebounce
// Delays updating a value until after the specified delay.
// Useful for search inputs and live validation.
// Usage: const debouncedValue = useDebounce(value, 400)
// ==========================================

function useDebounce(value, delay = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
