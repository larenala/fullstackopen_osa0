import React from 'react';
import ReactDOM from 'react-dom';


const Button = ({teksti, handleClick}) => (
  <button onClick={handleClick}>
    {teksti}
  </button>
)

const TopVotes = (props) => (
  <div>
    <h2>anecdote with most votes:</h2><br/>
    <p>{props.lainaus}</p>
    <p>has {props.aanet} votes</p>

  </div>
)

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }

    this.getQuote = this.getQuote.bind(this)
    this.updatePoints = this.updatePoints.bind(this)
  }

  getRandom = (min, max) => (Math.floor(Math.random() * Math.floor(max - min + 1))+min)

  getQuote (arr) {
    return () =>  {
      let max = arr.length-1
      let newIndex = this.getRandom(0, max)
      this.setState({selected: newIndex})

    }
  }

    updatePoints(index) {
      return () => {
        const kopio = { ...this.state.pisteet}
        kopio[index] += 1
        this.setState({pisteet: kopio})
      }
    }

    getMostVotedIndex(pisteet) {
      let bestPoints = pisteet[0]
      let winIndex = 0
      for(let i = 0; i < 6; i++) {
        if(bestPoints < pisteet[i]) {
          winIndex = i
          bestPoints = pisteet[i]
        }
      }
      return winIndex
    }



  render() {

    return (

      <div>
        {this.props.anecdotes[this.state.selected]}
        <br/>
        <p>has {this.state.pisteet[this.state.selected]} votes</p>
        <br/>
        <Button teksti="Vote" handleClick={this.updatePoints(this.state.selected)}/>
        <Button teksti="New Quote" handleClick={this.getQuote(this.props.anecdotes)}/>
        <br />
        <TopVotes lainaus={this.props.anecdotes[this.getMostVotedIndex(this.state.pisteet)]}
        aanet= {this.state.pisteet[this.getMostVotedIndex(this.state.pisteet)]}/>
    </div>
  )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes= {anecdotes} />, document.getElementById('root'));
