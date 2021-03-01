import Country from './Country'
import Message from './Message'

const Countries = ({ data, searchQuery }) => {
  const whatToShow = () => {
    if (data.length > 10 && searchQuery === '') return <Message text={'Search For A Country'} />
    else if (data.length > 10 && searchQuery !== '')
      return <Message text={'Too Many Matches, Specify Another Filter'} />
    else if (data.length > 1 && data.length < 11)
      return data.map((c) => <Country key={c.alpha2Code} cInfo={c} showingOne={false} />)
    else return data.map((c) => <Country key={c.alpha2Code} cInfo={c} showingOne={true} />)
  }

  return (
    <div>
      <h1>Results</h1>
      {whatToShow()}
    </div>
  )
}

export default Countries
