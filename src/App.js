import { useState } from 'react';
import './styles.css';


const api = {
  key: "1f1223f7bc61015d32597df35dc80300",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const[weather, setWeather] = useState({});
  
  const search = ent => {
    if(ent.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&unitsmetric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('')
        console.log(result);
      });
    }
  }


  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }


  return (
    <>
    <h1>WEATHER APP</h1>
    <div className={
      (typeof weather.main != 'undefined') ? 
      ((weather.main.temp > 16) 
      ? 'app warm' : 'app')
    : 'app'} >
      <main>
        <div className='search-box'>
          <input type="text" 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          className="search-bar" placeholder='Search here...' />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
        <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div><div className="weather-box">
              <div className='temp'>
                {Math.round(weather.main.temp)}°c
              </div>
              <div className='weather'>
                {weather.weather[0].main}
              </div>
              </div>
            </div>
        ) : (<h2>NO RESULT</h2>)}
      </main>
    </div>
    </>
  );
}

export default App;
