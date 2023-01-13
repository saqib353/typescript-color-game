import { box } from '../../interfaces/types';

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

export { getTargetSquaresForRows, getTargetSquaresForColumns };
