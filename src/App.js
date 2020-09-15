import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter((person) => person.name.toUpperCase().includes(filter.toUpperCase()))
    : persons

  const addNewPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = { ...existingPerson, number: newNumber }
        personService
          .update(personToUpdate)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id === returnedPerson.id
                ? returnedPerson
                : p))
            setNewName('')
            setNewNumber('')
            setNotification({
              message: `Updated ${returnedPerson.name}`,
              type: 'info'
            })
            setTimeout(() => {
              setNotification(null);
            }, 5000)
          })
          .catch(error => {
            setNotification({
              message: `Information of ${personToUpdate.name} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null);
            }, 5000)
            setPersons(persons.filter(p => p.id !== personToUpdate.id))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({
            message: `Added ${returnedPerson.name}`,
            type: 'info'
          })
          setTimeout(() => {
            setNotification(null);
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(id);
      console.log('Deleted person', id)
      setPersons(persons.filter(p => p.id !== id))
      setNotification({
        message: `Deleted ${personToDelete.name}`,
        type: 'info'
      })
      setTimeout(() => {
        setNotification(null);
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addNewPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )

}

export default App
