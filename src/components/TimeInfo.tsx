export interface TimeDataProps {
  timeElapsed: number;
  timeSinceLastScore: number;
}


const TimeInfo: React.FC<TimeDataProps> = ({timeElapsed, timeSinceLastScore}: TimeDataProps) => {

  return (
    <>
      <div>
        <h2>
         Time Elapsed: {timeElapsed.toFixed(2)} seconds
        </h2>
      </div>
      <div>
        <h2>
          Time Since Last Score: {timeSinceLastScore.toFixed(2)} seconds
        </h2>
      </div>
    </>
  )
}

export default TimeInfo;