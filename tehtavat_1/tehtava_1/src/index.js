import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => (
  <h1>{props.kurssi.nimi}</h1>
)


const Osa = (props) => (
  <div>
    <p> {props.osa} {props.tehtavia}</p>
  </div>
)

const Sisalto = (props) => (
  <div>
    <Osa osa={props.kurssi.osat[0].nimi} tehtavia={props.kurssi.osat[0].tehtavia}/>
    <Osa osa={props.kurssi.osat[1].nimi} tehtavia={props.kurssi.osat[1].tehtavia}/>
    <Osa osa={props.kurssi.osat[2].nimi} tehtavia={props.kurssi.osat[2].tehtavia}/>
  </div>
)

const Yhteensa = (props) =>  (
  <p>Yhteensä {props.kurssi.osat[0].tehtavia + props.kurssi.osat[1].tehtavia + props.kurssi.osat[2].tehtavia} tehtävää.</p>
)

const App = () => {
  const kurssi = {

    nimi: "Half-stack sovelluskehitys",
    osat: [
      {
        nimi: "Reactin perusteet",
        tehtavia: 10
      },

      {
        nimi: "Tiedonvälitys propseilla",
        tehtavia: 7
      },

      {
        nimi: "Komponenttien tila",
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi} />
    </div>
  )

}


ReactDOM.render(<App />, document.getElementById('root'));
