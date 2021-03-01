import React from 'react'

const ContactForm = (props) => (
  <div className={'form-wrapper'}>
    <form onSubmit={props.handleForm}>
      <div>
        <header>Name</header>
        <input type="text" value={props.name} onChange={props.handleNameInput} />
        <header>Number</header>
        <input type="text" value={props.number} onChange={props.handleNumberInput} />
      </div>
      <div>
        <button type="submit">Add Contact</button>
      </div>
    </form>
  </div>
)

export default ContactForm
