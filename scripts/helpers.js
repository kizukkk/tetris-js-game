import { PLAY_FIELD_COLUMS, PLAY_FIELD_ROWS } from "./constants.js";

export function isOutOfSideBounds(figurePointsCoords) {
  return figurePointsCoords.some(
    (e) => e[1] > PLAY_FIELD_COLUMS - 1 || e[1] < 0
  );
}

export function isCollision(figurePointsCoords, playFieldMatrix) {
  return figurePointsCoords.some((e) => {
    if (
      e[0] > PLAY_FIELD_ROWS - 1 ||
      e[0] < 0 ||
      playFieldMatrix[e[0]][e[1]].classList.contains("static")
    ) {
      return true;
    }
  });
}

export function isOutOfTheBottomBounds(figurePointsCoords) {
  return figurePointsCoords.some((e) => e[0] > PLAY_FIELD_ROWS - 1);
}

export function isLockFigure(figurePointsCoords, playFieldMatrix) {
  return (
    isOutOfTheBottomBounds(figurePointsCoords) ||
    isCollision(figurePointsCoords, playFieldMatrix)
  );
}

export function isGameOver(startDrawFigurePoint) {
  return startDrawFigurePoint[0] <= 0;
}
