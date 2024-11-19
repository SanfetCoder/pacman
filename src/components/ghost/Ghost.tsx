import { motion } from "motion/react";
import { Position, Direction } from "../../types/gameTypes";
import { FC } from "react";
import style from "./style.module.css";
import "../../index.css";
type Props = {
  position: Position;
  cellSpace: number;
  gridGap: number;
  direction: Direction;
};

const Ghost: FC<Props> = ({ position, cellSpace, gridGap, direction }) => {
  const { x, y } = position;
  const ghostStyle = {
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
        src="/ghost.png"
        style={ghostStyle}
        className={`${style.ghost} ${direction}`}
      />
    </motion.div>
  );
};

export default Ghost;
