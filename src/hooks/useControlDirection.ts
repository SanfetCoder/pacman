import { useState, useEffect } from "react";
import { Direction } from "../types/gameTypes";
import { useAppContext } from "../context/AppContext";

export function useControlDirection() {
  const { isGameStart } = useAppContext();
  const [direction, setDirection] = useState<Direction>("right");

  useEffect(() => {
    function handlePacmanDirection(event: KeyboardEvent) {
      if (!isGameStart) return;

      const pressedKey = event.key;

      switch (pressedKey) {
        case "ArrowUp":
          setDirection("up");
          break;
        case "ArrowDown":
          setDirection("down");
          break;
        case "ArrowLeft":
          setDirection("left");
          break;
        case "ArrowRight":
          setDirection("right");
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handlePacmanDirection);

    return () => {
      window.removeEventListener("keydown", handlePacmanDirection);
    };
  }, [direction, isGameStart]);

  return { direction };
}
