import { useEffect, useState } from 'react'
import './App.css'
import Counter from './components/Counter';
import Sidedata from './components/Sidedata';

function App() {
  const startTime = new Date();
  const [currTime, setTime] = useState(new Date());

  const [ampCount, setAmpCount] = useState(0);
  const [speakerCount, setSpeakerCount] = useState(0);
  const [trapCount, setTrapCount] = useState(0);
  const [ampCountM, setAmpCountM] = useState(0);
  const [speakerCountM, setSpeakerCountM] = useState(0);
  const [trapCountM, setTrapCountM] = useState(0);

  const [leftData, setLeftData] = useState(["0", "0", "0"]);
  const [rightData, setRightData] = useState(["0", "0", "0"]);
  const leftInfo = ["Total amount scored", "Total amount missing"];
  const rightInfo = ["Total time elapsed", "Time since last score"];

  const individualInfo = ["Average time to score", "Percentage score"];
  const [ampData, setAmpData] = useState(["0", "0", "100%"]);
  const [speakerData, setSpeakerData] = useState(["0", "0", "100%"]);
  const [trapData, setTrapData] = useState(["0", "0", "100%"]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAllData();
  //     setAllIndividualData();
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [setAllData, setAllIndividualData]);

  return (
    <div className="grid">
      <div className="title">
        <h1>Crescendo Cycle Time App!</h1>
      </div>

      <div className="leftData">
        <Sidedata data={leftData} displayInfo={leftInfo}></Sidedata>
      </div>
      <div className="rightData">
       <Sidedata data={rightData} displayInfo={rightInfo}></Sidedata>
      </div>

      <div className="amp">
        <Counter name="Amp" count={ampCount} countM={ampCountM} onMClickDown={() =>{handleButtonClick("ampM", false)}} onMClickUp={() =>{handleButtonClick("ampM", true)}} onButtonDown={() =>{handleButtonClick("amp", false)}} onButtonUp={() =>{handleButtonClick("amp", true)}} data={ampData} displayInfo={individualInfo}></Counter>
      </div>
      <div className="speaker">
        <Counter name="Speaker" count={speakerCount} countM={speakerCountM} onMClickDown={() =>{handleButtonClick("speakerM", false)}} onMClickUp={() =>{handleButtonClick("speakerM", true)}} onButtonDown={() =>{handleButtonClick("speaker", false)}} onButtonUp={() =>{handleButtonClick("speaker", true)}} data={speakerData} displayInfo={individualInfo}></Counter>
      </div>
      <div className="trap">
        <Counter name="Trap" count={trapCount} countM={trapCountM} onMClickDown={() =>{handleButtonClick("trapM", false)}} onMClickUp={() =>{handleButtonClick("trapM", true)}} onButtonDown={() =>{handleButtonClick("trap", false)}} onButtonUp={() =>{handleButtonClick("trap", true)}} data={trapData} displayInfo={individualInfo}></Counter>
      </div>
    </div>
  )

  function handleButtonClick (type: string, isUp: boolean) {
    if (type === "amp") {
      if (isUp) {
        setAmpCount(ampCount + 1);
      }
      else {
        ampCount > 0 ? setAmpCount(ampCount + 1) : setAmpCount(0);
      }
    }
    else if (type === "speaker") {
      if (isUp) {
        setSpeakerCount(speakerCount + 1);
      }
      else {
        speakerCount > 0 ? setSpeakerCount(speakerCount + 1) : setSpeakerCount(0);
      }
    }
    else if (type === "trap") {
      if (isUp) {
        setTrapCount(trapCount + 1);
      }
      else {
        trapCount > 0 ? setTrapCount(trapCount + 1) : setTrapCount(0);
      }
    }
    if (type === "ampM") {
      if (isUp) {
        setAmpCountM(ampCountM + 1);
      }
      else {
        ampCountM > 0 ? setAmpCountM(ampCountM + 1) : setAmpCountM(0);
      }
    }
    else if (type === "speakerM") {
      if (isUp) {
        setSpeakerCountM(speakerCountM + 1);
      }
      else {
        speakerCountM > 0 ? setSpeakerCountM(speakerCountM + 1) : setSpeakerCountM(0);
      }
    }
    else if (type === "trapM") {
      if (isUp) {
        setTrapCountM(trapCountM + 1);
      }
      else {
        trapCountM > 0 ? setTrapCountM(ampCountM + 1) : setTrapCountM(0);
      }
    }
    else {
      console.log("ERROR");
    }
  }

  function setAllData () {
    setTime(new Date());
    setLeftData([(ampCount+speakerCount+trapCount).toString(10), (ampCountM+speakerCountM+trapCountM).toString(10)]);
    setRightData([(currTime.getTime() - startTime.getTime()).toString(10), "0"]); 
  }

  function setAllIndividualData () {
    setAmpData(["0", "0", (ampCount / (ampCount+ampCountM) * 100).toString(10) + "%"]);
    setSpeakerData(["0", "0", (speakerCount / (speakerCount+speakerCountM) * 100).toString(10) + "%"]);
    setTrapData(["0", "0", (trapCount / (trapCount+trapCountM) * 100).toString(10) + "%"]);
  }
}

export default App
