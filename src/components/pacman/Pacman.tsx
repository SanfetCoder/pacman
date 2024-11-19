import { motion } from "motion/react";
import { FC } from "react";
import { Direction, Position } from "../../types/gameTypes";
import style from "./style.module.css";

type Props = {
  position: Position;
  direction: Direction;
  cellSpace: number;
  gridGap: number;
};

const Pacman: FC<Props> = ({ position, direction, cellSpace, gridGap }) => {
  const { x, y } = position;
  const pacmanStyle = {
    width: `${cellSpace}px`,
    height: `${cellSpace}px`,
  };
  return (
    <motion.div
      animate={{
        x: x * (cellSpace + gridGap),
        y: y * (cellSpace + gridGap),
      }}
      className={`${style.container}`}
    >
      <img
        src="/pacman.png"
        style={pacmanStyle}
        className={`${style.pacman} ${direction}`}
      />
    </motion.div>
  );
};

export default Pacman;
