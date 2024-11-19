import { PAC_MAN_MOVE_DELAY } from "../configs/game.config";
import { useAppContext } from "../context/AppContext";
import { Direction } from "../types/gameTypes";
import { useUpdatePosition } from "./useUpdatePosition";
import { useUpdateScore } from "./useUpdateScore";

export function useControlPacmanPosition(direction: Direction) {
  const { setPacmanPosition } = useAppContext();

  useUpdateScore();

  useUpdatePosition(setPacmanPosition, direction, PAC_MAN_MOVE_DELAY);
}
