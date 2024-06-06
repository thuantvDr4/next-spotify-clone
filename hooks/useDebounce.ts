import React, { useEffect, useState } from "react";

function useDebounce<T>(value: T, deplay?: number): T {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, deplay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [deplay, value]);

  return debounceValue;
}

export default useDebounce;
