import React, {useState} from "react";
import axios from "axios";
import animation from "./asset/clouds2.json"
import Lottie from "lottie-react"

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e2a8e0dcb62fb0d4f6ade73cd9ee5520`

  const searchLocation = (event) => {
    if (event.key === 'Enter'){

      axios.get(url).then ((Response) => {
        setData(Response.data)
        console.log(Response.data);
      })
      setLocation('')
    }
    }

   

  return (

    <div className="App">
      <Lottie animationData={animation} className="lottie-animation" />
      <div className="search">
        
        <input 
        onChange={ event => setLocation(event.target.value) }
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        value={location}
        type="text"/>
      </div>
      <div className="container" >
     
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
           
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
         
          </div>
        </div>

        {data.name != undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
            
            <p>Feels like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
        } 
      </div>
      </div>
  
  );
}

export default App;
