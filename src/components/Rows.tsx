import { box } from '../Redux/features/boxesSlice';
import SquareBox from './SquareBox';

type RowsProps = {
  rowNumber: number;
  arr: box[];
};

let columnNumber = 0;
export default function Rows({ arr, rowNumber }: RowsProps) {
  columnNumber = 0;
  return (
    <span>
      {arr.map((item) => {
        columnNumber++;
        return <SquareBox key={item.id} rowNumber={rowNumber} columnNumber={columnNumber} item={item} />;
      })}
    </span>
  );
}
