import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./Redux/hooks/hooks";
import { box, getData } from "./Redux/features/boxesSlice";
import UserDetails from "./components/UserDetails";
import Rows from "./components/Rows";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getData("http://localhost:9876/init"));
  }, []);

  const { data, twoDimensionalArray, difference, movesLeft } = useAppSelector((state) => state.boxes);
  let rowCounter = 0;

  useEffect(() => {
    setTimeout(() => {
      if (difference < 10 && difference !== 0) {
        if (window.confirm("Success!. Do You Want to replay")) {
          return dispatch(getData(`http://localhost:9876/init/user/${data.userId}`));
        }
        return dispatch(getData("http://localhost:9876/init"));
      }

      if (movesLeft === 0) {
        if (window.confirm("Failed!. Do You Want to replay")) {
          return dispatch(getData(`http://localhost:9876/init/user/${data.userId}`));
        }
        return dispatch(getData("http://localhost:9876/init"));
      }
    }, 100);
  }, [difference, movesLeft]);

  return (
    <div className="container">
      <UserDetails />
      <div style={{ display: "grid" }}>
        {data &&
          twoDimensionalArray.map((arr: box[]) => {
            rowCounter++;
            return <Rows key={rowCounter} rowNumber={rowCounter} arr={arr} />;
          })}
      </div>
    </div>
  );
}

export default App;
