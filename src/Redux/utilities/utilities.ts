import { box } from "../features/boxesSlice";
import { RGB } from "../features/boxesSlice";

const calculateDifference = (target: RGB, obtainedColor: RGB): number => {
  return (
    (1 / 255) *
    ((1 / Math.sqrt(3)) *
      Math.sqrt(
        (target[0] - obtainedColor[0]) * (target[0] - obtainedColor[0]) +
          (target[1] - obtainedColor[1]) * (target[1] - obtainedColor[1]) +
          (target[2] - obtainedColor[2]) * (target[2] - obtainedColor[2])
      )) *
    100
  );
};

const getColorValue = (colorStr = "rgb(0,0,0)"): RGB => {
  const color = colorStr.slice(4, colorStr.length - 1).split(",");
  const resultColor: RGB = [Number(color[0]), Number(color[1]), Number(color[2])];

  return resultColor;
};

const getTargetSquaresForRows = (arr: box[][], height: number, width: number, targetColorId: string): box[] => {
  let targetIndex = -1;
  const targetSquare: box[] = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (arr[i][j].id === targetColorId) {
        targetIndex = j;
      }
    }
  }
  for (let i = 0; i < height; i++) {
    targetSquare.push(arr[i][targetIndex]);
  }

  return targetSquare;
};

const getTargetSquaresForColumns = (arr: box[][], width: number, rowNumber: number): box[] => {
  const targetSquare: box[] = [];

  for (let i = 0; i < width; i++) {
    targetSquare.push(arr[rowNumber - 1][i]);
  }

  return targetSquare;
};

const topAndLeftBgColor = (color: RGB, move: number, maxMoves: number, height: number, distance: number, [red, green, blue]: RGB): string => {
  if (maxMoves - 3 > move && color[0] === 0 && color[1] === 0 && color[2] === 0) return `rgb(0,0,0)`;

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
  if (maxMoves - 3 > move && color[0] === 0 && color[1] === 0 && color[2] === 0) return `rgb(0,0,0)`;

  const mixedRedColor = ((move === maxMoves - 1 ? 255 : color[0]) * (height - (height - distance - 2))) / (height + 1) + red;
  const mixedGreenColor = ((move === maxMoves - 2 ? 255 : color[1]) * (height - (height - distance - 2))) / (height + 1) + green;
  const mixedBlueColor = ((move === maxMoves - 3 ? 255 : color[2]) * (height - (height - distance - 2))) / (height + 1) + blue;
  const normalizationFactor = 255 / Math.max(mixedRedColor, mixedGreenColor, mixedBlueColor, 255);

  const redColor = mixedRedColor * normalizationFactor;
  const greenColor = mixedGreenColor * normalizationFactor;
  const blueColor = mixedBlueColor * normalizationFactor;

  return `rgb(${redColor},${greenColor},${blueColor})`;
};

const getClosestColorSquare = (arr: box[][], height: number, width: number): box => {
  const differences = [];
  let closestColorSquare: box = {
    id: "",
    bgColor: "",
    difference: 100,
    redOutline: false,
  };

  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      differences.push(arr[i][j].difference);
    }
  }
  const minDifference = Math.min(...differences);

  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      if (arr[i][j].difference === minDifference) {
        closestColorSquare = arr[i][j];
      }
    }
  }

  return closestColorSquare;
};

const updateDifferenceState = (array: box[][], height: number, width: number) => {
  const closestColorSquare: box = getClosestColorSquare(array, height, width);

  const updatedArray = array.map((arr: box[]) =>
    arr.map((item: box) => {
      let redOutline = false;
      if (item.id === closestColorSquare.id) {
        return { ...item, redOutline: true };
      }
      return { ...item, redOutline };
    })
  );
  return { updatedArray, closestColorSquare };
};

export {
  calculateDifference,
  getColorValue,
  getTargetSquaresForRows,
  getTargetSquaresForColumns,
  topAndLeftBgColor,
  bottomAndRightBgColor,
  updateDifferenceState,
};
