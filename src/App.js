import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchWeather } from "./api/fetchWeather";
import AlgoliaPlaces from "algolia-places-react";

const App = () => {
	const [city, setCity] = useState("");
	const [weather,setWeather] = useState(null);

	useEffect(() => {
		const searchWeatherData = async () => {
			const data = await fetchWeather(city);
			setWeather(data);
		};
		if (city !== "") searchWeatherData();
	}, [city]);
	return (
		<div className='main-container'>
			<AlgoliaPlaces
				placeholder='City name'
				className='search'
				options={{
					appId: process.env.REACT_APP_ID,
					apiKey: process.env.REACT_APP_PLACES_KEY,
					type: "city",
				}}
				onChange={({ suggestion }) => setCity(suggestion.name)}
				onClear={() => setCity("")}
				onError={({ message }) => console.log(message)}
			/>
			{weather?.main && (<div className='city'>
				<h2 className='city-name'>
					<span>{weather.name}</span>
					<sup>{weather.sys.country}</sup>
				</h2>
				<div className='city-temp'>
					{Math.round(weather.main.temp)}
					<sup>&deg;C</sup>
				</div>
				<div className='info'>
					<img className='city-icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
					<p>{weather.weather[0].description}</p>
				</div>
			</div>)}
		</div>
	);
};

export default App;
