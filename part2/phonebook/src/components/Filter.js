import React from 'react'

const Filter = ({ search, handleClick }) => (
  <div className={'filter'}>
    <header>Search Contact</header>
    <input type="text" value={search} onChange={handleClick} />
  </div>
)

export default Filter
