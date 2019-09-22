import React, { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('countries effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = search
    ? countries.filter(country => country.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    : countries

  const handleInput = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          find countries:
          <Filter search={search} handleInput={handleInput} />
        </label>
      </form>
      <Countries countries={countriesToShow} setSearch={setSearch}/>     
    </div>
  );
}

const Countries = (props) => {
  console.log('Countries: ', props)
  let countries = props.countries
  if(countries.length > 10){
    return (
      <div>Too many matches, specify another filter</div>
    )
  }else if(countries.length === 1){
  //  console.log(countries)
    return ( 
      <>     
        <h2>{countries[0].name}</h2>
        <div>capital: {countries[0].capital}</div>
        <div>population: {countries[0].population}</div>
        <h3>Languages</h3>
        <ul><Languages languages={countries[0].languages} /></ul>
        <div>
          <img src={countries[0].flag} alt='flag' width={90} mode='fit' />
        </div>
        <h3>Weather in {countries[0].capital}</h3>
        <Weather capital={countries[0].capital} />
      </>
    )
  }

  return (
    countries.map(country => 
      <div key={country.name}>
        {country.name} <Button country={country} setSearch={props.setSearch} />
      </div>
    )
  )
}

const Button = (props) => {

  const handleClick = () => {
    console.log(props.country.name)
    props.setSearch(props.country.name)

  }
  
  return (
    <button onClick={handleClick}>
      show
    </button>
  )
}

const Weather = (props) => {
  const capital = props.capital
  const [weather, setWeather] = useState({
    temp_c: 0,
    icon: '',
    wind_kph: '',
    wind_dir: ''
  });

  useEffect(() => {
    axios.get(
      'http://api.apixu.com/v1/current.json?key=28989f7e6ab24930900170413191107&q='.concat(capital)
    ).then((result) => {

    const weatherData = {
      temp_c: result.data.current.temp_c,
      icon: result.data.current.condition.icon,
      wind_kph: result.data.current.wind_kph,
      wind_dir: result.data.current.wind_dir
    }
    setWeather(weatherData)      
    })

  }, [capital]);

  return (  
    <>
      <p><strong>temperature:&nbsp;</strong>{weather.temp_c}&nbsp;Celsius</p>
      <img src={weather.icon} alt="weather icon"></img>
      <p><strong>wind:&nbsp;</strong>{weather.wind_kph}&nbsp;kph, direction&nbsp;<strong>{weather.wind_dir}</strong></p>
    </>
  );

}

const Languages = (props) => {
  let languages = props.languages
  console.log(props)
  return (
    languages.map(language => 
      <li key={language.name}>
      {language.name}
      </li>)
  )
}

const Filter = (props) => {
  return (
    <input
      value={props.search}
      onChange={props.handleInput}
    />
  )
}

export default App;
