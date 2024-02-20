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

function Counter ({name, count, countM, onButtonDown, onButtonUp, onMClickDown, onMClickUp, percentageScored} : Props) {

  return (
    <>
      <h2>{name}: {count}</h2>
      
      <div>
        <button onClick={onButtonUp}>↑</button>
      </div>
      <div>
      <button onClick={onMClickUp}>M</button>
        <img className="imageStyle" src="src/assets/note.png" alt="image of frc crescendo note"/>
        <button onClick={onMClickDown}>-M</button>
      </div>
      <div>
        <button onClick={onButtonDown}>↓</button>
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