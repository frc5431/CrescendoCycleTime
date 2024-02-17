import { useEffect, useState } from 'react'
import './App.css'
import Counter from './components/Counter';
import Sidedata from './components/Sidedata';
import TimeStorage from './TimeStorage';

function App() {
  const [startTime, setStartTime] = useState(new Date());
  const [currTime, setTime] = useState(new Date());
  const timeStorage = new TimeStorage();

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

  const individualInfo = ["Average time to score", "Percentage scored"];
  const [ampData, setAmpData] = useState(["0", "0", "100%"]);
  const [speakerData, setSpeakerData] = useState(["0", "0", "100%"]);
  const [trapData, setTrapData] = useState(["0", "0", "100%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      // console.log(typeof (ampCount / (ampCount+ampCountM) * 100).toString(10) + "%")
      console.log ((ampCount / (ampCount+ampCountM) * 100).toString(10) + "%")
      setAmpData(["0", "0", (ampCount / (ampCount+ampCountM) * 100).toString(10) + "%"]);
      setSpeakerData(["0", "0", (speakerCount / (speakerCount+speakerCountM) * 100).toString(10) + "%"]);
      setTrapData(["0", "0", (trapCount / (trapCount+trapCountM) * 100).toString(10) + "%"]);

      setRightData([((currTime.getTime() - startTime.getTime()) / 1000).toFixed(0) + " seconds", timeStorage.lastCycleTime() + " seconds"]); 
      setLeftData([(ampCount+speakerCount+trapCount).toString(10), (ampCountM+speakerCountM+trapCountM).toString(10)]);
      // console.log(ampData[2]);
      // console.log(speakerData[2]);
      // console.log(trapData[2]);
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div className="grid">
      <div className="title">
        <h1><span className="crescendo">Crescendo</span> Cycle Time App!</h1>
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
        // timeStorage.addTime(new);
      }
      else {
        ampCount > 0 ? setAmpCount(ampCount - 1) : setAmpCount(0);
        timeStorage.undo();
      }
    }
    else if (type === "speaker") {
      if (isUp) {
        setSpeakerCount(speakerCount + 1);
        // timeStorage.addTime(new Date());
      }
      else {
        speakerCount > 0 ? setSpeakerCount(speakerCount - 1) : setSpeakerCount(0);
        timeStorage.undo();
      }
    }
    else if (type === "trap") {
      if (isUp) {
        if (trapCount > 2) {
          return
        } 
        setTrapCount(trapCount + 1);
        // timeStorage.addTime(new Date());
      }
      else {
        trapCount > 0 ? setTrapCount(trapCount - 1) : setTrapCount(0);
        timeStorage.undo();
      }
    }
    if (type === "ampM") {
      if (isUp) {
        setAmpCountM(ampCountM + 1);
        // timeStorage.addTime(new Date());
      }
      else {
        ampCountM > 0 ? setAmpCountM(ampCountM - 1) : setAmpCountM(0);
        timeStorage.undo();
      }
    }
    else if (type === "speakerM") {
      if (isUp) {
        setSpeakerCountM(speakerCountM + 1);
        // timeStorage.addTime(new Date());
      }
      else {
        speakerCountM > 0 ? setSpeakerCountM(speakerCountM - 1) : setSpeakerCountM(0);
        timeStorage.undo();
      }
    }
    else if (type === "trapM") {
      if (isUp) {
        setTrapCountM(trapCountM + 1);
        // timeStorage.addTime(new Date());
      }
      else {
        trapCountM > 0 ? setTrapCountM(trapCountM - 1) : setTrapCountM(0);
        timeStorage.undo();
      }
    }
    else {
      console.log("ERROR");
    }
  }
}

export default App
