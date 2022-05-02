import { useState, useEffect} from 'react'
import axios from 'axios'
import CountrySummary from './components/country-summary.js'
import CountryDetails from './components/country-details.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, filterCountries] = useState(countries) 
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        filterCountries(response.data)
      })
  }, [])

  const changeFilterInput = (event) => {
    filter(event.target.value)
  }

  const filter = (filterString) => {
    setNewFilter(filterString)
    const filteredCountries = countries.filter(item => filterString === '' || item.name.common.toLowerCase().startsWith(filterString.toLowerCase()))
    filterCountries(filteredCountries)
  }

  const setCountryShowHandler = (cntry) => {
    const handler = () => {
      filter(cntry)
    }
    return handler;
  }
  

  return (
    <div>
        <div>
            find by name: <input value={newFilter} onChange={changeFilterInput} />
        </div>
      { filteredCountries.length > 10 && <p> Too many matches, specify another filter</p> }
      { filteredCountries.length > 1 && filteredCountries.length <= 10 && 
         filteredCountries.map(item => <CountrySummary key={item.name.official} name={item.name.common} showHandler={setCountryShowHandler(item.name.common)}/>) }
      { filteredCountries.length === 1 && <CountryDetails country={filteredCountries[0]}/>}
    </div>
    
  )
}

export default App

