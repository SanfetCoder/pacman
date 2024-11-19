import { useEffect, useState } from "react";

const ONE_MILLI_SECONDS = 100;

export function useTimer(
  isGameStart: boolean | null,
  initialSeconds: number = 0
) {
  const [milliSeconds, setMilliSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    if (!isGameStart) return;

    const intervalId = setInterval(() => {
      setMilliSeconds((prev) => prev + ONE_MILLI_SECONDS);
    }, ONE_MILLI_SECONDS);

    return () => {
      clearInterval(intervalId);
    };
  }, [isGameStart]);

  return { milliSeconds };
}
