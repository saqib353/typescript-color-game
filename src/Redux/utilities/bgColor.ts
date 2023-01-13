import { RGB } from '../../interfaces/types';

const topAndLeftBgColor = (color: RGB, move: number, maxMoves: number, height: number, distance: number, [red, green, blue]: RGB): string => {
  if (maxMoves - 3 > move && color[0] === 0 && color[1] === 0 && color[2] === 0) return 'rgb(0,0,0)';

  const mixedRedColor = ((height + 1 - distance) * (move === maxMoves - 1 ? 255 : color[0])) / (height + 1) + red;
  const mixedGreenColor = ((height + 1 - distance) * (move === maxMoves - 2 ? 255 : color[1])) / (height + 1) + green;
  const mixedBlueColor = ((height + 1 - distance) * (move === maxMoves - 3 ? 255 : color[2])) / (height + 1) + blue;
  const normalizationFactor = 255 / Math.max(mixedRedColor, mixedGreenColor, mixedBlueColor, 255);

  const redColor = mixedRedColor * normalizationFactor;
  const greenColor = mixedGreenColor * normalizationFactor;
  const blueColor = mixedBlueColor * normalizationFactor;

  return `rgb(${redColor},${greenColor},${blueColor})`;
};

const bottomAndRightBgColor = (color: RGB, move: number, maxMoves: number, height: number, distance: number, [red, green, blue]: RGB): string => {
  if (maxMoves - 3 > move && color[0] === 0 && color[1] === 0 && color[2] === 0) return 'rgb(0,0,0)';

  const mixedRedColor = ((move === maxMoves - 1 ? 255 : color[0]) * (height - (height - distance - 2))) / (height + 1) + red;
  const mixedGreenColor = ((move === maxMoves - 2 ? 255 : color[1]) * (height - (height - distance - 2))) / (height + 1) + green;
  const mixedBlueColor = ((move === maxMoves - 3 ? 255 : color[2]) * (height - (height - distance - 2))) / (height + 1) + blue;
  const normalizationFactor = 255 / Math.max(mixedRedColor, mixedGreenColor, mixedBlueColor, 255);

  const redColor = mixedRedColor * normalizationFactor;
  const greenColor = mixedGreenColor * normalizationFactor;
  const blueColor = mixedBlueColor * normalizationFactor;

  return `rgb(${redColor},${greenColor},${blueColor})`;
};

export { topAndLeftBgColor, bottomAndRightBgColor };
