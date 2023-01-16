import { GiTriangleTarget } from 'react-icons/gi';
import { useAppSelector } from '../Redux/hooks/useApp';

function UserDetails() {
  const { data, difference, movesLeft, closestColor } = useAppSelector((state) => state.boxes);
  const { target } = data;
  const [red, green, blue] = target;

  return (
    <>
      <h4>RGB Alchemy</h4>
      <div>
        User ID:
        {data.userId}
      </div>
      <div>
        Moves left:
        {movesLeft}
      </div>
      <div className="target-and-closest-color">
        Target Color
        <span className="color" style={{ background: target ? `rgb(${red},${green},${blue})` : 'black' }} />
      </div>
      <div className="target-and-closest-color">
        Closest Color
        <span className="color" style={{ backgroundColor: closestColor }} />
        <span>
          <GiTriangleTarget /> ={difference.toFixed(2)} %
        </span>
      </div>
    </>
  );
}

export default UserDetails;
