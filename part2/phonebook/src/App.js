import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import axios from 'axios'

function App() {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const getContactsEffectHook = () => {
    axios
      .get('http://localhost:3001/contacts')
      .then((res) => setContacts(res.data))
      .catch((err) => console.log('Error Fetching Data'))
  }

  useEffect(getContactsEffectHook, [])

  const checkAlreadyExists = (contact) =>
    contacts.some(
      (p) => p.name.toLowerCase() === contact.name.toLowerCase() || p.number === contact.number
    )

  const handleNameInput = (e) => setNewName(e.target.value)

  const handleNumberInput = (e) => setNewNumber(e.target.value)

  const handleSearchInput = (e) => setSearch(e.target.value)

  const handlenewContact = (e) => {
    e.preventDefault()

    const newContact = {
      name: newName,
      number: newNumber,
      id: contacts.length + 1
    }

    if (checkAlreadyExists(newContact))
      alert(`${newName} or ${newNumber} Already Added To Phonebook`)
    else {
      setContacts(contacts.concat(newContact))
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
        handleForm={handlenewContact}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />

      <h1>Contacts 👥</h1>
      <Contacts contacts={contactsToShow} />
    </div>
  )
}

export default App
