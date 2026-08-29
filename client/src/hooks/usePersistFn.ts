import { useRef, useLayoutEffect, useEffect, useCallback } from "react";

type noop = (...args: any[]) => any;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * usePersistFn returns a function with a stable identity while always invoking the latest callback.
 */
export function usePersistFn<T extends noop>(fn: T): T {
  const fnRef = useRef<T>(fn);

  useIsomorphicLayoutEffect(() => {
    fnRef.current = fn;
  });

  return useCallback(((...args: any[]) => {
    return fnRef.current(...args);
  }) as T, []);
}
