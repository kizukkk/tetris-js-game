import { PLAY_FIELD_ROWS } from "./constants.js";

export function generateBagOfFigures(figuresList) {
  let bagOfFigure = [...figuresList];
  for (let i = bagOfFigure.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bagOfFigure[i], bagOfFigure[j]] = [bagOfFigure[j], bagOfFigure[i]];
  }
  return bagOfFigure;
}

export function getIdxCollapsRows(playFieldMatrix) {
  return playFieldMatrix.reduce((acc, row, idx) => {
    if (!row.some((item) => !item.classList.contains("static"))) {
      acc.push(idx);
    }
    return acc;
  }, []);
}

export function collapseRows(rowsIdxs, playFieldMatrix) {
  playFieldMatrix.forEach((row, idx) => {
    if (rowsIdxs.includes(idx)) {
      row.forEach((item) => {
        item.classList = [];
      });
    }
  });

  rowsIdxs.forEach((rowIdx) => {
    for (let i = rowIdx; i > 0; i--) {
      for (let j = 0; j < playFieldMatrix[1].length; j++) {
        const temp = playFieldMatrix[i - 1][j].classList;
        playFieldMatrix[i][j].classList = temp;
        playFieldMatrix[i - 1][j].classList = [];
      }
    }
  });
}

export function getCalculatedScore(rowsCollapsed) {
  if (rowsCollapsed <= 0) return 0;

  return 10 * rowsCollapsed + getCalculatedScore(rowsCollapsed - 1);
}
