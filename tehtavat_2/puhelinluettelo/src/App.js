import React from 'react';

const Person = (props) => {
  const {persons} = props

  const rivit = () => persons.map(function(person) {
    return (
      <div key={person.name}>
        <p>{person.name} {person.number}</p>
      </div>
  )
  })

  return (
    <div>
      {rivit()}
    </div>
  )
}

  const Filter = (props) => {

    return (
      <div>
        rajaa näytettäviä: <input
          value={props.filter}
          onChange={props.filterContacts}
          onKeyPress= {props.filterResults}
        />
      </div>
    )
  }



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: '',
      showAll: true
    }
  }




  addContact = (event) => {
    event.preventDefault()

    const newContact = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const names = this.state.persons.map((person) => person.name)
    const numbers = this.state.persons.map((person) => person.number)

    if (names.indexOf(newContact.name) === -1 && numbers.indexOf(newContact.number)) {
      const persons = this.state.persons.concat(newContact)
      this.setState({persons: persons})
    } else {
      alert("Name or number is already listed in contacts")
    }
    this.setState({
      newName: '',
      newNumber: ''
    })
  }


  handleNameChange = (event) => (
    this.setState({ newName: event.target.value})
  )

  handleNumberChange = (event) => (
    this.setState({ newNumber: event.target.value})
  )


  filterContacts = (event) => {
    this.setState({ filter: event.target.value})
  }

  filterResults = (event) => {
      this.setState({showAll: false})
  }



  render() {
    const contactsToShow =
      this.state.showAll ?
      this.state.persons :
      this.state.persons.filter((person) => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter
          filter= {this.state.filter}
          filterContacts={this.filterContacts}
          filterResults={this.filterResults}
        />
        
        <form onSubmit={this.addContact}>
          <h3>Lisää uusi</h3>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div><br/>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div><br/>
            <button
              type="submit"
              onClick={this.addContact}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Person persons={contactsToShow} />
      </div>
    )
  }
}

export default App
