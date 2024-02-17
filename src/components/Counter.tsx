import Sidedata from "./Sidedata";

interface Props {
  name: string;
  count: number;
  countM: number;
  onButtonUp: () => void;
  onButtonDown: () => void;
  onMClickUp: () => void;
  onMClickDown: () => void;
  displayInfo: string[];
  data: string[];
}

function Counter ({name, count, countM, onButtonDown, onButtonUp, onMClickDown, onMClickUp, displayInfo, data} : Props) {

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
      <Sidedata data={data} displayInfo={displayInfo}></Sidedata>
    </>
  )
}

export default Counter;