interface Props {
  displayInfo: string[];
  data: string[];
}

function Sidedata ({data, displayInfo} : Props) {

  const mappedInfo = displayInfo.map((info, i) => {
    return (
      <h2 key={i}>
        {info}: {data[i]}
      </h2>
    );
  })

  return (
    <>
      {mappedInfo}
    </>
  )
}

export default Sidedata;