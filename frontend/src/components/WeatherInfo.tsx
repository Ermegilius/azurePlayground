import { useEffect, useState } from "react";
import { Country } from "../types/country";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
	fetchWeatherByCapital,
	selectCountriesError,
	selectCountriesLoading,
} from "../store/slices/countriesSlice";
import { Box, Typography } from "@mui/material";
import { WeatherData } from "../types/weather";

interface WeatherInfoProps {
	country: Country;
}

const WeatherInfo = ({ country }: WeatherInfoProps) => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectCountriesLoading);
	const error = useAppSelector(selectCountriesError);
	const [weather, setWeather] = useState<WeatherData | null>(null);

	useEffect(() => {
		const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
		if (!apiKey) {
			console.error("Missing API key. Please add your API key to the .env file.");
			return;
		}

		if (country && country.capital && country.capital.length > 0) {
			// Pass the first capital as a string and choose the units (e.g., "metric")
			dispatch(fetchWeatherByCapital({ capital: country.capital[0], units: "metric" }))
				.unwrap()
				.then((data: WeatherData) => {
					setWeather(data);
				})
				.catch((err) => {
					console.error("Error fetching weather:", err);
				});
		}
	}, [country, dispatch]);

	if (loading) return <p>Loading weather...</p>;
	if (error) return <p>{error}</p>;

	return (
		<Box sx={{ mt: 2 }}>
			<Typography variant="h6" gutterBottom>
				Current weather in{" "}
				{country.capital && country.capital.length > 0
					? country.capital[0]
					: country.name.common}
				:
			</Typography>
			{weather ? (
				<Box display="flex" alignItems="center">
					<img
						src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt={weather.weather[0].description}
					/>
					<Box ml={2}>
						<Typography variant="body1">
							Temperature: {weather.main.temp.toFixed(1)} °C
						</Typography>
						<Typography variant="body1">Humidity: {weather.main.humidity}%</Typography>
						<Typography variant="body1">
							Wind Speed: {weather.wind.speed} m/s
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{weather.weather[0].description}
						</Typography>
					</Box>
				</Box>
			) : (
				<Typography variant="body2">No weather data available.</Typography>
			)}
		</Box>
	);
};

export default WeatherInfo;
