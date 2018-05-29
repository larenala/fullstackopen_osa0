import React from 'react'

const Kurssi = (props) => {
  const {kurssit} = props

  const rivit = () => kurssit.map(function(kurssi) {
    return (
      <div key={kurssi.nimi}>
        <h1>{kurssi.nimi}</h1>
        {kurssi.osat.map((osa) => <p key={osa.nimi}> {osa.nimi} {osa.tehtavia}</p>)}
        <p>Yhteensä {kurssi.osat.reduce((summa, osa) => summa + osa.tehtavia, 0)} tehtävää</p>
      </div>
  )
  })

  return(
    <div>
      {rivit()}
    </div>
  )
}

export default Kurssi
