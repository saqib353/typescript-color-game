type box = {
  id: string;
  bgColor: string;
  difference: number;
  redOutline: boolean;
};

type RGB = [number, number, number];

type Response = {
  userId: string;
  width: number;
  height: number;
  maxMoves: number;
  target: RGB;
};

type InitialState = {
  data: Response;
  twoDimensionalArray: box[][];
  difference: number;
  movesLeft: number;
  closestColor: string;
};

type Payload = {
  item: box;
  rowNumber: number;
  color?: string;
};

type SquareBoxProps = {
  rowNumber: number;
  item: box;
  columnNumber: number;
};
export type { box, RGB, InitialState, Payload, SquareBoxProps };
