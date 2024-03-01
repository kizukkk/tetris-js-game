import { calculateFigureCoords, rotationPointAboutPoint } from "./utils.js";
import { isOutOfSideBounds, isCollision } from "./helpers.js";

export function rotationFigureAboutPoint(
  figurePointsList,
  refPoint,
  startDrawFigurePoint,
  playFieldMatrix
) {
  const newRotationPoints = [];

  figurePointsList.forEach((e) => {
    const newPoint = rotationPointAboutPoint(e, refPoint);
    newRotationPoints.push(newPoint);
  });

  const newRotationCoords = calculateFigureCoords(
    newRotationPoints,
    startDrawFigurePoint
  );
  const isNewPositionInvalid =
    isOutOfSideBounds(newRotationCoords, startDrawFigurePoint) ||
    isCollision(newRotationCoords, playFieldMatrix);

  return isNewPositionInvalid ? figurePointsList : newRotationPoints;
}

export function moveFigure(
  figurePoints,
  shiftPoint,
  startDrawPoint,
  playFieldMatrix
) {
  const newStartDrawFigurePoint = [
    startDrawPoint[0] + shiftPoint[0],
    startDrawPoint[1] + shiftPoint[1],
  ];

  const newFigurePoints = figurePoints.map((point) => [
    point[0] + newStartDrawFigurePoint[0],
    point[1] + newStartDrawFigurePoint[1],
  ]);

  const isNewPositionInvalid =
    isOutOfSideBounds(newFigurePoints, newStartDrawFigurePoint) ||
    isCollision(newFigurePoints, playFieldMatrix);

  return isNewPositionInvalid ? startDrawPoint : newStartDrawFigurePoint;
}

export function moveFigureLeft(figurePoints, startDrawPoint, playFieldMatrix) {
  return moveFigure(figurePoints, [0, -1], startDrawPoint, playFieldMatrix);
}

export function moveFigureRight(figurePoints, startDrawPoint, playFieldMatrix) {
  return moveFigure(figurePoints, [0, 1], startDrawPoint, playFieldMatrix);
}

export function moveFigureDown(figurePoints, startDrawPoint, playFieldMatrix) {
  return moveFigure(figurePoints, [1, 0], startDrawPoint, playFieldMatrix);
}
