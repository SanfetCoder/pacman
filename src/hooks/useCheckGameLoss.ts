import { Dispatch, SetStateAction, useEffect } from "react";
import { isPositionOccupied } from "../lib/util";
import { Position } from "../types/gameTypes";

export function useCheckGameLoss(
  gameStartSetter: Dispatch<SetStateAction<boolean | null>>,
  pacmanPosition: Position,
  ghostPositions: Position[]
) {
  useEffect(() => {
    for (const ghostPosition of ghostPositions) {
      if (isPositionOccupied(pacmanPosition, ghostPosition)) {
        gameStartSetter((_) => false);
      }
    }
  }, [pacmanPosition, ghostPositions]);
}
