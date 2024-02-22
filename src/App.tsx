import { useEffect, useRef, useState } from 'react'
import './App.css'
import TimeStorage, { Event, Type} from './TimeStorage';
import Counter from './components/Counter';
import ScoreInfo from './components/ScoreInfo';
import TimeInfo from './components/TimeInfo';
import Options from './components/Options';

function App() {
  const [started, setStarted] = useState(false);
  const intervalTime = useRef(20); // useEffect interval time
  const [timeData, setTimeData] = useState(new TimeStorage([]));
  const [TSLS, setTSLS] = useState(0); // time since last scored
  const [timeElapsed, setTimeElapsed] = useState(0);

   useEffect(() => {
    const interval = setInterval(() => {
      if (!started) {
        return;
      }

      setTimeElapsed(timeElapsed + intervalTime.current);
      
      if (timeData.getTimes().length == 0) {
        setTSLS(timeElapsed);
      }
      else {
        // TODO 
        setTSLS(timeElapsed - (timeData.getTimes()[timeData.getTimes().length-1].time));
      }
    }, intervalTime.current);
    return () => clearInterval(interval);
  }, [timeData, timeElapsed, started]);

  return (
    <div className="grid">

      <div className="title">
      <h1>
          <img className="logo" src="src/assets/note.png" alt="image of frc crescendo note"/>
          <span className="crescendo">Crescendo</span> Cycle Time App!
          <img className="logo" src="src/assets/note.png" alt="image of frc crescendo note"/>
        </h1>
      </div>

      <div className="scoreInfo">
        <ScoreInfo
          totalAmountScored={timeData.getCount(Type.Amp, true) + timeData.getCount(Type.Speaker, true) + timeData.getCount(Type.Trap, true)}  
          totalAmountMissing={timeData.getCount(Type.Amp, false) + timeData.getCount(Type.Speaker, false) + timeData.getCount(Type.Trap, false)}
        />
      </div>
      <div className='timeInfo'>
        <TimeInfo
          timeElapsed={timeElapsed / 1000}
          timeSinceLastScore={TSLS / 1000}
        />
      </div>
      
      <div className='options'>
        <Options 
          onClickPause={pauseInterval}
          onClickStart={startInterval}
          />
      </div>

      <div className='amp'>
        <Counter
          name='Amp'
          count={timeData.getCount(Type.Amp, true)}
          countM={timeData.getCount(Type.Amp, false)}
          onMClickDown={() =>{handleButtonClick(Type.Amp, false, false)}}
          onMClickUp={() =>{handleButtonClick(Type.Amp, false, true)}}
          onButtonDown={() =>{handleButtonClick(Type.Amp,true, false)}}
          onButtonUp={() =>{handleButtonClick(Type.Amp, true, true)}}
          percentageScored={timeData.percentageScored(Type.Amp)}
        />
      </div>
      <div className='speaker'>
        <Counter
          name='Speaker'
          count={timeData.getCount(Type.Speaker, true)}
          countM={timeData.getCount(Type.Speaker, false)}
          onMClickDown={() =>{handleButtonClick(Type.Speaker, false, false)}}
          onMClickUp={() =>{handleButtonClick(Type.Speaker, false, true)}}
          onButtonDown={() =>{handleButtonClick(Type.Speaker,true, false)}}
          onButtonUp={() =>{handleButtonClick(Type.Speaker, true, true)}}
          percentageScored={timeData.percentageScored(Type.Speaker)}
        />
      </div>
      <div className='trap'>
        <Counter
          name='Trap'
          count={timeData.getCount(Type.Trap, true)}
          countM={timeData.getCount(Type.Trap, false)}
          onMClickDown={() =>{handleButtonClick(Type.Trap, false, false)}}
          onMClickUp={() =>{handleButtonClick(Type.Trap, false, true)}}
          onButtonDown={() =>{handleButtonClick(Type.Trap,true, false)}}
          onButtonUp={() =>{handleButtonClick(Type.Trap, true, true)}}
          percentageScored={timeData.percentageScored(Type.Trap)}
        />
      </div>

      

    </div>
  )

  function handleButtonClick (type: Type, isScore: boolean, isUp: boolean) {
    if (!started) {
      return;
    }

    if (isUp) {
      const times: Event[] = [...timeData.getTimes(), new Event(type, timeElapsed, isScore)];
      setTimeData(new TimeStorage(times));
    }
    else {
      const times: Event[] = [...timeData.getTimes()];
      for (let i = times.length-1; i >= 0; i--) {
        if (times[i].type === type && times[i].isScore === isScore) {
          times.splice(i, 1);
          break;
        }
      }
      console.log(times);
      setTimeData(new TimeStorage(times));
    }
  }

  function startInterval () {
    if (started) {
      return;
    }
    setStarted(true);
    setTimeData(new TimeStorage(timeData.getTimes()));
  }
  function pauseInterval () {
    if (!started) {
      return;
    }
    setStarted(false);
  }
}

export default App;