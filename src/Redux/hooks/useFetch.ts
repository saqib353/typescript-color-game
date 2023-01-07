import { useEffect } from "react";
import { getData } from "../features/boxesSlice";
import { useAppDispatch, useAppSelector } from "./useApp";

const useFetch = (url: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getData(url));
  }, []);

  const { data, difference, twoDimensionalArray, movesLeft } = useAppSelector((state) => state.boxes);

  useEffect(() => {
    setTimeout(() => {
      if (difference < 10 && difference !== 0) {
        if (window.confirm("Success!. Do You Want to replay")) {
          return dispatch(getData(`${url}/user/${data.userId}`));
        }
        return dispatch(getData(url));
      }

      if (movesLeft === 0) {
        if (window.confirm("Failed!. Do You Want to replay")) {
          return dispatch(getData(`${url}/user/${data.userId}`));
        }
        return dispatch(getData(url));
      }
    }, 100);
  }, [difference, movesLeft]);

  return { data, twoDimensionalArray };
};

export default useFetch;
