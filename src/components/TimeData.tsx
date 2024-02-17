export interface TimeDataProps {
  timeElapsed: number;
  timeSinceLastScore: number;
}


const TimeData: React.FC<TimeDataProps> = ({timeElapsed, timeSinceLastScore}) => {


  return (
    <>
      <h2>
        Time Elapsed: {timeElapsed}
        Time Since Last Score: {timeSinceLastScore}
      </h2>
    </>
  )
}

export default TimeData;