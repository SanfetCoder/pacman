import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import {
  getNextPosition,
  getPositionValue,
  isEndOfGrid,
  isWall,
  randomDirection,
} from "../lib/util";
import { Direction } from "../types/gameTypes";

export function useControlGhostDirection(
  directionSetter: Dispatch<SetStateAction<Direction[]>>,
  ghostDirections: Direction[]
) {
  const { grid, ghostPositions, timeElapsed } = useAppContext();

  useEffect(() => {
    for (let index = 0; index < ghostPositions.length; index++) {
      const ghostDirection = ghostDirections[index];
      const ghostPosition = ghostPositions[index];

      const nextPosition = getNextPosition(ghostDirection, ghostPosition, grid);

      const nextPositionValue = getPositionValue(grid, nextPosition);

      if (
        isEndOfGrid(ghostPosition, grid, ghostDirection) ||
        isWall(nextPositionValue) ||
        isWall(getPositionValue(grid, ghostPosition))
      ) {
        directionSetter((currentDirections) =>
          currentDirections.map((cd, cdIndex) =>
            index === cdIndex ? randomDirection([cd]) : cd
          )
        );
      }
    }
  }, [grid, ghostPositions, ghostDirections, timeElapsed]);
}
