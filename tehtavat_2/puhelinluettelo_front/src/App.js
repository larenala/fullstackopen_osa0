import React from 'react';
import Person from './components/Person.js';
import dbService from './services/people.js'
import SearchForm from './components/SearchForm.js'


const Notification = (props) => {
  if(props.message === null) {
    return null
  }
  return ( <div className={props.className}>{props.message}</div> )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      haku: '',
      showAll: true,
      success: '',
      error: ''
    }
  }


  componentDidMount () {
    dbService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
  }

  addContact = (event) => {
    event.preventDefault()

    if (this.state.newName === '' || this.state.newNumber === '') {
      this.setState({newName: '', newNumber: ''})
      this.setState({error: `Nimi tai numero puuttuu.`})
      document.getElementsByClassName("error")[0].style.display = "block";

      setTimeout(() => {
        document.getElementsByClassName("error")[0].style.display = "none";
        this.setState({error: ''})
      }, 2000)

    }

    const list = this.state.persons
    const personObj = {
      name: this.state.newName,
      number: this.state.newNumber
    }


    if (list.find(person => person.name === this.state.newName)) {
      let val = window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`);
        if (val) {
          const person = list.find(person => person.name === this.state.newName)

          dbService
            .update(person.id, personObj)
            .then(response => {
              this.setState({persons: list.map(p => p.id !== person.id ? p : response.data), newName: '', newNumber: ''})
              this.setState({success: `Henkilön ${person.name} numero vaihdettu.`})
              document.getElementsByClassName("success")[0].style.display = "block";

              setTimeout(() => {
                document.getElementsByClassName("success")[0].style.display = "none";
                this.setState({message: ''})
              }, 2000)
              return
            })
            .catch(error => {
              alert("Henkilön tiedot on poistettu järjestelmästä.")
              return
            })
        }
      this.setState({newName: '', newNumber: ''})

    } else {
      dbService
        .create(personObj)
        .then(result => {
          this.setState({
            persons: this.state.persons.concat(result.data),
            newName: '',
            newNumber: ''
          })
        })
        .catch(error => {
          console.log('fail: ', error)
        })
    }

    }


  handleChange = (event) => {
    if (event.target.name === "name") {
      this.setState({newName: event.target.value})
    } else if (event.target.name === "number") {
      this.setState({newNumber: event.target.value})
    }
  }

  rajaaHakua = (event) => {
    this.setState({haku: event.target.value, showAll: false})
    if (event.target.value === '') {
      this.setState({showAll: true})
    }
  }

  removeContact = (id) => {
      return () => {
        dbService
          .removeContact(id)
          .then(res => {
            const people = this.state.persons.filter(p => p.id !== id)
            this.setState({persons: people})
          })
          .catch(error => {
            console.log("virhe", error)
          })
          document.getElementsByClassName("success")[0].style.display = "block";
          this.setState({success: "Henkilö poistettiin yhteystiedoista."})
          setTimeout(() => {
            document.getElementsByClassName("success")[0].style.display = "none";
            this.setState({success: ''})
          }, 2000)
      }
  }


  render() {
    const personsToShow =
      this.state.showAll ?
      this.state.persons:
      this.state.persons.filter(p => p.name.toLowerCase().indexOf(this.state.haku.toLowerCase()) !== -1)

    return (
      <div className="content">
        <Notification className= "success" message={this.state.success} />
        <Notification className= "error" message={this.state.error} />
        <h2>Puhelinluettelo</h2>
        <SearchForm name="haku" value={this.state.haku} onChange={this.rajaaHakua} />
        <form><br/>
          <div>
            nimi: <input
              name="name"
              value={this.state.newName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            numero: <input
              name="number"
              value={this.state.newNumber}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button
              onClick={this.addContact}
              type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <div>
          {personsToShow.map(person =>
              <Person key={person.id} name={person.name} number={person.number} onClick={this.removeContact(person.id)}/>
          )}
          </div>
      </div>
    )
  }
}


export default App
