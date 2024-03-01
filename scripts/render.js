import { calculateFigureCoords, transformListToMatrix } from "./utils.js";

export function renderFigure(
  figureName,
  figurePoints,
  startDrawFigurePoint,
  playFieldMatrix
) {
  figurePoints.forEach((e) => {
    const y = e[0] + startDrawFigurePoint[0];
    const x = e[1] + startDrawFigurePoint[1];
    if (y < 0) {
      return;
    }
    playFieldMatrix[y][x].classList.add(figureName);
  });
}

export function renderStaticFigure(
  figureName,
  figurePoints,
  startDrawFigurePoint,
  playFieldMatrix
) {
  calculateFigureCoords(figurePoints, startDrawFigurePoint).forEach(
    ([y, x]) => {
      playFieldMatrix[y][x].classList.add(figureName, "static");
    }
  );
}

export function generatePlayField(rows, colums) {
  let container = document.querySelector(".playField");

  for (let i = 0; i < colums * rows; i++) {
    const div = document.createElement("div");
    // div.innerHTML = i;
    container.append(div);
  }
  return transformListToMatrix(
    document.querySelectorAll(".playField > div"),
    colums
  );
}

export function clearDynamicRender(playFieldMatrix) {
  playFieldMatrix.forEach((row) => {
    row.forEach((e) => {
      if (!e.classList.contains("static")) e.classList = [];
    });
  });
}

export function clearStaticRender(playFieldMatrix) {
  playFieldMatrix.forEach((row) => {
    row.forEach((e) => (e.classList = []));
  });
}

export function updateHtmlContent(htmlWay, content) {
  document.querySelector(htmlWay).innerHTML = content;
}
