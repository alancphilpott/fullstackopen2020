import React, { useState, useEffect } from 'react'
import Language from './Language'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CountryContent = ({ cInfo }) => {
  const [weather, setWeather] = useState([])

  const fetchWeatherData = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${cInfo.name}`)
      .then((res) => {
        if (!res.data.error) {
          console.log('Response =>', res.data)
          setWeather(res.data)
        } else {
          console.log(`Response error: code: ${res.data.error.code}, info: ${res.data.error.info}`)
        }
      })
  }

  useEffect(fetchWeatherData, [cInfo])

  return (
    <div>
      <h1>Name: {cInfo.name}</h1>
      <p>Capital: {cInfo.capital}</p>
      <p>Population: {cInfo.population}</p>
      <h2>Languages</h2>
      <ul>
        {cInfo.languages.map((l) => (
          <Language key={l.iso639_2} name={l.name} />
        ))}
      </ul>
      <img alt="Country Flag" src={cInfo.flag} width={400} height={300} />
      <h1>Weather in {cInfo.name}</h1>
      {weather.current ? (
        <div>
          <p>Temperature: {weather.current.temperature}°C</p>
          <img alt="Country Flag" src={weather.current.weather_icons[0]} width={150} height={120} />
          <p>
            Wind: {weather.current.wind_speed}MPH Direction {weather.current.wind_dir}
          </p>
        </div>
      ) : (
        <p>Problem Retrieving Weather </p>
      )}
    </div>
  )
}

export default CountryContent
