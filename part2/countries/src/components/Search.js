const Search = (props) => {
  return (
    <div>
      <h1>Find Counties</h1>
      <input type="text" value={props.searchQuery} onChange={props.handleChange} />
    </div>
  )
}

export default Search
