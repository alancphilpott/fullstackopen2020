import React from 'react'

const Filter = ({ search, handleInput }) => (
  <div className={'filter'}>
    <header>Search Contact</header>
    <input type="text" value={search} onChange={handleInput} />
  </div>
)

export default Filter
