import { useAppSelector, useAppDispatch } from '../Redux/hooks/useApp';
import { spreadColorFromTop, spreadColorFromBottom, spreadColorFromLeft, spreadColorFromRight } from '../Redux/features/boxesSlice';
import { getColorValue } from '../Redux/utilities/colorValue';
import { SquareBoxProps } from '../interfaces/types';

export default function SquareBox({ rowNumber, item, columnNumber }: SquareBoxProps) {
  const dispatch = useAppDispatch();
  const { data, movesLeft } = useAppSelector((state) => state.boxes);
  const { height, width } = data;

  function allowDrop(event: { preventDefault: () => void }) {
    event.preventDefault();
  }

  function drag(event: { dataTransfer: { setData: (arg0: string, arg1: string) => void } }) {
    event.dataTransfer.setData('color', item.bgColor);
  }

  function drop(event: React.DragEvent<HTMLSpanElement>, dropFunction: Function) {
    const color = event.dataTransfer.getData('color');
    dispatch(dropFunction({ color, rowNumber, item }));
  }

  const [red, green, blue] = getColorValue(item.bgColor);
  return (
    <>
      {rowNumber === 1 || columnNumber === 1 ? (
        rowNumber === 1 && columnNumber === 1 ? (
          <span className="white-box" />
        ) : rowNumber === height && columnNumber === 1 ? (
          <span className="white-box" />
        ) : rowNumber === 1 && columnNumber === width ? (
          <span className="white-box" />
        ) : columnNumber === 1 ? (
          <span
            onClick={() => (data.maxMoves - 3 < movesLeft ? dispatch(spreadColorFromLeft({ item, rowNumber })) : null)}
            onDragOver={allowDrop}
            onDrop={(event) => drop(event, spreadColorFromLeft)}
            className="sources"
            style={{
              backgroundColor: item.bgColor,
              cursor: data.maxMoves - 3 < movesLeft ? 'pointer' : 'default',
            }}
          />
        ) : (
          <span
            onClick={() => (data.maxMoves - 3 < movesLeft ? dispatch(spreadColorFromTop({ item, rowNumber: 0 })) : null)}
            onDragOver={allowDrop}
            onDrop={(event) => drop(event, spreadColorFromTop)}
            className="sources"
            style={{
              backgroundColor: item.bgColor,
              cursor: data.maxMoves - 3 < movesLeft ? 'pointer' : 'default',
            }}
          />
        )
      ) : rowNumber === height ? (
        rowNumber === height && columnNumber === width ? (
          <span className="white-box" />
        ) : (
          <span
            onClick={() => (data.maxMoves - 3 < movesLeft ? dispatch(spreadColorFromBottom({ item, rowNumber: 0 })) : null)}
            onDragOver={allowDrop}
            onDrop={(event) => drop(event, spreadColorFromBottom)}
            className="sources"
            style={{
              backgroundColor: item.bgColor,
              cursor: data.maxMoves - 3 < movesLeft ? 'pointer' : 'default',
            }}
          />
        )
      ) : columnNumber === width ? (
        <span
          onClick={() => (data.maxMoves - 3 < movesLeft ? dispatch(spreadColorFromRight({ item, rowNumber })) : null)}
          onDragOver={allowDrop}
          onDrop={(event) => drop(event, spreadColorFromRight)}
          className="sources"
          style={{
            backgroundColor: item.bgColor,
            cursor: data.maxMoves - 3 < movesLeft ? 'pointer' : 'default',
          }}
        />
      ) : (
        <span
          draggable={!(data.maxMoves - 3 < movesLeft)}
          onDragStart={drag}
          title={`${parseInt(red.toString())},${parseInt(green.toString())},${parseInt(blue.toString())}`}
          className="tiles"
          style={{
            backgroundColor: item.bgColor,
            cursor: data.maxMoves - 2 > movesLeft ? 'pointer' : 'default',
            outline: item.redOutline ? '2.3px solid #f00' : '1.5px solid #aaa',
          }}
        />
      )}
    </>
  );
}
