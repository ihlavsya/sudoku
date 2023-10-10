import { useState, useEffect } from 'react';

// Custom hook for using localStorage or sessionStorage
function useStorage<T>(key: string, initialValue: T | null, storage: any): [T, (value: T) => void] {
    // Initialize state with the value from storage, or with the initial value
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Get the item from storage by key
            const item = storage.getItem(key);
            // Parse stored JSON or return initialValue if not found
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // Return initialValue on error
            console.error(error);
            return initialValue;
        }
    });

    // Update the storage value whenever the state changes
    useEffect(() => {
        try {
            // Serialize the state value to JSON and store it in storage
            storage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useStorage;
