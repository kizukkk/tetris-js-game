export const PLAY_FIELD_ROWS = 20;
export const PLAY_FIELD_COLUMS = 10;
export const PLAY_FIELD_CENTER = [0, Math.floor(PLAY_FIELD_COLUMS / 2 - 1)];
export const LEVEL_THRESHOLD = 5;

export const FIGURE_NAMES = ["O", "J", "I", "L", "S", "T", "Z"];
export const FIGURE_CENTER = {
  O: [0.5, 0.5],
  J: [1, 1],
  I: [0, 1],
  L: [1, 1],
  S: [1, 1],
  T: [1, 1],
  Z: [1, 1],
};
export const FIGURS_POINTS = {
  O: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  J: [
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  I: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  L: [
    [1, 0],
    [1, 1],
    [1, 2],
    [0, 2],
  ],
  S: [
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 2],
  ],
  T: [
    [1, 0],
    [1, 1],
    [1, 2],
    [0, 1],
  ],
  Z: [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
  ],
};
