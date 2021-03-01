import Language from './Language'

const Country = ({ cInfo, showingOne }) => {
  return (
    <div>
      {showingOne ? (
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
          <img src={cInfo.flag} width={400} height={300} />
        </div>
      ) : (
        <p>{cInfo.name}</p>
      )}
    </div>
  )
}

export default Country
