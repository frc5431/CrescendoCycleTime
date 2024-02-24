import React from 'react'
import TimeStorage from '../TimeStorage';
import { Type } from '../TimeStorage';
interface Props {
  timeData: TimeStorage
}

function History({timeData} : Props) {
  const scores = timeData.getTimes().map((e, i) => {
    const scoredMessage = e.isScore ? "Scored" : "Missed";
    return <h2 id={i.toString()}>
      <div>
        Event {i+1} at {e.type.toLowerCase()}
      </div>
      <div>
        {scoredMessage} at {(e.time/1000).toFixed(2)} seconds
      </div>
    </h2>
  })
  return (
    <div>
      <h1>
        History
      </h1>
      
      {/* all events*/}
      <div>
        {scores}
      </div>

      {/* amp data*/}
      <div>
        <h1>Amp data</h1>
        <h2>
          Perecentage Scored: {timeData.percentageScored(Type.Amp).toFixed(2)}%
        </h2>
        <h2>
          Best Cycle: {(timeData.bestCycle(Type.Amp) / 1000).toFixed(2)} seconds
        </h2>
        <h2>
          Worst Cycle: {(timeData.worstCycle(Type.Amp) / 1000).toFixed(2)} seconds
        </h2>
      </div>

      {/* Speaker data*/}
      <div>
        <h1>Speaker data</h1>
        <h2>
          Perecentage Scored: {timeData.percentageScored(Type.Speaker).toFixed(2)}%
        </h2>
        <h2>
          Best Cycle: {(timeData.bestCycle(Type.Speaker) / 1000).toFixed(2)} seconds
        </h2>
        <h2>
          Worst Cycle: {(timeData.worstCycle(Type.Speaker) / 1000).toFixed(2)} seconds
        </h2>
      </div>

      {/* Trap data*/}
      <div>
        <h1>Trap data</h1>
        <h2>
          Perecentage Scored: {timeData.percentageScored(Type.Trap).toFixed(2)}%
        </h2>
        <h2>
          Best Cycle: {(timeData.bestCycle(Type.Trap) / 1000).toFixed(2)} seconds
        </h2>
        <h2>
          Worst Cycle: {(timeData.worstCycle(Type.Trap) / 1000).toFixed(2)} seconds
        </h2>
      </div>
    </div>
  ) 
}

export default History;