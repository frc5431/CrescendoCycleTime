import { useEffect, useState } from 'react'
import './App.css'
import TimeStorage, { DateInfo, resultType } from './TimeStorage';
import TimeData from './components/TimeData';
import ScoreData from './components/ScoreData';
import Counter from './components/Counter';
import Counter from './components/Counter';
import Sidedata from './components/Sidedata';
import moment from 'moment';
import TimeStorage from './TimeStorage';

function App() {
  const [timeData, setTimeData] = useState(new TimeStorage());

  timeData.restart();
  const [startTime, setStartTime] = useState(new Date());
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

  const individualInfo = ["Average time to score", "Percentage scored"];
  const [ampData, setAmpData] = useState(["0", "0", "100%"]);
  const [speakerData, setSpeakerData] = useState(["0", "0", "100%"]);
  const [trapData, setTrapData] = useState(["0", "0", "100%"]);

  useEffect(() => {
    const interval = setInterval(() => {

      setTime(new Date());
      setAllData();
      setAllIndividualData();
      // console.log(ampData[2]);
      // console.log(speakerData[2]);
      // console.log(trapData[2]);
    }, 100);

    return () => clearInterval(interval);
  }, [setAllData, setAllIndividualData]);

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
      <div className='timeData'>
        <TimeData
          timeElapsed={timeData.getStart().time.getTime() - new Date().getTime()}
          timeSinceLastScore={timeData.lastCycleTime()}
        />
      </div>
      <div className='scoreData'>
        <ScoreData
          totalAmountMissing={0} // temp
          totalAmountScored={0}  // temp
        />
      </div>
      <div className='amp'>
        <Counter
          name='Amp'
          count={timeData.ampCount()}
          countM={timeData.ampCountM()}
          onMClickDown={() =>{handleButtonClick("ampM", false)}}
          onMClickUp={() =>{handleButtonClick("ampM", true)}}
          onButtonDown={() =>{handleButtonClick("amp", false)}}
          onButtonUp={() =>{handleButtonClick("amp", true)}}
          averageTimeToScore={timeData.averageCycle("amp")}
          percentageScored={timeData.percentageScored("amp")}
        />

      </div>


      

    </div>
  )

  function handleButtonClick (type: string, isUp: boolean) {
    if (type === "amp") {
      if (isUp) {
        setTimeData(timeData.addTime(new DateInfo("amp", new Date(), resultType.Score)));
      }
      else {
        timeData.ampCount() > 0 ? setTimeData(timeData.undo("amp", resultType.Score)) : null;
      }
    }
    else if (type === "speaker") {
      if (isUp) {
        setTimeData(timeData.addTime(new DateInfo("speaker", new Date(), resultType.Score)));
      }
      else {
        timeData.speakerCount() > 0 ? setTimeData(timeData.undo("speaker", resultType.Score)) : null;
      }
    }
    else if (type === "trap") {
      if (isUp) {
        if (timeData.trapCount() > 2) {
          return;
        }
        setTimeData(timeData.addTime(new DateInfo("trap", new Date(), resultType.Score)));
      }
      else {
        timeData.trapCount() > 0 ? setTimeData(timeData.undo("trap", resultType.Score)) : null;
      }
    }
    else if (type === "ampM") {
      if (isUp) {
        setTimeData(timeData.addTime(new DateInfo("amp", new Date(), resultType.Miss)));
        // timeStorage.addTime(new Date());
      }
      else {
        timeData.ampCountM() > 0 ? setTimeData(timeData.undo("trap", resultType.Miss)) : null;

      }
    }
    else if (type === "speakerM") {
      if (isUp) {
        setTimeData(timeData.addTime(new DateInfo("speaker", new Date(), resultType.Miss)));
      }
      else {
        timeData.speakerCountM() > 0 ? setTimeData(timeData.undo("speaker", resultType.Miss)) : null;
      }
    }
    else if (type === "trapM") {
      if (isUp) {
        setTimeData(timeData.addTime(new DateInfo("trap", new Date(), resultType.Miss)));
      }
      else {
        timeData.speakerCountM() > 0 ? setTimeData(timeData.undo("trap", resultType.Miss)) : null;

      }
    }
    else {
      console.log("ERROR");
    }
    console.log(timeData)
    console.log(timeData.ampCount())
  }
}


  function setAllData () {
    setLeftData([(ampCount+speakerCount+trapCount).toString(10), (ampCountM+speakerCountM+trapCountM).toString(10)]);
    setRightData([((currTime.getTime() - startTime.getTime()) / 1000).toFixed(0) + " seconds ago", "0"]);
  }

  function setAllIndividualData () {
    setAmpData(["0", "0", (ampCount / (ampCount+ampCountM) * 100).toString(10) + "%"]);
    setSpeakerData(["0", "0", (speakerCount / (speakerCount+speakerCountM) * 100).toString(10) + "%"]);
    setTrapData(["0", "0", (trapCount / (trapCount+trapCountM) * 100).toString(10) + "%"]);
  }
}

export default App
