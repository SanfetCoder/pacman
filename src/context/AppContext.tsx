import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  INITIAL_GRID_MAP,
  INITIAL_PACMAN_POSITION,
} from "../configs/game.config";
import { useCheckGameLoss } from "../hooks/useCheckGameLoss";
import { useCheckGameStart } from "../hooks/useCheckGameStart";
import { useTimer } from "../hooks/useTimer";
import {
  randomSpawnPoint,
  generateLargeGrid,
  randomGhostSpawnPoints,
  randomDirection,
} from "../lib/util";
import { Direction, Grid, Position } from "../types/gameTypes";

type AppContextProps = {
  score: number;
  pacmanPosition: Position;
  ghostPositions: Position[];
  timeElapsed: number;
  grid: Grid;
  isGameStart: boolean | null;
  ghostDirections: Direction[];
  setScore: Dispatch<SetStateAction<number>>;
  setGrid: Dispatch<SetStateAction<Grid>>;
  setPacmanPosition: Dispatch<SetStateAction<Position>>;
  setGhostPositions: Dispatch<SetStateAction<Position[]>>;
  setGhostDirections: Dispatch<SetStateAction<Direction[]>>;
};

export const AppContext = createContext<AppContextProps | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [score, setScore] = useState<number>(0);

  const [grid, setGrid] = useState<Grid>(
    generateLargeGrid(15, 15) || INITIAL_GRID_MAP
  );

  const [pacmanPosition, setPacmanPosition] = useState<Position>(
    randomSpawnPoint(grid) || INITIAL_PACMAN_POSITION
  );

  const [ghostPositions, setGhostPositions] = useState<Position[]>(
    randomGhostSpawnPoints(grid, pacmanPosition, 3)
  );

  const [ghostDirections, setGhostDirections] = useState<Direction[]>(
    ghostPositions.map((_) => randomDirection())
  );

  const { isGameStart, setIsGameStart } = useCheckGameStart();

  const { milliSeconds: timeElapsed } = useTimer(isGameStart);

  useCheckGameLoss(setIsGameStart, pacmanPosition, ghostPositions);

  return (
    <AppContext.Provider
      value={{
        score,
        grid,
        isGameStart,
        pacmanPosition,
        ghostPositions,
        timeElapsed,
        ghostDirections,
        setScore,
        setGrid,
        setPacmanPosition,
        setGhostPositions,
        setGhostDirections,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const appContext = useContext(AppContext)!;

  if (!appContext) throw new Error("useAppContext requires AppContext");

  return appContext;
};
