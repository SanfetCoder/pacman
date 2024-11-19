import { SCORE_TILE } from "../configs/game.config";
import { Direction, Grid, Position } from "../types/gameTypes";

export function isWall(positionValue: number): boolean {
  if (positionValue !== 1 && positionValue !== 0 && positionValue !== 2)
    throw new Error("Invalid position value. Expect 0 or 1 or 2");
  return positionValue === 1;
}

export function isScore(positionValue: number): boolean {
  if (positionValue !== 1 && positionValue !== 0 && positionValue !== 2)
    throw new Error("Invalid position value. Expect 0 or 1 or 2");
  return positionValue === 2;
}

export function isEndOfGrid(
  currentPosition: Position,
  grid: Grid,
  direction: Direction
): boolean {
  const { rows, columns } = getGridSize(grid);

  const { x, y } = currentPosition;

  switch (direction) {
    case "down":
      return y >= rows - 1;
    case "left":
      return x <= 0;
    case "right":
      return x >= columns - 1;
    case "up":
      return y <= 0;
  }
}

export function getGridSize(grid: Grid): { rows: number; columns: number } {
  return {
    rows: grid.length,
    columns: grid[0].length,
  };
}

export function getXPosition(direction: Direction) {
  switch (direction) {
    case "left":
      return -1;
    case "right":
      return 1;
    default:
      return 0;
  }
}

export function getYPosition(direction: Direction) {
  switch (direction) {
    case "up":
      return -1;
    case "down":
      return 1;
    default:
      return 0;
  }
}

export function getNextPosition(
  direction: Direction,
  currentPosition: Position,
  grid: Grid
): Position {
  if (isEndOfGrid(currentPosition, grid, direction)) return currentPosition;

  switch (direction) {
    case "up":
      return {
        ...currentPosition,
        y: currentPosition.y - 1,
      };
    case "down":
      return {
        ...currentPosition,
        y: currentPosition.y + 1,
      };
    case "left":
      return {
        ...currentPosition,
        x: currentPosition.x - 1,
      };
    case "right":
      return {
        ...currentPosition,
        x: currentPosition.x + 1,
      };
  }
}

export function removeScoreFromGrid(grid: Grid, currentPosition: Position) {
  const { x, y } = currentPosition;
  return grid.map((row, rowIndex) =>
    row.map((_, colIndex) =>
      y === rowIndex && x === colIndex ? 0 : grid[rowIndex][colIndex]
    )
  );
}

export function randomNumber(excludedMaxNumber: number) {
  return Math.floor(Math.random() * excludedMaxNumber);
}

export function randomSpawnPoint(grid: Grid): Position {
  let x: number, y: number, positionValue: number;

  const { rows, columns } = getGridSize(grid);

  x = randomNumber(columns);
  y = randomNumber(rows);

  positionValue = grid[y][x];

  while (isWall(positionValue)) {
    x = randomNumber(columns);
    y = randomNumber(rows);

    positionValue = grid[y][x];
  }

  return { x, y };
}

export function isPositionOccupied(
  firstPosition: Position,
  secondPosition: Position
) {
  return (
    firstPosition.x === secondPosition.x && firstPosition.y === secondPosition.y
  );
}

export function arePositionsOccupied(
  targetPosition: Position,
  otherPositions: Position[]
) {
  return otherPositions.some((position) =>
    isPositionOccupied(position, targetPosition)
  );
}

export function randomGhostSpawnPoints(
  grid: Grid,
  currentPacmanPosition: Position,
  numberOfGhosts: number
) {
  let ghostSpawnPoint: Position = randomSpawnPoint(grid),
    allGhostSpawnPoints: Position[] = [],
    totalSpawnPoints: Position[] = [
      ...allGhostSpawnPoints,
      currentPacmanPosition,
    ];

  for (let index = 0; index < numberOfGhosts; index++) {
    while (arePositionsOccupied(ghostSpawnPoint, totalSpawnPoints)) {
      ghostSpawnPoint = randomSpawnPoint(grid);
    }

    allGhostSpawnPoints.push(ghostSpawnPoint);
    totalSpawnPoints = [...allGhostSpawnPoints, currentPacmanPosition];
  }

  return allGhostSpawnPoints;
}

export function milliSecondsToSeconds(milliSeconds: number) {
  return milliSeconds / 1000;
}

export function generateLargeGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }).map((_) =>
    Array.from({ length: cols }).map((_) => randomNumber(SCORE_TILE + 1))
  );
}

export function getPositionValue(grid: Grid, position: Position) {
  const { x, y } = position;
  return grid[y][x];
}

export function randomDirection(
  excludeDirections: Direction[] = []
): Direction {
  const allDirections: Direction[] = ["up", "down", "left", "right"];

  let randomdomIndex: number = randomNumber(allDirections.length),
    currentDirection: Direction = allDirections[randomdomIndex];

  while (excludeDirections.includes(currentDirection)) {
    randomdomIndex = randomNumber(allDirections.length);
    currentDirection = allDirections[randomdomIndex];
  }

  return currentDirection;
}
