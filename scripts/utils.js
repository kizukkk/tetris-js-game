export {
  transformListToMatrix,
  rotationPointAboutPoint,
  calculateFigureCoords,
};

function transformListToMatrix(list, elementsPerSubArray) {
  let matrix = [],
    i,
    k;

  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}

function rotationPointAboutPoint(rotationPoint, refPoint) {
  const angleRad = Math.PI / 2;
  const sin = Math.sin(angleRad);
  const cos = Math.cos(angleRad);

  const rotPointX = rotationPoint[1];
  const rotPointY = rotationPoint[0];

  const refPointX = refPoint[1];
  const refPointY = refPoint[0];

  const x = Math.round(
    cos * (rotPointX - refPointX) - sin * (rotPointY - refPointY) + refPointX
  );
  const y = Math.round(
    sin * (rotPointX - refPointX) + cos * (rotPointY - refPointY) + refPointY
  );

  return [y, x];
}

function calculateFigureCoords(figurePoints, startDrawFigurePoint) {
  return figurePoints.map((e) => [
    e[0] + startDrawFigurePoint[0],
    e[1] + startDrawFigurePoint[1],
  ]);
}
