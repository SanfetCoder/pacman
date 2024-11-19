import { useEffect, useState } from "react";

export function useCheckGameStart() {
  const [isGameStart, setIsGameStart] = useState<boolean | null>(null);

  useEffect(() => {
    function handleGameStart() {
      if (isGameStart === false) return;
      setIsGameStart(true);
    }

    window.addEventListener("keydown", handleGameStart);

    return () => {
      window.removeEventListener("keydown", handleGameStart);
    };
  }, [isGameStart]);

  return { isGameStart, setIsGameStart };
}
