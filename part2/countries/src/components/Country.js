import React, { useState } from 'react'
import CountryContent from './CountryContent'

const Country = ({ cInfo, showingOne }) => {
  const [showMore, setShowMore] = useState(false)

  const showMultiple = () => {
    return showMore ? (
      <div>
        <span>{cInfo.name}</span>
        <button onClick={() => setShowMore(!showMore)}>Hide</button>
        <CountryContent cInfo={cInfo} />
      </div>
    ) : (
      <div>
        <span>{cInfo.name}</span>
        <button onClick={() => setShowMore(!showMore)}>Show</button>
      </div>
    )
  }

  return <div>{showingOne ? <CountryContent cInfo={cInfo} /> : showMultiple()}</div>
}

export default Country
