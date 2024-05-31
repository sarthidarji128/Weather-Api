import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState([]);
  const [location, setLocation] = useState("Mumbai");
  const [city, setCity] = useState("Mumbai");


  function apicall() {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=3f8a6cf3b20c4a915a4712fb5eaefe72`;

    fetch(api, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    apicall();
  }, [city]); 

  function convertFahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(location);
  };

  return (
    <div className='frame' style={{backgroundImage: 'URL("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg")' }}>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Enter city name" 
        />
        <button type="submit">Get Weather</button>
      </form>
      {user.main && (
        <div className='content'>
        <br />
          <h2>Temperature: {convertFahrenheitToCelsius(user.main.temp).toFixed(2)} °C</h2>
          <h2>Location: {user.name}</h2>
          <h2>Weather: {user.weather[0].main}</h2>
          <h2>Humidity: {user.main.humidity}</h2>
          <h2>Wind Speed: {user.wind.speed} km/h</h2>
          <h4 className='lat'>Co-ordinates(lon , lat):{user.coord.lon} , {user.coord.lat} </h4>
        </div>
      )}
    </div>
  );
}

export default App;
