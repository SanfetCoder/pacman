import { GHOST_MOVE_DELAY } from "../configs/game.config";
import { useAppContext } from "../context/AppContext";
import { useControlGhostDirection } from "./useControlGhostDirection";
import { useUpdateGhostPosition } from "./useUpdateGhostPosition";

export function useControlGhostPosition() {
  const { ghostDirections, setGhostDirections, setGhostPositions } =
    useAppContext();

  useUpdateGhostPosition(setGhostPositions, ghostDirections, GHOST_MOVE_DELAY);

  useControlGhostDirection(setGhostDirections, ghostDirections);
}
