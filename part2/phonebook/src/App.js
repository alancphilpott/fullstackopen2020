import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import contactService from './services/contacts'

function App() {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // Effects
  useEffect(() => {
    contactService
      .getAll()
      .then((contacts) => setContacts(contacts))
      .catch((err) => console.log(`Error Occured: ${err}`))
  }, [])

  // Helper Functions
  const checkAlreadyExists = (contact) =>
    contacts.filter((c) => c.name.toLowerCase() === contact.name.toLowerCase())

  // Event and State Mngt
  const handleNameInput = (e) => setNewName(e.target.value)

  const handleNumberInput = (e) => setNewNumber(e.target.value)

  const handleSearchInput = (e) => setSearch(e.target.value)

  const handleNewContact = (e) => {
    e.preventDefault()

    const newContact = {
      name: newName,
      number: newNumber
    }

    const existing = checkAlreadyExists(newContact)
    if (existing.length !== 0) {
      const existingContact = existing[0]

      const shouldUpdate = window.confirm(
        `${existingContact.name} Already Exists - Update Their Phone Number?`
      )

      const updatedContact = { ...existingContact, number: newContact.number }

      if (shouldUpdate)
        contactService.update(existingContact.id, updatedContact).then((contact) => {
          setContacts(contacts.map((c) => (c.id !== updatedContact.id ? c : contact)))
        })
    } else {
      contactService
        .create(newContact)
        .then((contact) => {
          setContacts(contacts.concat(contact))
          setNewName('')
          setNewNumber('')
        })
        .catch((err) => console.log(`Error Occured: ${err}`))
    }
  }

  const handleDeleteContact = (id) => {
    const contact = contacts.find((c) => c.id === id)

    const shouldDelete = window.confirm(`Delete ${contact.name}?`)

    if (shouldDelete) {
      contactService
        .deleteOne(id)
        .then((res) => {
          setContacts(contacts.filter((c) => c.id !== id))
        })
        .catch((err) => console.log(`Error Occured: ${err}`))
    }
  }

  const contactsToShow =
    search === ''
      ? contacts
      : contacts.filter((p) => p.name.toLocaleLowerCase().includes(search.toLowerCase()))

  return (
    <div className={'app-main'}>
      <h1>Phonebook 📖</h1>
      <Filter search={search} handleInput={handleSearchInput} />

      <h1>Add New Contact ➕</h1>
      <ContactForm
        name={newName}
        number={newNumber}
        handleForm={handleNewContact}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />

      <h1>Contacts 👥</h1>
      <Contacts contacts={contactsToShow} handleDelete={handleDeleteContact} />
    </div>
  )
}

export default App
