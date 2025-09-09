import { useEffect, useState } from "react";

export const useLocalState = <T,>(key: string, initialValue: T) => {
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) as T : initialValue;
  const [value, setValue] = useState<T>(parsedValue);

  const mergeValue = (patch: Partial<T>) => {
    setValue({ ...value, ...patch });
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return { value, setValue, mergeValue };
}