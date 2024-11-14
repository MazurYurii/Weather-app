import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState('');

  const key = '4de0fa75d99ad113de8d4d84ad22bc1c';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}`;

  const searchWeather = (e) => {
    if(e.key === 'Enter') {
      fetch(url)
        .then(res => res.json())
        .then(data => setData(data))
    }
  }
  
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=kyiv&units=metric&appid=${key}`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, []);

  return (
    <div className="App">
      <div className="inp-field">
        <input type="text" value={town} onChange={(e) => setTown(e.target.value)} onKeyDown={searchWeather}/>
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
          <div className="temp">{data.main ? (<h1>{data.main.temp.toFixed()} °C</h1>) : null}</div>
          <div className="desc">{data.weather && <p>{data.weather[0].main}</p>}</div>
        </div>
          {data.name !== undefined && (
            <div className="footer">
              <div className="feels">
                {data.main && (<p className='bold'>{data.main.feels_like.toFixed()}°C</p>)}
                <p>feels like</p>
              </div>
              <div className="humidity">
                {data.main && (<p className='bold'>{data.main.humidity}</p>)}
                <p>humidity</p>
              </div>
              <div className="wind">
                {data.wind && <p className='bold'>{data.wind.speed.toFixed()} m/s</p>}
                <p>wind</p>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default App
