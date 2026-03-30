  import { useCallback, useRef } from "react"

  type GenericFunction = (...args: any[]) => void

  export function useDebounce<T extends GenericFunction>(func: T, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    return useCallback(
      (...args: Parameters<T>): void => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          func(...args)
        }, delay)
      },
      [func, delay]
    )
  }
