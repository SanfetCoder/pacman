import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import {
  getNextPosition,
  getXPosition,
  getYPosition,
  isEndOfGrid,
  isWall,
} from "../lib/util";
import { Direction, Position } from "../types/gameTypes";

export function useUpdatePosition(
  positionSetter: Dispatch<SetStateAction<Position>>,
  direction: Direction,
  movementDelay: number
) {
  const { grid, isGameStart } = useAppContext();

  useEffect(() => {
    if (!isGameStart) return;

    const intervalId = setInterval(() => {
      positionSetter((prevPosition) => {
        if (isEndOfGrid(prevPosition, grid, direction)) return prevPosition;

        const { x: nextX, y: nextY } = getNextPosition(
          direction,
          prevPosition,
          grid
        );

        const nextPositionValue = grid[nextY][nextX];

        if (isWall(nextPositionValue)) return prevPosition;

        return {
          x: prevPosition.x + getXPosition(direction),
          y: prevPosition.y + getYPosition(direction),
        };
      });
    }, movementDelay);

    return () => {
      clearInterval(intervalId);
    };
  }, [direction, grid, isGameStart]);
}
