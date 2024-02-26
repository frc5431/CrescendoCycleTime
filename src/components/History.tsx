import React from 'react'
import TimeStorage from '../TimeStorage';
import { Type } from '../TimeStorage';
import NoteImg from '/src/assets/note.png';
interface Props {
  timeData: TimeStorage
}

function History({timeData} : Props) {
  const scores = timeData.getTimes().map((e, i) => {
    const scoredMessage = e.isScore ? "Scored" : "Missed";
    return <h3 id={i.toString()}>
      <div>
        Event {i+1} at {e.type.toLowerCase()}
      </div>
      <div>
        {scoredMessage} at {(e.time/1000).toFixed(2)} seconds
      </div>
    </h3>
  })
  return (
    <div className="endcontainer">
      
    <div className="historyFlex">
      <h1>
        History
      </h1>
      
      
      {/* all events*/}

      

      {/* amp data*/}
      <div>
        <h2>Amp data</h2>
        <h3>
          Perecentage Scored: {timeData.percentageScored(Type.Amp).toFixed(2)}%
        </h3>
        <h3>
          Best Cycle: {(timeData.bestCycle(Type.Amp) / 1000).toFixed(2)} seconds
        </h3>
        <h3>
          Worst Cycle: {(timeData.worstCycle(Type.Amp) / 1000).toFixed(2)} seconds
        </h3>
      </div>

      {/* Speaker data*/}
      <div>
        <h2>Speaker data</h2>
        <h3>
          Perecentage Scored: {timeData.percentageScored(Type.Speaker).toFixed(2)}%
        </h3>
        <h3>
          Best Cycle: {(timeData.bestCycle(Type.Speaker) / 1000).toFixed(2)} seconds
        </h3>
        <h3>
          Worst Cycle: {(timeData.worstCycle(Type.Speaker) / 1000).toFixed(2)} seconds
        </h3>
      </div>

      {/* Trap data*/}
      <div>
        <h2>Trap data</h2>
        <h3>
          Perecentage Scored: {timeData.percentageScored(Type.Trap).toFixed(2)}%
        </h3>
        <h3>
          Best Cycle: {(timeData.bestCycle(Type.Trap) / 1000).toFixed(2)} seconds
        </h3>
        <h3>
          Worst Cycle: {(timeData.worstCycle(Type.Trap) / 1000).toFixed(2)} seconds
        </h3>
      </div>
      </div>
      <div className="eventstyle">
        <h1>Events</h1>
        {scores}
      </div>
      <div className="logocontainer"><img className="biglogo" src={NoteImg} alt="image of frc crescendo note" /></div>
    </div>
    
  ) 
}

export default History;