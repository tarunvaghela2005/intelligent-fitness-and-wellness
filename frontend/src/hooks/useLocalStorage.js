import { useState, useCallback } from "react";

// ==========================================
// useLocalStorage
// Persists state to localStorage with JSON serialization.
// Usage: const [value, setValue, removeValue] = useLocalStorage("key", defaultValue)
// ==========================================

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`useLocalStorage: error reading key "${key}"`, error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.warn(`useLocalStorage: error writing key "${key}"`, error);
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(() => {
        try {
            setStoredValue(initialValue);
            localStorage.removeItem(key);
        } catch (error) {
            console.warn(`useLocalStorage: error removing key "${key}"`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
