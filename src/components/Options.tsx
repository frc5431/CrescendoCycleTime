interface Props {
  onClickPause: () => void;
  onClickStart: () => void;
  onClickEnd: () => void;
}

function Options ({onClickPause, onClickStart, onClickEnd}: Props) {
  return (
    <div>
    <button onClick={onClickStart} className="startbutton">Start</button>
    <button onClick={onClickPause} className="pausebutton">Pause</button>
    <button onClick={onClickEnd} className="endbutton ">End</button>
  </div>
  )
}

export default Options;