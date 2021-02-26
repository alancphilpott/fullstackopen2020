import React, { useState } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'

function App() {
  const [contacts, setContacts] = useState([
    { name: 'Alan Philpott', number: '(429) 304-2158' },
    { name: 'Arto Hellas', number: '(499) 926-9005' },
    { name: 'Ada Lovelace', number: '(229) 797-0796' },
    { name: 'Dan Abramov', number: '(397) 845-7465' },
    { name: 'Mary Poppendieck', number: '(728) 360-4209' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const checkAlreadyExists = (person) =>
    contacts.some(
      (p) => p.name.toLowerCase() === person.name.toLowerCase() || p.number === person.number
    )

  const handleNameInput = (e) => setNewName(e.target.value)

  const handleNumberInput = (e) => setNewNumber(e.target.value)

  const handleSearchInput = (e) => setSearch(e.target.value)

  const handleNewContact = (e) => {
    e.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (checkAlreadyExists(newPerson))
      alert(`${newName} or ${newNumber} Already Added To Phonebook`)
    else {
      setContacts(contacts.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const contactsToShow =
    search === ''
      ? contacts
      : contacts.filter((p) => p.name.toLocaleLowerCase().includes(search.toLowerCase()))

  return (
    <div className={'app-main'}>
      <h1>Phonebook 📖</h1>
      <Filter search={search} handleClick={handleSearchInput} />

      <h1>Add New Contact ➕</h1>
      <ContactForm
        name={newName}
        number={newNumber}
        handleForm={handleNewContact}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />

      <h1>Contacts 👥</h1>
      <Contacts contacts={contactsToShow} />
    </div>
  )
}

export default App
