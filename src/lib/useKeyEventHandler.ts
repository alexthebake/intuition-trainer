import { useEffect } from "react";

export function useKeyEventHandler(key: string, callback: () => void) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [key, callback]);
}
