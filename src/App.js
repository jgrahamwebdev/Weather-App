
import React, { useState } from 'react';

const api = {
  key: "959e19b5006f1b3a964eed0ad1cd3fec",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();


    return `${day} ${month} ${date} ${year}`
  }

  const timeBuilder = () => {
    let time = new Date((weather.sys.sunrise + weather.timezone) * 1000);

    return `${time}`
  }


  return (
    <div className={(typeof weather.main != "undefined") ? 
    ((weather.weather[0].main === 'Clear' && weather.main.temp > 40) ? 'app warm' : 
    (weather.weather[0].main === 'Clouds' && weather.main.temp > 40) ? 'app cloud' : 
    (weather.weather[0].main === 'Rain' && weather.main.temp > 40) ? 'app rain' : 
    (weather.weather[0].main === 'Snow' && weather.main.temp < 40) ? 'app snow' :
    (weather.main.temp < 40) ? 'app' : 'app warm') : 'app warm'}>
      <main>

        <div className='search-box'>
          <input type="text" className='search-bar' placeholder='Search...' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>

    {(typeof weather.main != "undefined") ? (
      <div>
        <div className='location-box'>
          <div className='location'>{weather.name}, {weather.sys.country}</div>
          <div className='date'>
            {dateBuilder(new Date())}
            <br />
            {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}
            {/*{timeBuilder()}*/}
          </div>
          <div>
           
          </div>
        </div>

        <div className='weather-box'>
          <div className='temp'>
            {Math.round(weather.main.temp)}°F
          </div>
          <div className='weather'>
            {weather.weather[0].main}
          </div>
        </div>
      </div>
    ) : ('')}
      </main>
    </div>
  );
}

export default App;
