import { api } from "../axios";
import { WeatherData } from "../../types/weather";

export const weatherApi = {
	getWeatherByCapital: (city: string, units: "metric" | "imperial"): Promise<WeatherData> => {
		const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
		if (!API_KEY) {
			throw new Error("Missing API key. Please add your API key to the .env file.");
		}
		return api
			.get(`https://api.openweathermap.org/data/2.5/weather`, {
				params: {
					q: city,
					units,
					appid: API_KEY,
				},
			})
			.then((response) => {
				const data = response.data || response;
				const weatherData: WeatherData = {
					main: {
						temp: data.main.temp,
						feels_like: data.main.feels_like,
						humidity: data.main.humidity,
					},
					weather: data.weather,
					wind: data.wind,
				};
				return weatherData;
			});
	},
};
