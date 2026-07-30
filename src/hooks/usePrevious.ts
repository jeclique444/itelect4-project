import { useRef, useEffect } from "react";

// Generic T -- works for any state type (string, number, User, etc.)
function usePrevious<T>(value: T): T | undefined {
  // useRef<T | undefined>(undefined) stores the previous value
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;