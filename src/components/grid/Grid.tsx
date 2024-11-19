import { FC, HTMLAttributes } from "react";
import { useAppContext } from "../../context/AppContext";
import { useControlDirection } from "../../hooks/useControlDirection";
import { getGridSize, isScore, isWall } from "../../lib/util";
import { Grid as GridType } from "../../types/gameTypes";
import Pacman from "../pacman/Pacman";
import style from "./style.module.css";
import Ghost from "../ghost/Ghost";
import { useControlPacmanPosition } from "../../hooks/useControlPacmanPosition";
import { useControlGhostPosition } from "../../hooks/useControlGhostPosition";

type GridProps = {
  grid: GridType;
};

const CELL_SPACE = 50;
const GRID_GAP = 0;

const Grid: FC<GridProps> = ({ grid }) => {
  const { pacmanPosition, ghostPositions, ghostDirections } = useAppContext();

  const { columns } = getGridSize(grid);

  const gridStyle: HTMLAttributes<HTMLDivElement>["style"] = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${GRID_GAP}px`,
  };

  const cellGridStyle: HTMLAttributes<HTMLDivElement>["style"] = {
    width: `${CELL_SPACE}px`,
    height: `${CELL_SPACE}px`,
  };

  const { direction: pacmanDirection } = useControlDirection();

  useControlPacmanPosition(pacmanDirection);

  useControlGhostPosition();

  return (
    <div className={style.container}>
      <Pacman
        position={pacmanPosition}
        direction={pacmanDirection}
        cellSpace={CELL_SPACE}
        gridGap={GRID_GAP}
      />
      {ghostPositions.map((gp, gpIndex) => (
        <Ghost
          key={`ghost-${gpIndex}`}
          position={gp}
          direction={ghostDirections[gpIndex]}
          cellSpace={CELL_SPACE}
          gridGap={GRID_GAP}
        />
      ))}
      <div style={gridStyle}>
        {grid.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            return (
              <div
                style={cellGridStyle}
                key={`row-${rowIndex} col-${colIndex}`}
                className={`${
                  isWall(col) ? "wall" : isScore(col) ? "score" : "normal-tile"
                }`}
              ></div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Grid;
