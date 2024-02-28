import TimeStorage from '../TimeStorage';
import { Type } from '../TimeStorage';
import NoteImg from '/src/assets/note.png';
interface Props {
  timeData: TimeStorage;
  onRestart: () => void;
}

function EndScreen({timeData, onRestart} : Props) {

  const bestScoreMessageAmp = scoreMessage(timeData, Type.Amp, true);
  const bestScoreMessageSpeaker = scoreMessage(timeData, Type.Speaker, true);
  const bestScoreMessageTrap = scoreMessage(timeData, Type.Trap, true);
  const worstScoreMessageAmp = scoreMessage(timeData, Type.Amp, false);
  const worstScoreMessageSpeaker = scoreMessage(timeData, Type.Speaker, false);
  const worstScoreMessageTrap = scoreMessage(timeData, Type.Trap, false);

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
      
    <div className="infoFlex">
      <h1>
        Info
      </h1>

      {/* amp data*/}
      <div>
        <h2>Amp data</h2>
        <h3>
          Perecentage Scored: {timeData.percentageScored(Type.Amp).toFixed(2)}%
        </h3>
        <h3>
          Best Cycle: {bestScoreMessageAmp}
        </h3>
        <h3>
          Worst Cycle: {worstScoreMessageAmp}
        </h3>
      </div>
    
      {/* Speaker data*/}
      <div>
        <h2>Speaker data</h2>
        <h3>
          Perecentage Scored: {timeData.percentageScored(Type.Speaker).toFixed(2)}%
        </h3>
        <h3>
          Best Cycle: {bestScoreMessageSpeaker}
        </h3>
        <h3>
          Worst Cycle: {worstScoreMessageSpeaker}
        </h3>
      </div>

      {/* Trap data*/}
      <div>
        <h2>Trap data</h2>
        <h3>
          Perecentage Scored: {timeData.percentageScored(Type.Trap).toFixed(2)}%
        </h3>
        <h3>
          Best Cycle: {bestScoreMessageTrap}
        </h3>
        <h3>
          Worst Cycle: {worstScoreMessageTrap}
        </h3>
      </div>
      </div>
      <div className="eventStyle">

        {/* all events*/}
        <h1>Events</h1>
        {scores}
      </div>
      <div className="logocontainer"><img className="biglogo" src={NoteImg} alt="image of frc crescendo note"/>
      <button onClick={onRestart} className="restart" >Restart</button>
      </div>
    </div>
    
  ) 
}

function scoreMessage(timeData: TimeStorage, type: Type, bestScoreWanted: boolean) {
  const scoreTime = bestScoreWanted ? timeData.bestCycle(type) : timeData.worstCycle(type);
  return !scoreTime ? "None Scored" : (scoreTime/1000).toFixed(2) + " Seconds";
}

export default EndScreen;