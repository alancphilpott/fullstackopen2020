import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts }) => {
  return (
    <div className={'contacts'}>
      {contacts.map((p) => (
        <Contact key={p.name} person={p} />
      ))}
    </div>
  )
}

export default Contacts
