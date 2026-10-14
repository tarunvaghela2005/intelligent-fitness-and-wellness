import { useState, useEffect, useCallback, useRef } from "react";

// ==========================================
// useFetch
// Generic data-fetching hook with loading, error, and refetch support.
// Accepts an async fetcher function and optional dependencies.
// Usage:
//   const { data, loading, error, refetch } = useFetch(() => getWorkouts(), [])
// ==========================================

function useFetch(fetcherFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use a ref to prevent state updates after unmount
    const isMountedRef = useRef(true);

    const execute = useCallback(async () => {
        if (!isMountedRef.current) return;

        setLoading(true);
        setError(null);

        try {
            const result = await fetcherFn();
            if (isMountedRef.current) {
                setData(result);
            }
        } catch (err) {
            if (isMountedRef.current) {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "An unexpected error occurred.";
                setError(message);
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        isMountedRef.current = true;
        execute();

        return () => {
            isMountedRef.current = false;
        };
    }, [execute]);

    return { data, loading, error, refetch: execute };
}

export default useFetch;
