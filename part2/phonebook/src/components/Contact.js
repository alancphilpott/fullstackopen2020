import React from 'react'

const Contact = ({ cInfo, handleDelete }) => (
  <p>
    <span>
      {cInfo.name} : {cInfo.number}
    </span>{' '}
    <button className={'deleteBtn'} onClick={() => handleDelete(cInfo.id)}>
      Delete
    </button>
  </p>
)

export default Contact
