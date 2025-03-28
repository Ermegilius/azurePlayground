import { useEffect, useState, useRef, useMemo } from "react";
import {
	fetchAllCountries,
	selectAllCountries,
	selectCountriesError,
	selectCountriesLoading,
} from "../store/slices/countriesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import CountryCard from "./CountryCard";
import Grid from "@mui/material/Grid2";
import { Autocomplete, Box, CircularProgress, Fade, TextField, Typography } from "@mui/material";
import { Country } from "../types/country";

// Keep track of preloaded flags
const preloadedFlags: Set<string> = new Set();

const CountriesList = () => {
	const dispatch = useAppDispatch();
	const countries = useAppSelector(selectAllCountries);
	const loading = useAppSelector(selectCountriesLoading);
	const error = useAppSelector(selectCountriesError);
	const [inputValue, setInputValue] = useState("");

	// Reference to track if component is mounted
	const isMounted = useRef(true);

	// Sort the countries by name without mutating the state
	const sortedCountries = useMemo(
		() => [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common)),
		[countries]
	);

	// Filter the countries by input value without mutating the state
	const filteredCountries = useMemo(
		() => sortedCountries.filter((option) => option.name.common.toLowerCase().includes(inputValue.toLowerCase())),
		[sortedCountries, inputValue]
	);

	useEffect(() => {
		// Set up cleanup function
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (countries.length === 0) {
			dispatch(fetchAllCountries());
		}
	}, [countries.length, dispatch]);

	// Function to preload flag images for visible countries
	useEffect(() => {
		if (!filteredCountries.length || loading) return;

		// Use requestIdleCallback for non-critical preloading
		const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));

		// Preload only visible countries (no need for timeouts)
		const visibleCountries = filteredCountries.slice(0, 20);
		const preloadTasks: number[] = [];

		// Queue preloading for visible countries
		idleCallback(() => {
			if (!isMounted.current) return;

			visibleCountries.forEach((country) => {
				const flagUrl = country.flags.png;
				if (!preloadedFlags.has(flagUrl)) {
					const img = new Image();
					img.src = flagUrl;
					img.onload = () => preloadedFlags.add(flagUrl);
				}
			});
		});

		// Clear any queued tasks on cleanup
		return () => {
			preloadTasks.forEach((id) => {
				if (typeof window.cancelIdleCallback === "function") {
					window.cancelIdleCallback(id);
				} else {
					clearTimeout(id);
				}
			});
		};
	}, [filteredCountries, loading]);

	// Custom filter function for Autocomplete
	const filterOptions = (options: Country[], { inputValue }: { inputValue: string }) => {
		return options.filter((option) => option.name.common.toLowerCase().includes(inputValue.toLowerCase()));
	};

	if (loading) {
		return (
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
				<CircularProgress size={80} sx={{ mb: 2 }} />
				<Typography variant="h6" color="text.secondary">
					Loading countries...
				</Typography>
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ p: 4 }}>
				<Typography color="error">{error}</Typography>
			</Box>
		);
	}

	return (
		<Fade in={true} timeout={1000}>
			<Box sx={{ p: 4 }}>
				<Autocomplete
					disablePortal
					options={sortedCountries}
					getOptionLabel={(option) => option.name.common}
					sx={{ width: "100%", mb: 2 }}
					slotProps={{
						paper: {
							sx: {
								backgroundColor: "secondary.dark",
								boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
								borderRadius: 2,
							},
						},
						listbox: {
							sx: {
								padding: 1,
								// Style for each option
								"& .MuiAutocomplete-option": {
									borderRadius: 1,
									my: 0.5,
								},
								// Style for highlighted/focused option
								"& .MuiAutocomplete-option.Mui-focused": {
									backgroundColor: "rgba(63, 114, 175, 0.15)",
								},
								// Style for selected option
								"& .MuiAutocomplete-option[aria-selected='true']": {
									backgroundColor: "rgba(63, 114, 175, 0.3)",
								},
								// Style for selected AND focused option
								"& .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
									backgroundColor: "rgba(63, 114, 175, 0.4)",
								},
							},
						},
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Country"
							sx={{
								// For the input text when focused
								"& .MuiInputBase-root.Mui-focused input": {
									color: "text.secondary",
								},
								// For the label when focused
								"& .MuiInputLabel-root.Mui-focused": {
									color: "accent.main",
									fontWeight: "bold",
								},
								// For the outline when focused
								"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
									borderColor: "primary.dark",
								},

								// Background color when focused
								"& .MuiOutlinedInput-root.Mui-focused": {
									backgroundColor: "rgba(219, 226, 239,0.2)",
								},
							}}
						/>
					)}
					filterOptions={filterOptions}
					inputValue={inputValue}
					onInputChange={(_event, newInputValue) => {
						setInputValue(newInputValue);
					}}
				/>
				<Grid container spacing={2} sx={{ flexWrap: "wrap" }}>
					{filteredCountries.map((country) => (
						<Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={country.name.common}>
							<CountryCard country={country} />
						</Grid>
					))}
				</Grid>
			</Box>
		</Fade>
	);
};

export default CountriesList;
