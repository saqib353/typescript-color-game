import { useAppSelector, useAppDispatch } from "../Redux/hooks/hooks";
import { spreadColorFromTop, spreadColorFromBottom, spreadColorFromLeft, spreadColorFromRight, box } from "../Redux/features/boxesSlice";
import { getColorValue } from "../Redux/utilities/utilities";

type SquareBoxProps = {
  rowNumber: number;
  item: box;
  columnNumber: number;
};

export default function SquareBox({ rowNumber, item, columnNumber }: SquareBoxProps) {
  const dispatch = useAppDispatch();
  const { data, movesLeft } = useAppSelector((state) => state.boxes);
  const { height, width } = data;

  function allowDrop(event: { preventDefault: () => void }) {
    event.preventDefault();
  }

  function drag(event: { dataTransfer: { setData: (arg0: string, arg1: string) => void } }) {
    event.dataTransfer.setData("color", item.bgColor);
  }

  function drop(event: React.DragEvent<HTMLSpanElement>, dropFunction: Function) {
    let color = event.dataTransfer.getData("color");
    dispatch(dropFunction({ color, rowNumber, item }));
  }

  const [red, green, blue] = getColorValue(item.bgColor);
  return (
    <>
      {rowNumber === 1 || columnNumber === 1 ? (
        rowNumber === 1 && columnNumber === 1 ? (
          <span className="white-box"></span>
        ) : rowNumber === height && columnNumber === 1 ? (
          <span className="white-box"></span>
        ) : rowNumber === 1 && columnNumber === width ? (
          <span className="white-box"></span>
        ) : columnNumber === 1 ? (
          <span
            onClick={() => (data.maxMoves - 3 < movesLeft ? dispatch(spreadColorFromLeft({ item, rowNumber })) : null)}
            onDragOver={allowDrop}
            onDrop={(event) => drop(event, spreadColorFromLeft)}
            className="sources"
            style={{
              backgroundColor: item.bgColor,
              cursor: data.maxMoves - 3 < movesLeft ? "pointer" : "default",
            }}
          ></span>
        ) : (
          <span
            onClick={() => (data.maxMoves - 3 < movesLeft ? dispatch(spreadColorFromTop({ item, rowNumber: 0 })) : null)}
            onDragOver={allowDrop}
            onDrop={(event) => drop(event, spreadColorFromTop)}
            className="sources"
            style={{
              backgroundColor: item.bgColor,
              cursor: data.maxMoves - 3 < movesLeft ? "pointer" : "default",
            }}
          ></span>
        )
      ) : rowNumber === height ? (
        rowNumber === height && columnNumber === width ? (
          <span className="white-box"></span>
        ) : (
          <span
            onClick={() => (data.maxMoves - 3 < movesLeft ? dispatch(spreadColorFromBottom({ item, rowNumber: 0 })) : null)}
            onDragOver={allowDrop}
            onDrop={(event) => drop(event, spreadColorFromBottom)}
            className="sources"
            style={{
              backgroundColor: item.bgColor,
              cursor: data.maxMoves - 3 < movesLeft ? "pointer" : "default",
            }}
          ></span>
        )
      ) : columnNumber === width ? (
        <span
          onClick={() => {
            return data.maxMoves - 3 < movesLeft ? dispatch(spreadColorFromRight({ item, rowNumber })) : null;
          }}
          onDragOver={allowDrop}
          onDrop={(event) => drop(event, spreadColorFromRight)}
          className="sources"
          style={{
            backgroundColor: item.bgColor,
            cursor: data.maxMoves - 3 < movesLeft ? "pointer" : "default",
          }}
        ></span>
      ) : (
        <span
          draggable={data.maxMoves - 3 < movesLeft ? false : true}
          onDragStart={drag}
          title={`${parseInt(red.toString())},${parseInt(green.toString())},${parseInt(blue.toString())}`}
          className="tiles"
          style={{
            backgroundColor: item.bgColor,
            cursor: data.maxMoves - 2 > movesLeft ? "pointer" : "default",
            outline: item.redOutline ? "2.3px solid #f00" : "1.5px solid #aaa",
          }}
        ></span>
      )}
    </>
  );
}
