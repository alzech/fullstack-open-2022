import { useState, useEffect} from 'react'
import Filter from './components/filter.js'
import AddPersonForm from './components/add-person-form.js'
import Person from './components/person.js'
import Notification from './components/ui-message.js'
import personService from './services/person.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const changeNameInput = (event) => {
    setNewName(event.target.value)
  }
  const changeNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  const changeFilterInput = (event) => {
    setNewFilter(event.target.value)
  }
  const addUIMessage = (message, messageType) => {
    setMessage(message)
    setMessageType(messageType)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }
  const submitForm = (event) => {
    event.preventDefault()
    const person = persons.find(item => item.name === newName)
    if (person !== undefined) {
      if (window.confirm(`${person.name} is already added to phonebook, replace number?`)) {
        const updatedPerson = {...person, number:newNumber}
        personService.update(updatedPerson.id, updatedPerson)
          .then(data => {
            setPersons(persons.map(item => item.id !== updatedPerson.id ? item : data))
            setNewName('')
            setNewNumber('')
            addUIMessage(`Updated ${updatedPerson.name}`, 'success')
          })
          .catch(error => {
            addUIMessage(`Error Updated Person : ${error}`, 'error')
          })
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      personService.create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          addUIMessage(`Added ${newPerson.name}`, 'success')
          setMessage(`Added ${newPerson.name}`)
        })
        .catch(error => {
          addUIMessage(`Error Adding Person : ${error}`, 'error')
        })
    }
  }
  const setRemovePersonHandler = (id) => {
      const handler = () => {
        if (window.confirm(`Do you wish to delete the person with id : ${id}`)) {
          personService.remove(id) 
          setPersons(persons.filter(item => item.id !== id))
        }        
      }
      return handler
    }

  return (
    <div>
      <h2>Phonebook</h2>
      {message !== '' && <Notification message={message} messageType={messageType} />}
      <Filter input={newFilter} inputHandler={changeFilterInput} />
      <h2>add a new person</h2>
      <AddPersonForm nameInput={newName} 
        nameInputHandler={changeNameInput} 
        numberInput={newNumber} 
        numberInputHandler={changeNumberInput}
        submitFormHandler={submitForm}/>
      <h2>Numbers</h2>
      {persons.filter(item => newFilter === '' || item.name.toLowerCase().startsWith(newFilter.toLowerCase()))
        .map(item => <Person key={item.name} name={item.name} number={item.number} removeHandler={setRemovePersonHandler(item.id)}/>)}
    </div>
    
  )
}

export default App
