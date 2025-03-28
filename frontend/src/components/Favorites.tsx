import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { selectAllCountries } from "../store/slices/countriesSlice";
import { useAppSelector } from "../store/hooks";
import { CountryFavorite } from "../types/favorite";
import { favoritesApi } from "../api/services/favorites";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CountryCard from "./CountryCard";

const Favorites = () => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [favorites, setFavorites] = useState<CountryFavorite[]>([]);
	const allCountries = useAppSelector(selectAllCountries);

	useEffect(() => {
		if (!user) {
			return;
		}
		const fetchFavorites = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await favoritesApi.getFavorites();
				setFavorites(data);
			} catch (error) {
				console.error("Error fetching favorites:", error);
				setError("Failed to set favorites. please try one more time.");
			} finally {
				setLoading(false);
			}
		};
		fetchFavorites();
	}, [user]);

	const convertCountry = (favorite: CountryFavorite) => {
		const fullCountry = allCountries.find(
			(country) => country.name.common === favorite.country_name
		);
		if (fullCountry) {
			return fullCountry;
		}
		return {
			name: {
				common: favorite.country_name,
				official: favorite.country_name,
			},
			cca3: favorite.country_code,
			flags: {
				png: favorite.country_flag,
				svg: favorite.country_flag,
			},
			region: "Favorite",
			subregion: "Favorite",
			population: 0,
			capital: ["Favorite"],
			currencies: {
				FAV: {
					name: "Favorite currency",
					symbol: "FV",
				},
			},
		};
	};
	if (!user) {
		return (
			<div>
				<h2>Favorite Countries</h2>
				<p>Please log in to see your favorite countries.</p>
			</div>
		);
	}
	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
				My Favorite Countries
			</Typography>

			{error && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{favorites.length === 0 ? (
				<Alert severity="info"> You have no favorite countries yet</Alert>
			) : (
				<Grid container spacing={2} sx={{ flexWrap: "wrap" }}>
					{favorites.map((favorite: CountryFavorite) => (
						<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={favorite.id}>
							<CountryCard country={convertCountry(favorite)} />
						</Grid>
					))}
				</Grid>
			)}
		</Box>
	);
};

export default Favorites;
