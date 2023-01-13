import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqid from 'uniqid';
import axios from 'axios';
import { calculateDifference } from '../utilities/calculateDifference';
import { getTargetSquaresForColumns, getTargetSquaresForRows } from '../utilities/targetSquares';
import { getColorValue } from '../utilities/colorValue';
import { bottomAndRightBgColor, topAndLeftBgColor } from '../utilities/bgColor';
import { updateDifferenceState } from '../utilities/difference';
import { box, InitialState, Payload, RGB } from '../../interfaces/types';

export const getData = createAsyncThunk('boxes', async (url: string) => {
  try {
    const response = await axios.get(url);
    response.data.height += 2;
    response.data.width += 2;

    const getBox = (): box => ({
      id: uniqid(),
      bgColor: 'rgb(0,0,0)',
      difference: 100,
      redOutline: false,
    });

    const arr = new Array(response.data.height);
    for (let i = 0; i < response.data.height; i++) {
      arr[i] = new Array(response.data.width);
    }
    for (let i = 0; i < response.data.height; i++) {
      for (let j = 0; j < response.data.width; j++) {
        arr[i][j] = getBox();
      }
    }

    return {
      data: response.data,
      twoDimensionalArray: arr,
      difference: calculateDifference(response.data.target, [0, 0, 0]),
      movesLeft: response.data.maxMoves,
      closestColor: 'rgb(0,0,0)',
    };
  } catch (error) {
    console.error(error);
  }
});

const responseObject = {
  userId: '',
  width: 0,
  height: 0,
  maxMoves: 0,
  target: [0, 0, 0] as RGB,
};

const initialState: InitialState = {
  data: responseObject,
  twoDimensionalArray: [],
  difference: 0,
  movesLeft: -1,
  closestColor: '',
};

const boxesSlice = createSlice({
  name: 'boxes',
  initialState,
  reducers: {
    spreadColorFromTop: (state, { payload }: PayloadAction<Payload>) => {
      state.movesLeft -= 1;
      const targetSqaures = getTargetSquaresForRows(state.twoDimensionalArray, state.data.height, state.data.width, payload.item.id);

      for (let i = 0; i < targetSqaures.length - 1; i++) {
        state.twoDimensionalArray = state.twoDimensionalArray.map((arr) =>
          arr.map((e) => {
            if (e.id === targetSqaures[i].id) {
              const previousColor = getColorValue(e.bgColor);
              const bgColor = topAndLeftBgColor(
                getColorValue(payload.color),
                state.movesLeft,
                state.data.maxMoves,
                state.data.height,
                i,
                previousColor
              );
              return {
                ...e,
                bgColor,
                difference: calculateDifference(state.data.target, getColorValue(bgColor)),
              };
            }
            return { ...e, difference: calculateDifference(state.data.target, getColorValue(e.bgColor)) };
          })
        );
      }

      const { updatedArray, closestColorSquare } = updateDifferenceState(state.twoDimensionalArray, state.data.height, state.data.width);
      state.twoDimensionalArray = updatedArray;
      state.difference = closestColorSquare.difference;
      state.closestColor = closestColorSquare.bgColor;
    },

    spreadColorFromBottom: (state, { payload }: PayloadAction<Payload>) => {
      state.movesLeft--;
      const targetSqaures = getTargetSquaresForRows(state.twoDimensionalArray, state.data.height, state.data.width, payload.item.id);

      for (let i = targetSqaures.length - 1; i > 0; i--) {
        state.twoDimensionalArray = state.twoDimensionalArray.map((arr) =>
          arr.map((e) => {
            const previousColor = getColorValue(e.bgColor);
            if (e.id === targetSqaures[i].id) {
              const bgColor = bottomAndRightBgColor(
                getColorValue(payload.color),
                state.movesLeft,
                state.data.maxMoves,
                state.data.height,
                i,
                previousColor
              );
              return {
                ...e,
                bgColor,
                difference: calculateDifference(state.data.target, getColorValue(bgColor)),
              };
            }
            return { ...e, difference: calculateDifference(state.data.target, previousColor) };
          })
        );
      }

      const { updatedArray, closestColorSquare } = updateDifferenceState(state.twoDimensionalArray, state.data.height, state.data.width);
      state.twoDimensionalArray = updatedArray;
      state.difference = closestColorSquare.difference;
      state.closestColor = closestColorSquare.bgColor;
    },

    spreadColorFromLeft: (state, { payload }: PayloadAction<Payload>) => {
      state.movesLeft--;
      const targetSqaures = getTargetSquaresForColumns(state.twoDimensionalArray, state.data.width, payload.rowNumber);

      for (let i = 0; i < targetSqaures.length - 1; i++) {
        state.twoDimensionalArray = state.twoDimensionalArray.map((arr) =>
          arr.map((e) => {
            if (e.id === targetSqaures[i].id) {
              const previousColor = getColorValue(e.bgColor);
              const bgColor = topAndLeftBgColor(
                getColorValue(payload.color),
                state.movesLeft,
                state.data.maxMoves,
                state.data.width,
                i,
                previousColor
              );
              return {
                ...e,
                bgColor,
                difference: calculateDifference(state.data.target, getColorValue(bgColor)),
              };
            }
            return { ...e, difference: calculateDifference(state.data.target, getColorValue(e.bgColor)) };
          })
        );
      }

      const { updatedArray, closestColorSquare } = updateDifferenceState(state.twoDimensionalArray, state.data.height, state.data.width);
      state.twoDimensionalArray = updatedArray;
      state.difference = closestColorSquare.difference;
      state.closestColor = closestColorSquare.bgColor;
    },

    spreadColorFromRight: (state, { payload }: PayloadAction<Payload>) => {
      state.movesLeft--;
      const targetSqaures = getTargetSquaresForColumns(state.twoDimensionalArray, state.data.width, payload.rowNumber);

      for (let i = targetSqaures.length - 1; i > 0; i--) {
        state.twoDimensionalArray = state.twoDimensionalArray.map((arr) =>
          arr.map((e) => {
            if (e.id === targetSqaures[i].id) {
              const previousColor = getColorValue(e.bgColor);
              const bgColor = bottomAndRightBgColor(
                getColorValue(payload.color),
                state.movesLeft,
                state.data.maxMoves,
                state.data.width,
                i,
                previousColor
              );
              return {
                ...e,
                bgColor,
                difference: calculateDifference(state.data.target, getColorValue(bgColor)),
              };
            }
            return { ...e, difference: calculateDifference(state.data.target, getColorValue(e.bgColor)) };
          })
        );
      }

      const { updatedArray, closestColorSquare } = updateDifferenceState(state.twoDimensionalArray, state.data.height, state.data.width);
      state.twoDimensionalArray = updatedArray;
      state.difference = closestColorSquare.difference;
      state.closestColor = closestColorSquare.bgColor;
    },
  },
  extraReducers: {
    [getData.pending.toString()]: (state, { payload }) => {},
    [getData.fulfilled.toString()]: (state, { payload }: PayloadAction<InitialState>) => {
      state.data = payload.data;
      state.twoDimensionalArray = payload.twoDimensionalArray;
      state.difference = payload.difference;
      state.movesLeft = payload.movesLeft;
      state.closestColor = payload.closestColor;
    },
    [getData.rejected.toString()]: (state, { payload }) => {},
  },
});

export const { spreadColorFromTop, spreadColorFromBottom, spreadColorFromLeft, spreadColorFromRight } = boxesSlice.actions;

export default boxesSlice.reducer;
