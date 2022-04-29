import { useState } from 'react'
import Filter from './components/filter.js'
import AddPersonForm from './components/add-person-form.js'
import Person from './components/person.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const changeNameInput = (event) => {
    setNewName(event.target.value)
  }
  const changeNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  const changeFilterInput = (event) => {
    setNewFilter(event.target.value)
  }
  const submitForm = (event) => {
    event.preventDefault()
    if (persons.findIndex(item => item.name === newName) !== -1) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input={newFilter} inputHandler={changeFilterInput} />
      <h2>add a new person</h2>
      <AddPersonForm nameInput={newName} 
        nameInputHandler={changeNameInput} 
        numberInput={newNumber} 
        numberInputHandler={changeNumberInput}
        submitFormHandler={submitForm}/>
      <h2>Numbers</h2>
      {persons.filter(item => newFilter === '' || item.name.toLowerCase().startsWith(newFilter.toLowerCase()))
        .map(item => <Person key={item.name} name={item.name} number={item.number} />)}
    </div>
    
  )
}

export default App
