import { supabase } from "../../config/supabase";
import { Country } from "../../types/country";
import { CountryFavorite } from "../../types/favorite";

// Cache for favorite status to reduce redundant API calls
let favoritesCache: CountryFavorite[] | null = null;
let lastFetchTime = 0;
const CACHE_EXPIRY = 30000; // 30 seconds

// Flag to track if favorites are being loaded
let isFetchingFavorites = false;
// Promise for pending fetch operation
let fetchPromise: Promise<CountryFavorite[]> | null = null;

export const favoritesApi = {
	/**
	 * Get all favorites for the current user
	 * @param useCache Whether to use cached data if available
	 */
	async getFavorites(useCache = true): Promise<CountryFavorite[]> {
		const now = Date.now();

		// Return cached data if it's fresh and useCache is true
		if (useCache && favoritesCache && now - lastFetchTime < CACHE_EXPIRY) {
			return favoritesCache;
		}

		// If already fetching, return the existing promise to avoid duplicate requests
		if (isFetchingFavorites && fetchPromise) {
			return fetchPromise;
		}

		// Set fetching flag and create a new promise
		isFetchingFavorites = true;
		fetchPromise = (async () => {
			try {
				const { data, error } = await supabase.from("country_favorites").select("*");

				if (error) {
					console.error("Error fetching favorites:", error);
					throw new Error(error.message);
				}

				// Update cache
				favoritesCache = data || [];
				lastFetchTime = now;
				return favoritesCache;
			} finally {
				isFetchingFavorites = false;
				fetchPromise = null;
			}
		})();

		return fetchPromise;
	},

	/**
	 * Add a country to favorites
	 */
	async addFavorite(country: Country): Promise<void> {
		const { error } = await supabase.from("country_favorites").insert([
			{
				country_name: country.name.common,
				country_code: country.cca3,
				country_flag: country.flags.png || country.flags.svg,
			},
		]);

		if (error) {
			console.error("Error adding favorite:", error);
			throw new Error(error.message);
		}

		// Invalidate cache to force refresh on next get
		favoritesCache = null;
	},

	/**
	 * Remove a country from favorites
	 */
	async removeFavorite(countryName: string): Promise<void> {
		const { error } = await supabase.from("country_favorites").delete().eq("country_name", countryName);

		if (error) {
			console.error("Error removing favorite:", error);
			throw new Error(error.message);
		}

		// Invalidate cache to force refresh on next get
		favoritesCache = null;
	},

	/**
	 * Toggle favorite status for a country
	 */
	async toggleFavorite(country: Country): Promise<boolean> {
		const isFav = await this.isFavorite(country.name.common);

		if (isFav) {
			await this.removeFavorite(country.name.common);
			return false;
		} else {
			await this.addFavorite(country);
			return true;
		}
	},

	/**
	 * Check if a country is in favorites
	 */
	async isFavorite(countryName: string): Promise<boolean> {
		// Make sure we have the favorites loaded first
		if (!favoritesCache) {
			await this.getFavorites();
		}

		// Now we can safely use the cache
		return favoritesCache!.some((fav) => fav.country_name === countryName);
	},

	/**
	 * Check if multiple countries are favorites in one operation
	 * Use this when rendering lists of countries
	 */
	async batchCheckFavorites(countryNames: string[]): Promise<Record<string, boolean>> {
		// Make sure we have favorites loaded first
		if (!favoritesCache) {
			await this.getFavorites();
		}

		// Create a map of country names to their favorite status
		const result: Record<string, boolean> = {};
		countryNames.forEach((name) => {
			result[name] = favoritesCache!.some((fav) => fav.country_name === name);
		});

		return result;
	},

	/**
	 * Clear the favorites cache
	 */
	clearCache(): void {
		favoritesCache = null;
		lastFetchTime = 0;
	},
};
