import { useEffect, useState } from 'react';
import './App.scss';

const App = () => {

  const [location, setLocation] = useState('Alanya');
  const [weatherInfo, setWeatherInfo] = useState({})
  const [city, setCity] = useState('')

  const params = {
    key: '160c227a4a3543adba6185137210903',
    location,
    days: 3
  }

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${params.key}&q=${params.location}&days=${params.days}&aqi=no&alerts=no`)
      .then(response => response.json())
      .then(data => setWeatherInfo(data), console.log(weatherInfo))
  }, [location])

  return (
    <div className="weather-wrapper">
      <input
        onKeyDown={(event) => event.keyCode === 13 ? setLocation(city) : null}
        onChange={(event) => setCity(event.target.value)}
        onBlur={() => setLocation(city)}
      />
      <div className="weather-card">
        <div className="weather-card-today">
          {weatherInfo.current && (
            <>
              <h2>Today</h2>
              <img className="weather-icon" src={weatherInfo.forecast.forecastday[0].day.condition.icon}/>
              <h1>{weatherInfo.forecast.forecastday[0].day.avgtemp_c}</h1>
              <p>{weatherInfo.location.name} - <span>{weatherInfo.forecast.forecastday[0].day.condition.text}</span></p>
            </>
          )
          }
        </div>

        <div className="weather-card-tomorrow">
          {weatherInfo.current && (
            <>
              <h2>Tomorrow</h2>
              <img className="weather-icon" src={weatherInfo.forecast.forecastday[1].day.condition.icon}/>
              <h1>{weatherInfo.forecast.forecastday[1].day.avgtemp_c}</h1>
              <p>{weatherInfo.location.name} - <span>{weatherInfo.forecast.forecastday[1].day.condition.text}</span></p>
            </>
          )
          }
        </div>

        <div className="weather-card-nextDay">
          {weatherInfo.current && (
            <>
              <h2>Next Day</h2>
              <img className="weather-icon" src={weatherInfo.forecast.forecastday[2].day.condition.icon}/>
              <h1>{weatherInfo.forecast.forecastday[2].day.avgtemp_c}</h1>
              <p>{weatherInfo.location.name} - <span>{weatherInfo.forecast.forecastday[2].day.condition.text}</span></p>
            </>
          )
          }
        </div>

      </div>
    </div>
  );
}

export default App;
