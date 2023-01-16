import { box } from './interfaces/types';
import UserDetails from './components/UserDetails';
import Rows from './components/Rows';
import useFetch from './Redux/hooks/useFetch';

function App() {
  const { data, twoDimensionalArray } = useFetch('http://localhost:9876/init');
  let rowCounter = 0;

  return (
    <div className="container">
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
