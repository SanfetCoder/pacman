import { Position } from "../types/gameTypes";

export const SCORE_TILE = 2;
export const WALL_TILE = 1;
export const NORMAL_TILE = 0;

export const INITIAL_GRID_MAP = [
  [
    SCORE_TILE,
    SCORE_TILE,
    SCORE_TILE,
    WALL_TILE,
    WALL_TILE,
    WALL_TILE,
    WALL_TILE,
  ],
  [
    SCORE_TILE,
    WALL_TILE,
    NORMAL_TILE,
    NORMAL_TILE,
    WALL_TILE,
    WALL_TILE,
    WALL_TILE,
  ],
  [
    SCORE_TILE,
    WALL_TILE,
    SCORE_TILE,
    NORMAL_TILE,
    WALL_TILE,
    WALL_TILE,
    WALL_TILE,
  ],
  [
    WALL_TILE,
    SCORE_TILE,
    NORMAL_TILE,
    WALL_TILE,
    WALL_TILE,
    WALL_TILE,
    WALL_TILE,
  ],
];

export const INITIAL_PACMAN_POSITION: Position = {
  x: 1,
  y: 0,
};

export const PAC_MAN_MOVE_DELAY = 125;

export const GHOST_MOVE_DELAY = 125;
