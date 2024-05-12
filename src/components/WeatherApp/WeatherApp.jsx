import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import './WeatherApp.css'
import feels_like from '../Assets/feel_likes.png'
import humidity_icon from '../Assets/humidity.png'
import pressure_icon from '../Assets/pressure.png'
import wind_icon from '../Assets/wind.png';

function WeatherApp() {
    const [icon, setIcon] = useState("")
    
    useEffect(() => {
        searchData("Delhi");
    }, []);
     // Empty dependency array ensures this effect runs only once on mount
    const searchData = async (city) => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=657da4be134f896db8a8a521737ddb9b`;
            let data = await fetch(url);
            let res = await data.json();
            displayData(res);
        } catch (error) {
            toast.error("City not Found")
        }
    }

    const displayData = (res) => {
        const cityName = document.getElementById("cityName");
                const temp = document.getElementById("temp");
                const main = document.getElementById("main");
                const humidity = document.getElementById("humidity");
                const pressure = document.getElementById("pressure");
                const wind = document.getElementById("wind");
                const feels_like = document.getElementById("feels_like");
                const dayNight = document.getElementById("d-n");
                const icon_id = res.weather[0].icon;
                setIcon(icon_id);
                if(icon_id.slice(-1) === "d")
                {
                    dayNight.innerText = " Day";
                }
                else{
                    dayNight.innerText = " Night";
                }
    
                main.innerText = `${res.weather[0].main}`
                cityName.innerText = `${res.name}, ${res.sys.country}`;
                if(res.main.temp < 30)
                {
                    temp.style.color = "blue"
                }
                else{
                    temp.style.color = "#DC6B19"
                }
                temp.innerText = `${res.main.temp}°c`;
                humidity.innerText = `${res.main.humidity}%`;
                pressure.innerText = `${res.main.pressure}hPa`;
                wind.innerText = `${res.wind.speed}m/s`
                feels_like.innerText = `${res.main.feels_like}°c`;
    }

    const searchCity = () => {
        const city = document.getElementById("city").value;
        if (city === "") {
            alert("Please enter a city name");
        } else {
            searchData(city);
        }
    }
  return (
    <>
    <div class=" container-fluid">
        <div class="search-bar">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search City" id='city'  autofocus />
                 <button class="btn btn btn-primary" type="button" id="search" onClick={searchCity}><i
                        class="fa-solid fa-magnifying-glass"></i></button>
            </div>

        </div>
        <div class="details-box d-flex flex-column align-items-center">
            <div class="city-name">
                <h2 class="text text-center" id='cityName'></h2>
                <div class=" text text-center" >
                    <div className=' d-flex align-items-center'>
                    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                    <p className='mb-0' id='temp'></p>
                    </div>
                     <p className='mb-0'><span id='main'></span><span id='d-n'></span></p>
                </div>
                {/* <div className='text text-center'>
                <p id="time">12:00:00</p>
                <p><span id='day'>Monday</span> <span id='date'>1</span> <span id='month'>April</span> <span id='year'>2023</span></p>
                </div> */}
            </div>

            <div class="container text-center">
                <div class="row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
                    <div class="col">
                        <div class="p-3">
                            <div class="card">
                                <div class="card-body">
                                    <img src={humidity_icon} alt="" width={'50px'}/>
                                   <h3>Humidity</h3> 
                                    <p className='mb-0' id='humidity'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-3">
                            <div class="card">
                                <div class="card-body">
                                <img src={pressure_icon} alt="" width={'50px'}/>
                                <h3>Pressure</h3>
                                <p className='mb-0' id='pressure'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div class="col">
                        <div class="p-3">
                            <div class="card">
                                <div class="card-body">
                                    <p id="time"></p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div class="col">
                        <div class="p-3">
                            <div class="card">
                                <div class="card-body">
                                <img src={wind_icon} alt="" width={'50px'}/>
                                    <h3>Wind</h3>
                                    <p className='mb-0' id='wind'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-3">
                            <div class="card">
                                <div class="card-body">
                                <img src={feels_like} alt="" width={'50px'}/>
                                    <h3>Feels like</h3>
                                    <p className='mb-0' id='feels_like'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </>
  )
}

export default WeatherApp