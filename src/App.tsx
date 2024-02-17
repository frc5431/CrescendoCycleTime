import { useEffect, useRef, useState } from 'react'
import './App.css'
import TimeStorage from './TimeStorage';
import TimeData from './components/TimeData';

function App() {
  const timeData = useRef(new TimeStorage());
  timeData.current.restart();

  return (
    <div className='grid'>
      <div className="title">
        <h1><span className="crescendo">Crescendo</span> Cycle Time App!</h1>
      </div>
      <div className='timeData'>
      <TimeData
        timeElapsed={timeData.current.getStart().time.getTime() - new Date().getTime()}
        timeSinceLastScore={timeData.current.lastCycleTime()}
      />
      </div>
      
      

    </div>
  )
}

export default App
