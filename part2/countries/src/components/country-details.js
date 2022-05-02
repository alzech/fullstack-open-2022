import React from 'react'
import { useState, useEffect, useRef} from 'react'
import axios from 'axios'

const CountryDetail = (props) => {
    console.log(props)
    const { country } = props
    console.log(country.latlng[0])
    const [weather, setWeather] = useState('')
    const weatherUrl = useRef(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
    let languages = []
    for (const key of Object.keys(country.languages)) {
        languages.push(country.languages[key])
    }

    useEffect(() => {
        console.log('in effect')
        axios
          .get(weatherUrl.current)
          .then(response => {
            const weatherResp = {
                icon : `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                temp : response.data.main.temp,
                windSpeed : response.data.wind.speed
            }
            setWeather(weatherResp)
          })
      }, [])


    return (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital : {country.capital.join()}</p>
        <p>area : {country.area}</p>
        <p>languages:</p>
        <ul>
            {languages.map(item => <li key={item}>{item}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag"></img>
        <h2>Weather in {country.name.common}</h2>
        <p>temperature - {weather.temp} Celcius</p>
        <img src={weather.icon} alt="weather"></img>
        <p>wind - {weather.windSpeed} m/s</p>
    </div>

    )
  }
  
  export default CountryDetail