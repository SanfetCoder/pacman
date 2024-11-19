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

export function useUpdateGhostPosition(
  positionSetter: Dispatch<SetStateAction<Position[]>>,
  ghostDirections: Direction[],
  movementDelay: number
) {
  const { grid, isGameStart } = useAppContext();

  useEffect(() => {
    if (!isGameStart) return;

    const intervalId = setInterval(() => {
      positionSetter((prevPositions) => {
        let finalPositions: Position[] = [];

        for (let index = 0; index < ghostDirections.length; index++) {
          const position = prevPositions[index];
          const direction = ghostDirections[index];

          if (isEndOfGrid(position, grid, direction))
            finalPositions.push(position);

          const { x: nextX, y: nextY } = getNextPosition(
            direction,
            position,
            grid
          );

          const nextPositionValue = grid[nextY][nextX];

          if (isWall(nextPositionValue)) finalPositions.push(position);

          finalPositions.push({
            x: position.x + getXPosition(direction),
            y: position.y + getYPosition(direction),
          });
        }

        return finalPositions;
      });
    }, movementDelay);

    return () => {
      clearInterval(intervalId);
    };
  }, [ghostDirections, grid, isGameStart]);
}
