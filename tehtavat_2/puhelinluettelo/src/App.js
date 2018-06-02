import React from 'react'
import contactService from './services/yhteystiedot'

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const Person = (props) => {
    return (
      <div key={props.id}>
        <p>{props.name} {props.number} <Button text= "Poista" onClick={props.onClick}/></p>
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

  const Notification = (props) => {
    if (props.message === null) {
      return null
    }
    return (
      <div className={props.className}>
        {props.message}
      </div>
    )
  }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      showAll: true,
      success: null,
      error: null
    }
    this.removeContact = this.removeContact.bind(this)
  }

  componentDidMount() {
    contactService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
  }


  addContact = (event) => {
    event.preventDefault()

    const newContact = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const names = this.state.persons.map(person => person.name)
    const numbers = this.state.persons.map(person => person.number)

    if (names.indexOf(newContact.name) === -1 && numbers.indexOf(newContact.number) === -1) {
      contactService
        .create(newContact)
        .then(response => {
          newContact.id = response.data.id
          const persons = this.state.persons.concat(newContact)
          this.setState({
            persons: persons,
            success: `${newContact.name} lisättiin yhteystietoihin`
          })
          setTimeout(() => {
            this.setState({success: null})
          }, 3000)
        })
    } else if (names.indexOf(newContact.name) !== -1 && numbers.indexOf(newContact.number === -1)) {
      this.changeNumber(newContact)
    } else {
      alert("Yhteystieto on jo olemassa")
    }
    this.setState({
      newName: '',
      newNumber: ''
    })
  }

  changeNumber = (newContact) => {
    const person = this.state.persons.find(p => p.name === newContact.name)
    newContact.id = person.id
    if (window.confirm(`${newContact.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      contactService
        .update(person.id, newContact)
        .then(response => {
          this.setState({
            persons: this.state.persons.map(person => person.id !== newContact.id ? person : newContact),
            success: `Numero vaihdettiin henkilölle ${newContact.name}`
          })
          setTimeout(() => {
            this.setState({
              success: null
            })
          }, 3000)
        })
        .catch(error => {
          this.setState({
            error: 'Numeroa ei voitu vaihtaa. Tarkista onko yhteystieto luettelossa.'
          })
          setTimeout(() => {
            this.setState({
              error: null
            })
          }, 3000)
        })
    }
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

  removeContact (id)  {
    const person = this.state.persons.find(p => p.id === id )

    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      const persons = this.state.persons.filter(p => (p.id !== id))
      contactService
        .deleteItem(person.id)
        .then(response => {
          this.setState({
            persons: persons,
            success: `${person.name} poistettiin luettelosta.`
          })
          setTimeout(() => {
            this.setState({success: null})
          }, 3000)
        })
        .catch(error => {
          console.log("fail")
        })
    }
  }



  render() {

    const contactsToShow =
      this.state.showAll ?
      this.state.persons :
      this.state.persons.filter((person) => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)

    return (
      <div>
        <Notification message={this.state.success} className='success'/>
        <Notification message={this.state.error} className='error' />
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
          {contactsToShow.map(contact => {
            return (
              <Person
                key={contact.id}
                name={contact.name}
                number={contact.number}
                onClick={(id) => this.removeContact(contact.id)}
              />
            )
            }
          )}



      </div>
    )
  }
}

export default App
