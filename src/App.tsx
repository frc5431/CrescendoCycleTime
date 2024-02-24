import { useEffect, useRef, useState } from 'react'
import './App.css'
import TimeStorage, { Event, Type } from './TimeStorage';
import Counter from './components/Counter';
import ScoreInfo from './components/ScoreInfo';
import TimeInfo from './components/TimeInfo';
import Options from './components/Options';
import confetti from 'canvas-confetti';
import NoteImg from "/src/assets/note.png"
import ReactDOM from 'react-dom';
import History from './components/History';

function App() {
  const [started, setStarted] = useState(false);
  const intervalTime = useRef(20); // useEffect interval time
  const [timeData, setTimeData] = useState(new TimeStorage([]));
  const [TSLS, setTSLS] = useState(0); // time since last scored
  const [timeElapsed, setTimeElapsed] = useState(0);
  const canvasRef = useRef(null);
  const [isEnd, setIsEnd] = useState(false);



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
        setTSLS(timeElapsed - timeData.getMostRecentScore());
      }
    }, intervalTime.current);
    return () => clearInterval(interval);
  }, [timeData, timeElapsed, started]);

  return (
    <>
    {isEnd && (
      <>
        <History timeData={timeData}/>
        <button onClick={reset}>Restart</button>
      </>
    )}

    {!isEnd && (
      <>
        <div className="grid">
          <div className="titlecontainer">
            <img className="reverselogo" src={NoteImg} alt="image of frc crescendo note" />
            <h1>
              <span className="crescendo">Crescendo</span> Cycle Time App!
            </h1>
            <img className="logo" src={NoteImg} alt="image of frc crescendo note" />
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
              onClickEnd={handleGameEnd}
            />
          </div>

          <div className='amp'>
            <Counter
              name='Amp'
              count={timeData.getCount(Type.Amp, true)}
              countM={timeData.getCount(Type.Amp, false)}
              onMClickDown={() => { handleButtonClick(Type.Amp, false, false, false) }}
              onMClickUp={() => { handleButtonClick(Type.Amp, false, true, false) }}
              onButtonDown={() => { handleButtonClick(Type.Amp, true, false, false) }}
              onButtonUp={() => { handleButtonClick(Type.Amp, true, true, true) }}
            />
          </div>
          <div className='speaker'>
            <Counter
              name='Speaker'
              count={timeData.getCount(Type.Speaker, true)}
              countM={timeData.getCount(Type.Speaker, false)}
              onMClickDown={() => { handleButtonClick(Type.Speaker, false, false, false) }}
              onMClickUp={() => { handleButtonClick(Type.Speaker, false, true, false) }}
              onButtonDown={() => { handleButtonClick(Type.Speaker, true, false, false) }}
              onButtonUp={() => { handleButtonClick(Type.Speaker, true, true, true) }}
            />
          </div>
          <div className='trap'>
            <Counter
              name='Trap'
              count={timeData.getCount(Type.Trap, true)}
              countM={timeData.getCount(Type.Trap, false)}
              onMClickDown={() => { handleButtonClick(Type.Trap, false, false, false) }}
              onMClickUp={() => { handleButtonClick(Type.Trap, false, true, false) }}
              onButtonDown={() => { handleButtonClick(Type.Trap, true, false, false) }}
              onButtonUp={() => { handleButtonClick(Type.Trap, true, true, true) }}
            />
          </div>


          {ReactDOM.createPortal((<>
            <canvas ref={canvasRef}/>
          
          </>), window.document.body)}
        </div>
      </>
    )}

    </>

  )

  function handleButtonClick(type: Type, isScore: boolean, isUp: boolean, confettiBool: boolean) {
    if (!started) {
      return;
    }

    if (isUp) {
      if (type === Type.Trap && isScore && timeData.getCount(Type.Trap, true ) > 2) {
        return;
      }

      const times: Event[] = [...timeData.getTimes(), new Event(type, timeElapsed, isScore)];
      setTimeData(new TimeStorage(times));

      if (confettiBool && canvasRef.current) {

        confetti.create(canvasRef.current, {resize: true})({
          particleCount: 200,
          spread: 360,
          origin: { y: Math.random() - 0.2, x: Math.random() },
          startVelocity: 40,
          colors: [
            '9370DB',
            '3673CD',
            '00D4E3',
            '7D61CF'
          ]
        });
      }
    }
    else {
      const times: Event[] = [...timeData.getTimes()];
      for (let i = times.length - 1; i >= 0; i--) {
        if (times[i].type === type && times[i].isScore === isScore) {
          times.splice(i, 1);

          break;
        }
      }
      console.log(times);
      setTimeData(new TimeStorage(times));
    }
  }

  function startInterval() {
    if (started) {
      return;
    }
    setStarted(true);
    setTimeData(new TimeStorage(timeData.getTimes()));
  }

  function pauseInterval() {
    if (!started) {
      return;
    }
    setStarted(false);
  }
  
  function handleGameEnd() {
    setIsEnd(true);
    pauseInterval();
  }

  function reset() {
    setIsEnd(false);
    setTimeData(new TimeStorage([]));
    setTSLS(0);
    setTimeElapsed(0);
  }
}

export default App;