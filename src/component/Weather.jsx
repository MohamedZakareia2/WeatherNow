import React from "react";
import "./Weather.css";
import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import humidity_icon from "../Assets/humidity.png"
import rain_icon from "../Assets/rain.png"
import wind_icon from "../Assets/wind.png"
import snow_icon from "../Assets/snow.png"
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";


export default function Weather(){
    
    const inputref = useRef()

    const [weatherdata , setweatherdata] = useState(false);

    const allicons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": rain_icon,
        "13n": rain_icon,
    }

    const search = async(city) => {
        if(city ===""){
            alert("enter city name")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allicons[data.weather[0].icon] || clear_icon
            setweatherdata({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                location: data.name,
                temprature: Math.floor(data.main.temp),
                icon: icon
            })

        } catch (error) {
           setweatherdata(false);
           console.error("error in fetching weather data");
        }
    }

    useEffect(()=>{
        search("sweden");
    },[])



    return(
        <div className="weather">
            <div className="search-bar">
                <input ref={inputref} type= "text" placeholder="search"></input>
                <img src={search_icon} alt="" onClick={()=> search(inputref.current.value)} ></img>
            </div>
           
            <img src={weatherdata.icon} alt="" className="weather-icon" />
            <p className="tempreture">{weatherdata.temprature}°c</p>
            <p className="location">{weatherdata.location}</p>
            <div>
                <div className="weather-data">
                    <div className="col" >
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherdata.humidity}%</p>
                            <span>humidity</span>
                        </div>
                    </div>
                    <div className="col" >
                        <img src={wind_icon} alt="" />
                        <div>
                            <p>{weatherdata.wind}km/h</p>
                            <span>Wind speed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}