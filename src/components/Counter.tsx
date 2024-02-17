interface Props {
  name: string;
  count: number;
  onButtonUp: () => void;
  onButtonDown: () => void;
}

function Counter ({name, count, onButtonDown, onButtonUp} : Props) {
  return (
    <>
      <h2>{name}: {count}</h2>
      
      <div>
        <button onClick={onButtonUp}>↑</button>
      </div>
      <div>
      <button onClick={onButtonUp}>M</button>
        <img className="imageStyle" src="src/assets/note.png" alt="image of frc crescendo note"/>
        <button onClick={onButtonUp}>-M</button>
      </div>
      <div>
        <button onClick={onButtonDown}>↓</button>
      </div>
    </>
  )
}

export default Counter;