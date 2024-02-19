export interface ScoreDataProps {
  totalAmountScored: number;
  totalAmountMissing: number;
}

const ScoreData: React.FC<ScoreDataProps> = ({totalAmountMissing, totalAmountScored}: ScoreDataProps) => {

  return (
    <>
      <div>
        <h2>
         Total amount scored: {totalAmountScored}
        </h2>
      </div>
      <div>
        <h2>
          Total amount missing: {totalAmountMissing}
        </h2>
      </div>
    </>
  )
}

export default ScoreData;