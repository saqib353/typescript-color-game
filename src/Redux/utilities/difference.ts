import { box } from '../../interfaces/types';

const getClosestColorSquare = (arr: box[][], height: number, width: number): box => {
  const differences = [];
  let closestColorSquare: box = {
    id: '',
    bgColor: '',
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
      const redOutline = false;
      if (item.id === closestColorSquare.id) {
        return { ...item, redOutline: true };
      }
      return { ...item, redOutline };
    })
  );
  return { updatedArray, closestColorSquare };
};

export { updateDifferenceState };
