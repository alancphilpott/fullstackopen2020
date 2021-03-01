import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const fetchCounties = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data)
    })
  }

  useEffect(fetchCounties, [])

  const countriesToShow =
    search === ''
      ? countries
      : countries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="App">
      <Search searchQuery={search} handleChange={(e) => setSearch(e.target.value)} />
      <Countries data={countriesToShow} searchQuery={search} />
    </div>
  )
}

export default App
