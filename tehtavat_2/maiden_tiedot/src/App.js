import React, { Component } from 'react';
import axios from 'axios'
import './index.css'


class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        countries: [],
        newValue: '',
        current: null
      }

  }

  componentDidMount(){
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({
          countries: response.data
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      newValue: event.target.value,
      current: null
    })
  }

  filterResults = (event) => {
    let countries = this.state.countries
      .filter((c) => c.name.toLowerCase()
      .indexOf(this.state.newValue.toLowerCase()) !== -1)

    if(countries.length > 10 || this.state.newValue === '') {
      return <p>too many matches, specify another filter</p>
    } else {
      return countries.map(c => <p onClick={() => this.setState({current: c})} key={c.alpha2Code}>{c.name}</p>)
    }
 }

  showResults = (c) => {
    return(
      <div key={c.alpha2Code}>
      <h2>{c.name}</h2>
        <p>capital: {c.capital} </p>
      <p>population: {c.population}</p>
      <img src={c.flag} alt="flag" width="300" />
    </div>
  )
}


  render() {
    const resultsToShow = (this.state.current === null) ?
    this.filterResults() : this.showResults(this.state.current)

    return (
      <div><br/>
        <form>
          find countries:
          <input
            value={this.state.newValue}
            onChange={this.handleChange}
            onKeyPress={this.filterResults}
            />
        </form>
        <div id="result">{resultsToShow}</div>
      </div>
    );
  }
}

export default App;
