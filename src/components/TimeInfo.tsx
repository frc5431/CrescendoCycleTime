export interface TimeDataProps {
  timeElapsed: number;
  timeSinceLastScore: number;
}


const TimeInfo: React.FC<TimeDataProps> = ({timeElapsed, timeSinceLastScore}: TimeDataProps) => {

  return (
    <>
      <div>
        <h2>
         Time Elapsed: {timeElapsed}
        </h2>
      </div>
      <div>
        <h2>
          Time Since Last Score: {timeSinceLastScore}
        </h2>
      </div>
    </>
  )
}

export default TimeInfo;