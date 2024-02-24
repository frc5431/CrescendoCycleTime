import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import NoteImg from "/src/assets/note.png"
interface Props {
  name: string;
  count: number;
  countM: number;
  onButtonUp: () => void;
  onButtonDown: () => void;
  onMClickUp: () => void;
  onMClickDown: () => void;
}

function Counter({ name, count, countM, onButtonDown, onButtonUp, onMClickDown, onMClickUp}: Props) {

  return (
    <>
      <h2>{name}: {count}</h2>

      <div className="counterbuttonfix">
        <div>
          <button onClick={onMClickUp}  className="redbutton">M</button>
        </div>
        <div>
          <button onClick={onButtonUp} className="purplebutton">↑</button>
          <div className="arrowbuttonfix">  <img className="imageStyle" src={NoteImg} alt="image of frc crescendo note" /></div>
          <button onClick={onButtonDown} className="purplebutton"><UndoRoundedIcon/></button>
        </div>
        <div>
          <button className="redbutton" onClick={onMClickDown}><UndoRoundedIcon/></button>
        </div>
      </div>
      <div>
        <h2>Missing: {countM}</h2>
      </div>

      {/* <div>
        <h2>
          Average Time to Score: {averageTimeToScore}
        </h2>
      </div> */}
    </>
  )
}

export default Counter;