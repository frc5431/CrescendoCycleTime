import { useEffect, useState } from 'react'
import './App.css'
import TimeStorage, { Event, Type } from './TimeStorage';
import Counter from './components/Counter';
import ScoreInfo from './components/ScoreInfo';
import TimeInfo from './components/TimeInfo';
import Options from './components/Options';

function App() {
  const [started, setStarted] = useState(false);
  const [timeData, setTimeData] = useState(new TimeStorage([], new Date()));
  const [TSLS, setTSLS] = useState(0); // time since last scored
  const [timeElapsed, setTimeElapsed] = useState(new Date());

   useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(new Date());

      if (timeData.getTimes().length == 0) {
        setTSLS(timeElapsed.getTime() - timeData.getStartTime().getTime());
      }
      else {
        setTSLS(timeElapsed.getTime() - timeData.getTimes()[timeData.getTimes().length - 1].time.getTime());
      }
    }, 20);

    return () => clearInterval(interval);
  }, [timeData, timeElapsed]);

  return (
    <div className="grid">
      <div className="titlecontainer">
        <img className="reverselogo" src="src/assets/note.png" alt="image of frc crescendo note" />
        <h1>
          <span className="crescendo">Crescendo</span> Cycle Time App!
        </h1>
        <img className="logo" src="src/assets/note.png" alt="image of frc crescendo note" />
      </div>


      <div className="scoreInfo">
        <ScoreInfo
          totalAmountScored={timeData.getCount(Type.Amp, true) + timeData.getCount(Type.Speaker, true) + timeData.getCount(Type.Trap, true)}
          totalAmountMissing={timeData.getCount(Type.Amp, false) + timeData.getCount(Type.Speaker, false) + timeData.getCount(Type.Trap, false)}
        />
      </div>
      <div className='timeInfo'>
        <TimeInfo
          timeElapsed={(timeElapsed.getTime() - timeData.getStartTime().getTime()) / 1000}
          timeSinceLastScore={TSLS / 1000}
        />
      </div>

      <div className='options'>
        <Options
          onClickPause={() => { setStarted(false)}}
          onClickStart={startInterval}
        />
      </div>

      <div className='amp'>
        <Counter
          name='Amp'
          count={timeData.getCount(Type.Amp, true)}
          countM={timeData.getCount(Type.Amp, false)}
          onMClickDown={() => { handleButtonClick(Type.Amp, false, false) }}
          onMClickUp={() => { handleButtonClick(Type.Amp, false, true) }}
          onButtonDown={() => { handleButtonClick(Type.Amp, true, false) }}
          onButtonUp={() => { handleButtonClick(Type.Amp, true, true) }}
          percentageScored={timeData.percentageScored(Type.Amp)}
        />
      </div>
      <div className='speaker'>
        <Counter
          name='Speaker'
          count={timeData.getCount(Type.Speaker, true)}
          countM={timeData.getCount(Type.Speaker, false)}
          onMClickDown={() => { handleButtonClick(Type.Speaker, false, false) }}
          onMClickUp={() => { handleButtonClick(Type.Speaker, false, true) }}
          onButtonDown={() => { handleButtonClick(Type.Speaker, true, false) }}
          onButtonUp={() => { handleButtonClick(Type.Speaker, true, true) }}
          percentageScored={timeData.percentageScored(Type.Speaker)}
        />
      </div>
      <div className='trap'>
        <Counter
          name='Trap'
          count={timeData.getCount(Type.Trap, true)}
          countM={timeData.getCount(Type.Trap, false)}
          onMClickDown={() => { handleButtonClick(Type.Trap, false, false) }}
          onMClickUp={() => { handleButtonClick(Type.Trap, false, true) }}
          onButtonDown={() => { handleButtonClick(Type.Trap, true, false) }}
          onButtonUp={() => { handleButtonClick(Type.Trap, true, true) }}
          percentageScored={timeData.percentageScored(Type.Trap)}
        />
      </div>



    </div>
  )

  function handleButtonClick(type: Type, isScore: boolean, isUp: boolean) {
    if (!started) {
      return;
    }
    if (isUp) {
      const times: Event[] = [...timeData.getTimes(), new Event(type, new Date(), isScore)];
      setTimeData(new TimeStorage(times, timeData.getStartTime()));
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
      setTimeData(new TimeStorage(times, timeData.getStartTime()));
    }
  }

  function startInterval () {
    if (started) {
      return;
    }
    setStarted(true);
    setTimeData(new TimeStorage([], new Date()));
  }
}

export default App;