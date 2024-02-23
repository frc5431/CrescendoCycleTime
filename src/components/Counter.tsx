import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
interface Props {
  name: string;
  count: number;
  countM: number;
  onButtonUp: () => void;
  onButtonDown: () => void;
  onMClickUp: () => void;
  onMClickDown: () => void;
  percentageScored: number;
}

function Counter({ name, count, countM, onButtonDown, onButtonUp, onMClickDown, onMClickUp, percentageScored }: Props) {

  return (
    <>
      <h2>{name}: {count}</h2>

      <div className="counterbuttonfix">
        <div>
          <button onClick={onMClickUp}  className="redbutton">M</button>
        </div>
        <div>
          <button onClick={onButtonUp} className="purplebutton">↑</button>
          <img className="imageStyle" src="src/assets/note.png" alt="image of frc crescendo note" />
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
      <div>
        <h2>
          Perecentage Scored: {percentageScored.toFixed(2)}%
        </h2>
      </div>
    </>
  )
}

export default Counter;