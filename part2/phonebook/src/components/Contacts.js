import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts, handleDelete }) => (
  <div className={'contacts'}>
    {contacts.map((c) => (
      <Contact key={c.id} cInfo={c} handleDelete={handleDelete} />
    ))}
  </div>
)

export default Contacts
