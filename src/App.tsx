import { useEffect, useRef, useState } from 'react'
import './App.css'
import TimeStorage, { DateInfo, resultType } from './TimeStorage';
import TimeData from './components/TimeData';
import ScoreData from './components/ScoreData';
import Counter from './components/Counter';

function App() {
  const [timeData, setTimeData] = useState(new TimeStorage());

  timeData.restart();

  return (
    <div className='grid'>
      <div className="title">
        <h1><img className="logo" src="src/assets/note.png" alt="image of frc crescendo note"/>
        <span className="crescendo">Crescendo</span> Cycle Time App!
        <img className="logo" src="src/assets/note.png" alt="image of frc crescendo note"/> </h1>
      </div>
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

export default App
