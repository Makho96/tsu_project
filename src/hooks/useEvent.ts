import { useCallback, useLayoutEffect, useRef } from "react";

function useEvent(handler: (...args: any[]) => unknown) {
  const handlerRef = useRef<(...args: any[]) => unknown>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: any) => {
    const fn = handlerRef.current;
    if (!fn) {
      throw new Error("Handler is not defined");
    }
    return fn(...args);
  }, []);
}

export default useEvent;
