import { useState } from 'react'
import './App.css'
import Counter from './components/Counter';
import Sidedata from './components/Sidedata';

function App() {
  const [ampCount, setAmpCount] = useState(0);
  const [speakerCount, setSpeakerCount] = useState(0);
  const [trapCount, setTrapCount] = useState(0);

  const [data, setData] = useState(["0", "0", "0"]);
  const [info, setInfo] = useState(["Total time elapsed", "Total amount scored", "Total amount missing"]);

  return (
    <div className="grid">
      <div className="title">
        <h1>Crescendo Cycle Time App!</h1>
      </div>

      <div className="sidedata">
        <Sidedata data={data} displayInfo={info}></Sidedata>
      </div>

      <div className="amp">
        <Counter name="Amp" count={ampCount} onButtonDown={() =>{handleButtonClick("amp", false)}} onButtonUp={() =>{handleButtonClick("amp", true)}}></Counter>
      </div>
      <div className="speaker">
        <Counter name="Speaker" count={speakerCount} onButtonDown={() =>{handleButtonClick("speaker", false)}} onButtonUp={() =>{handleButtonClick("speaker", true)}}></Counter>
      </div>
      <div className="trap">
        <Counter name="Trap" count={trapCount} onButtonDown={() =>{handleButtonClick("trap", false)}} onButtonUp={() =>{handleButtonClick("trap", true)}}></Counter>
      </div>
    </div>
  )

  function handleButtonClick (type: string, isUp: boolean) {
    if (type === "amp") {
      if (isUp) {
        setAmpCount(ampCount + 1);
      }
      else {
        setAmpCount(ampCount - 1);
      }
    }
    else if (type === "speaker") {
      if (isUp) {
        setSpeakerCount(speakerCount + 1);
      }
      else {
        setSpeakerCount(speakerCount - 1);
      }
    }
    else if (type === "trap") {
      if (isUp) {
        setTrapCount(trapCount + 1);
      }
      else {
        setTrapCount(trapCount - 1);
      }
    }
    else {
      console.log("ERROR");
    }
  }
}

export default App
