import { box } from './interfaces/types';
import UserDetails from './components/UserDetails';
import Rows from './components/Rows';
import useFetch from './Redux/hooks/useFetch';

function App() {
  const { data, twoDimensionalArray } = useFetch();
  let rowCounter = 0;

  return (
    <div className="container">
      {/*Here are the user details */}
      <UserDetails />
      <div style={{ display: 'grid' }}>
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
