interface Props {
  onClickPause: () => void;
  onClickStart: () => void;
}

function Options ({onClickPause, onClickStart}: Props) {
  return (
    <>
    <button onClick={onClickStart}>Start</button>
    <button onClick={onClickPause}>Pause</button>
  </>
  )
}

export default Options;