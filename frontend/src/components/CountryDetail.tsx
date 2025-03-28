import { useParams, useNavigate } from "react-router-dom";
import {
	fetchAllCountries,
	selectAllCountries,
	selectCountriesError,
	selectCountriesLoading,
} from "../store/slices/countriesSlice";
import { Country } from "../types/country";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { Button, Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import WeatherInfo from "./WeatherInfo";

const CountryDetail = () => {
	const { name } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const countries = useAppSelector(selectAllCountries);
	const loading = useAppSelector(selectCountriesLoading);
	const error = useAppSelector(selectCountriesError);

	const selectedCountry = countries.find(
		(c: Country) => c.name.common.toLowerCase() === decodeURIComponent(name || "").toLocaleLowerCase()
	);

	useEffect(() => {
		if (countries.length === 0) {
			dispatch(fetchAllCountries());
		}
	}, [countries.length, dispatch]);

	return (
		<>
			{loading && (
				<Typography variant="h6" align="center">
					Loading...
				</Typography>
			)}
			{error && (
				<Typography variant="h6" color="error" align="center">
					{error}
				</Typography>
			)}
			{selectedCountry && (
				<>
					<Card
						sx={{
							maxWidth: 600,
							mx: "auto",
							mt: 4,
							px: 2,
							py: 3,
							boxShadow: 3,
						}}
					>
						<CardMedia
							component="img"
							image={selectedCountry.flags.png}
							alt={selectedCountry.flags.alt || selectedCountry.name.common}
							sx={{ objectFit: "contain", height: 250 }}
						/>
						<CardContent>
							<Typography variant="h4" gutterBottom>
								{selectedCountry.name.common}
							</Typography>
							<Typography variant="body1" sx={{ mb: 1 }}>
								<strong>Official Name:</strong> {selectedCountry.name.official}
							</Typography>
							<Typography variant="body1" sx={{ mb: 1 }}>
								<strong>Region:</strong> {selectedCountry.region}
							</Typography>
							<Typography variant="body1" sx={{ mb: 1 }}>
								<strong>Subregion:</strong> {selectedCountry.subregion}
							</Typography>
							<Typography variant="body1" sx={{ mb: 1 }}>
								<strong>Population:</strong> {selectedCountry.population.toLocaleString()}
							</Typography>
							<Typography variant="body1" sx={{ mb: 1 }}>
								<strong>Capital:</strong>{" "}
								{selectedCountry.capital ? selectedCountry.capital.join(", ") : "N/A"}
							</Typography>
							<Typography variant="body1">
								<strong>Currencies: </strong>
								{selectedCountry.currencies
									? Object.values(selectedCountry.currencies)
											.map((currency) => `${currency.name} (${currency.symbol})`)
											.join(", ")
									: "N/A"}
							</Typography>
							<WeatherInfo country={selectedCountry} />
						</CardContent>
						<Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
							<Button variant="contained" onClick={() => navigate(-1)}>
								Back
							</Button>
						</Box>
					</Card>
				</>
			)}
		</>
	);
};

export default CountryDetail;
