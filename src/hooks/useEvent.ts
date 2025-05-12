import { useCallback, useLayoutEffect, useRef } from "react";

function useEvent<T extends (...args: any[]) => any>(handler: T) {
  const handlerRef = useRef<T>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Parameters<T>) => {
    const fn = handlerRef.current;
    if (!fn) {
      throw new Error("Handler is not defined");
    }
    return fn(...args);
  }, []);
}

export default useEvent;
