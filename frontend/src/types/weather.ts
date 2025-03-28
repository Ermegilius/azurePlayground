export interface WeatherData {
	main: {
		temp: number;
		feels_like: number;
		humidity: number;
	};
	weather: {
		description: string;
		icon: string;
	}[];
	wind: {
		speed: number;
	};
}

export interface WeatherState {
	weather: WeatherData | null;
	loading: boolean;
	error: string | null;
}
