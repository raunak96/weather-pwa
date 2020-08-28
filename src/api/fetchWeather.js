import axios from 'axios';

const URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) =>{
    try {
        const {data} = await axios.get(URL,{
            params:{
                appid: process.env.REACT_APP_WEATHER_API_KEY,
                q: city,
                units: 'metric'
            }
        });
        return data;
    } catch (error) {
        console.log(error.response.data);
    }
}