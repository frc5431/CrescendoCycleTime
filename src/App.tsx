import { useEffect, useState } from 'react'
import './App.css'
import { Event, Type} from './TimeStorage';
import Counter from './components/Counter';
import ScoreInfo from './components/ScoreInfo';
import TimeInfo from './components/TimeInfo';

function App() {
  const [events, setEvents] = useState<Event[]>([]);


  // const [startTime, setStartTime] = useState(new Date());
  // const [currTime, setTime] = useState(new Date());

  // const [ampCount, setAmpCount] = useState(0);
  // const [speakerCount, setSpeakerCount] = useState(0);
  // const [trapCount, setTrapCount] = useState(0);
  // const [ampCountM, setAmpCountM] = useState(0);
  // const [speakerCountM, setSpeakerCountM] = useState(0);
  // const [trapCountM, setTrapCountM] = useState(0);

  // const [leftData, setLeftData] = useState(["0", "0", "0"]);
  // const [rightData, setRightData] = useState(["0", "0", "0"]);
  // const leftInfo = ["Total amount scored", "Total amount missing"];
  // const rightInfo = ["Total time elapsed", "Time since last score"];

  // const individualInfo = ["Average time to score", "Percentage scored"];
  // const [ampData, setAmpData] = useState(["0", "0", "100%"]);
  // const [speakerData, setSpeakerData] = useState(["0", "0", "100%"]);
  // const [trapData, setTrapData] = useState(["0", "0", "100%"]);

  // useEffect(() => {
  //   const interval = setInterval(() => {

  //     setTime(new Date());
  //     setAllData();
  //     setAllIndividualData();
  //     // console.log(ampData[2]);
  //     // console.log(speakerData[2]);
  //     // console.log(trapData[2]);
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [setAllData, setAllIndividualData]);

  return (
    <div className="grid">
      <div className="title">
        <h1><span className="crescendo">Crescendo</span> Cycle Time App!</h1>
      </div>

      <div className="scoreInfo">
        <ScoreInfo
          totalAmountMissing={0} // temp
          totalAmountScored={0}  // temp
        />
      </div>
      <div className='timeInfo'>
        <TimeInfo
          timeElapsed={0} // temp
          timeSinceLastScore={0} //temp
        />
      </div>

      <div className='amp'>
        <Counter
          name='Amp'
          count={timeData.ampCount()}
          countM={timeData.ampCountM()}
          onMClickDown={() =>{handleButtonClick(Type.Amp, false)}}
          onMClickUp={() =>{handleButtonClick(Type.Amp, true)}}
          onButtonDown={() =>{handleButtonClick(Type.Amp, false)}}
          onButtonUp={() =>{handleButtonClick(Type.Amp, true)}}
          averageTimeToScore={timeData.averageCycle("amp")}
          percentageScored={timeData.percentageScored("amp")}
        />
      </div>


      

    </div>
  )

  function handleButtonClick (type: Type, isUp: boolean) {
    const updated = [...events,  new Event(type, new Date(), isUp)]
    setEvents(updated);
  }


  // function setAllData () {
  //   setLeftData([(ampCount+speakerCount+trapCount).toString(10), (ampCountM+speakerCountM+trapCountM).toString(10)]);
  //   setRightData([((currTime.getTime() - startTime.getTime()) / 1000).toFixed(0) + " seconds ago", "0"]);
  // }

  // function setAllIndividualData () {
  //   setAmpData(["0", "0", (ampCount / (ampCount+ampCountM) * 100).toString(10) + "%"]);
  //   setSpeakerData(["0", "0", (speakerCount / (speakerCount+speakerCountM) * 100).toString(10) + "%"]);
  //   setTrapData(["0", "0", (trapCount / (trapCount+trapCountM) * 100).toString(10) + "%"]);
  // }
}

export default App
