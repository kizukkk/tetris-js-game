import { calculateFigureCoords } from "./utils.js";
import {
  moveFigureDown,
  moveFigureLeft,
  moveFigureRight,
  rotationFigureAboutPoint,
} from "./movement.js";
import { isGameOver, isLockFigure } from "./helpers.js";
import {
  generateBagOfFigures,
  getIdxCollapsRows,
  collapseRows,
  getCalculatedScore,
} from "./logic.js";
import {
  generatePlayField,
  renderFigure,
  clearDynamicRender,
  clearStaticRender,
  renderStaticFigure,
  updateHtmlContent,
} from "./render.js";
import {
  PLAY_FIELD_ROWS,
  PLAY_FIELD_COLUMS,
  FIGURS_POINTS,
  FIGURE_NAMES,
  FIGURE_CENTER,
  LEVEL_THRESHOLD,
} from "./constants.js";

let level = 1;
let score = 0;
let isPaused = true;
let rowsCollapsed = 0;
let bagOfFigures = [];
let isQuickDropActive = false;

const PLAY_FIELD_MATRIX = generatePlayField(PLAY_FIELD_ROWS, PLAY_FIELD_COLUMS);

let intervalId = undefined;

let startDrawPoint = [-1, 4];
let figurePoints = undefined;

document.addEventListener("keydown", handleKeyDown);
document
  .querySelector(".gameOver > div > button")
  .addEventListener("click", restartClick);
updateHtmlContent(".hi_score > h2", localStorage.getItem("bestScore") || 0);

function play() {
  if (bagOfFigures.length <= 1) {
    bagOfFigures.push(...generateBagOfFigures(FIGURE_NAMES));
    figurePoints = FIGURS_POINTS[bagOfFigures[0]];
  }

  const nextFigurePosition = calculateFigureCoords(figurePoints, [
    startDrawPoint[0] + 1,
    startDrawPoint[1],
  ]);

  if (isLockFigure(nextFigurePosition, PLAY_FIELD_MATRIX)) {
    lockFigureOnPlayField();

    if (isQuickDropActive) {
      isQuickDropActive = false;
      clearInterval(intervalId);
      intervalId = setInterval(play, getIntervalFromLevel(level));
    }

    const idxCollapseRows = getIdxCollapsRows(PLAY_FIELD_MATRIX);
    collapseRows(idxCollapseRows, PLAY_FIELD_MATRIX);
    rowsCollapsed += idxCollapseRows.length;

    updateScore(idxCollapseRows.length);
  } else {
    startDrawPoint = moveFigureDown(
      figurePoints,
      startDrawPoint,
      PLAY_FIELD_MATRIX
    );
  }

  if (rowsCollapsed >= LEVEL_THRESHOLD) {
    rowsCollapsed -= LEVEL_THRESHOLD;
    goToNextLevel();
  }

  reRender();
}

function goToNextLevel() {
  if (level >= 5) return;

  clearInterval(intervalId);
  intervalId = setInterval(play, getIntervalFromLevel(++level));
  updateHtmlContent(".level > h2", level);
}

function getIntervalFromLevel(level) {
  return 450 - level * 55;
}

function lockFigureOnPlayField() {
  if (isGameOver(startDrawPoint)) {
    gameOver();
    return;
  }

  renderStaticFigure(
    bagOfFigures[0],
    figurePoints,
    startDrawPoint,
    PLAY_FIELD_MATRIX
  );

  startDrawPoint = [-1, 4];
  bagOfFigures.shift();
  figurePoints = FIGURS_POINTS[bagOfFigures[0]];
}

function reRender() {
  clearDynamicRender(PLAY_FIELD_MATRIX);
  renderFigure(
    bagOfFigures[0],
    figurePoints,
    startDrawPoint,
    PLAY_FIELD_MATRIX
  );
}

function handleKeyDown(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (isPaused) break;
      startDrawPoint = moveFigureLeft(
        figurePoints,
        startDrawPoint,
        PLAY_FIELD_MATRIX
      );
      break;
    case "ArrowRight":
      if (isPaused) break;
      startDrawPoint = moveFigureRight(
        figurePoints,
        startDrawPoint,
        PLAY_FIELD_MATRIX
      );
      break;
    case "ArrowDown":
      if (isPaused) break;
      startDrawPoint = moveFigureDown(
        figurePoints,
        startDrawPoint,
        PLAY_FIELD_MATRIX
      );
      break;
    case "ArrowUp":
      if (isPaused) break;
      figurePoints = rotationFigureAboutPoint(
        figurePoints,
        FIGURE_CENTER[bagOfFigures[0]],
        startDrawPoint,
        PLAY_FIELD_MATRIX
      );
      break;
    case "Escape":
      pauseStartGame();
      break;
    case " ":
      if (isPaused) break;
      if (isQuickDropActive) break;
      quickDrop();
      break;
  }
  if (!isPaused) reRender();
}

function updateScore(countOfCollapsedRows) {
  score += getCalculatedScore(countOfCollapsedRows);
  updateHtmlContent(".score > h2", score);
}

function gameOver() {
  clearInterval(intervalId);

  updateHtmlContent(".level > h2", 1);
  clearStaticRender(PLAY_FIELD_MATRIX);

  if (localStorage.getItem("bestScore") < score) {
    localStorage.setItem("bestScore", score);
    updateHtmlContent(".hi_score > h2", localStorage.getItem("bestScore"));
  }

  document.querySelector(".blur").style.visibility = "visible";
  document.querySelector(".gameOver").style.visibility = "visible";
  updateHtmlContent(".gameOver .score", score);
  updateHtmlContent(".gameOver .level", level);

  level = 1;
  score = 0;
  bagOfFigures = [];
  isPaused = true;
  startDrawPoint = [-1, 4];
}

function pauseStartGame() {
  if (isPaused) {
    restartClick();
  } else {
    clearInterval(intervalId);
    isPaused = true;
  }
}

function quickDrop() {
  isQuickDropActive = true;
  clearInterval(intervalId);
  intervalId = setInterval(play, 40);
}

function restartClick() {
  document.querySelector(".blur").style.visibility = "hidden";
  document.querySelector(".gameOver").style.visibility = "hidden";
  intervalId = setInterval(play, getIntervalFromLevel(level));
  isPaused = false;
}
