import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts }) => (
  <div className={'contacts'}>
    {contacts.map((p) => (
      <Contact key={p.id} person={p} />
    ))}
  </div>
)

export default Contacts
