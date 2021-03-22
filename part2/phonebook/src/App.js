import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import contactService from './services/contacts'
import Notification from './components/Notification'

function App() {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showNotification, setShowNotification] = useState({ message: null, type: null })

  // Effects
  useEffect(() => {
    contactService
      .getAll()
      .then((contacts) => setContacts(contacts))
      .catch((err) => {
        setShowNotification({ message: `Error Loading Contacts`, type: 'error' })

        setTimeout(() => setShowNotification({ message: null, type: null }), 2000)
      })
  }, [])

  // Helper Functions
  const checkExists = (contact) =>
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

    const existing = checkExists(newContact)
    if (existing.length !== 0) {
      const existingContact = existing[0]

      const shouldUpdate = window.confirm(
        `"${existingContact.name}" Already Exists - Update Their Phone Number?`
      )

      const updatedContact = { ...existingContact, number: newContact.number }

      if (shouldUpdate) {
        contactService
          .update(existingContact.id, updatedContact)
          .then((contact) => {
            setContacts(contacts.map((c) => (c.id !== updatedContact.id ? c : contact)))

            setShowNotification({ message: `Updated ${updatedContact.name}`, type: 'updated' })

            setTimeout(() => setShowNotification({ message: null, type: null }), 2000)

            setNewName('')
            setNewNumber('')
          })
          .catch((err) => {
            const errorMsg = err.response.data.error

            setShowNotification({ message: `${errorMsg}`, type: 'error' })

            setTimeout(() => setShowNotification({ message: null, type: null }), 4000)
          })
      }
    } else {
      contactService
        .create(newContact)
        .then((contact) => {
          setContacts(contacts.concat(contact))

          setShowNotification({ message: `Added ${contact.name}`, type: 'added' })

          setTimeout(() => setShowNotification({ message: null, type: null }), 2000)

          setNewName('')
          setNewNumber('')
        })
        .catch((err) => {
          const errorMsg = err.response.data.error

          setShowNotification({ message: `${errorMsg}`, type: 'error' })

          setTimeout(() => setShowNotification({ message: null, type: null }), 4000)
        })
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

          setShowNotification({ message: `Deleted ${contact.name}`, type: 'deleted' })

          setTimeout(() => setShowNotification({ message: null, type: null }), 2000)
        })
        .catch((err) => {
          setContacts(contacts.filter((c) => c.id !== id))

          setShowNotification({
            message: `Information of ${contact.name} has already been removed from server`,
            type: 'error'
          })

          setTimeout(() => setShowNotification({ message: null, type: null }), 2000)
        })
    }
  }

  const contactsToShow =
    search === ''
      ? contacts
      : contacts.filter((p) => p.name.toLocaleLowerCase().includes(search.toLowerCase()))

  return (
    <div className={'app-main'}>
      <h1>Phonebook 📖</h1>
      <Notification message={showNotification.message} type={showNotification.type} />

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
