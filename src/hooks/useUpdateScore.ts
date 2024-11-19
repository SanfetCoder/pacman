import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { isScore, removeScoreFromGrid } from "../lib/util";

export function useUpdateScore() {
  const {
    grid,
    isGameStart,
    pacmanPosition: currentPosition,
    setGrid,
    setScore,
  } = useAppContext();

  useEffect(() => {
    if (!isGameStart) return;

    const { x, y } = currentPosition;

    const currentPositionValue = grid[y][x];

    if (isScore(currentPositionValue)) {
      setGrid((prevGrid) => removeScoreFromGrid(prevGrid, currentPosition));

      setScore((prevScore) => prevScore + 1);
    }
  }, [currentPosition]);
}
