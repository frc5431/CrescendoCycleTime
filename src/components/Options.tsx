interface Props {
  onClickPause: () => void;
  onClickStart: () => void;
}

function Options ({onClickPause, onClickStart}: Props) {
  return (
    <>
    <button onClick={onClickStart} className="startbutton">Start</button>
    <button onClick={onClickPause} className="pausebutton">Pause</button>
  </>
  )
}

export default Options;