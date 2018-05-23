import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, showResults, text}) => (
  <button onClick= {() => {handleClick(); showResults()}} >
    {text}
  </button>
)

const Statistic = ({text, calculation}) => (
  <p>{text} {calculation}</p>
)

const Statistics = (props) => (
  <table>
    <tbody>
      <tr>
        <td>
          <Statistic text="hyvä" />
        </td>
        <td>
          <Statistic calculation={props.counterPos}/>
        </td>
      </tr>
      <tr>
        <td>
          <Statistic text="neutraali" />
        </td>
        <td>
          <Statistic calculation={props.counterNeutral}/>
        </td>
      </tr>

      <tr>
        <td>
          <Statistic text="huono" />
        </td>
        <td>
          <Statistic calculation={props.counterNeg}/>
        </td>
      </tr>

      <tr>
        <td>
          <Statistic text="keskiarvo" />
        </td>
        <td>
          <Statistic calculation={props.keskiarvo}/>
        </td>
      </tr>

      <tr>
        <td>
          <Statistic text="positiivisia" />
        </td>
        <td>
          <Statistic calculation={props.positiivisia}/>
        </td>
      </tr>
      </tbody>
  </table>
)

class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      counterPos: 0,
      counterNeutral: 0,
      counterNeg: 0,
      showResults: false
    }
    this.summa = 0
    this.laskuri =0
    this.keskiarvo = 0
    this.positiivisia = 0
    /*this.kasvataPos = this.kasvataPos.bind(this)
    this.kasvataNeutral = this.kasvataNeutral.bind(this)
    this.kasvataNeg = this.kasvataNeg.bind(this)*/
    this.kasvata = this.kasvata.bind(this)
  }

  laskeProsenttiosuus(pos, laskuri) {
    this.luku = (pos / laskuri)
    return this.luku * 100
  }

  kasvata(teksti) {
    return () => {
      this.laskuri += 1

      if (teksti === "hyvä") {
        this.summa += 1
        this.positiivisia += 1
        this.setState({ counterPos: this.state.counterPos + 1 })
      } else if (teksti === "neutraali"){
        this.setState({ counterNeutral: this.state.counterNeutral + 1 })
      } else {
        this.summa -= 1
        this.setState({ counterNeg: this.state.counterNeg + 1 })
      }
    }
  }

  laskeKeskiarvo = () => (this.summa / this.laskuri)

  getResults = () => {this.setState({showResults: true})}

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>

        <Button handleClick= {this.kasvata("hyvä")}
        showResults = {this.getResults}
        text="hyvä"
        />

        <Button handleClick= {this.kasvata("neutraali")}
          showResults = {this.getResults}
          text="neutraali"
        />

        <Button handleClick={this.kasvata("huono")}
          showResults = {this.getResults}
          text="huono"
        />
        <h2>statistiikka</h2>
        {this.state.showResults ? <Statistics counterPos={this.state.counterPos}
        counterNeutral={this.state.counterNeutral}
        counterNeg ={this.state.counterNeg}
        keskiarvo = {this.laskeKeskiarvo().toFixed(2)}
        positiivisia = {this.laskeProsenttiosuus(this.positiivisia, this.laskuri).toFixed(1) + "%"}/> :
        "ei yhtään palautetta annettu"}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
