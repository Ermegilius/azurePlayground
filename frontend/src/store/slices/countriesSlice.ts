import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CountryState } from "../../types/country";
import { countriesApi } from "../../api/services/countries";
import { RootState } from "../store";
import { weatherApi } from "../../api/services/weather";

const initialState: CountryState = {
	countries: [],
	loading: false,
	error: null,
	selectedCountry: null,
};

export const fetchAllCountries = createAsyncThunk("countries/fetchAllCountries", async () => {
	const response = await countriesApi.getAllCountries();
	return response;
});

export const fetchWeatherByCapital = createAsyncThunk(
	"countries/fetchWeatherByCapital",
	async ({ capital, units }: { capital: string; units: "metric" | "imperial" }) => {
		const response = await weatherApi.getWeatherByCapital(capital, units);
		return response;
	}
);

export const countriesSlice = createSlice({
	name: "countries",
	initialState,
	reducers: {
		clearSelectedCountry: (state) => {
			state.selectedCountry = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllCountries.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchAllCountries.fulfilled, (state, action) => {
				state.loading = false;
				state.countries = action.payload;
			})
			.addCase(fetchAllCountries.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || "Failed to load countries";
			});
	},
});

export const selectAllCountries = (state: RootState) => state.countries.countries;
export const selectCountriesLoading = (state: RootState) => state.countries.loading;
export const selectCountriesError = (state: RootState) => state.countries.error;
export const { clearSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
