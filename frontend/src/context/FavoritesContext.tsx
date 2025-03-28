import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { favoritesApi } from "../api/services/favorites";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
	favoriteStatus: Record<string, boolean>;
	isLoading: boolean;
	toggleFavorite: (countryName: string, countryCode: string, countryFlag: string) => Promise<void>;
	refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used within a FavoritesProvider");
	}
	return context;
};

interface FavoritesProviderProps {
	children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
	const [favoriteStatus, setFavoriteStatus] = useState<Record<string, boolean>>({});
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useAuth();

	const loadFavorites = async () => {
		if (!user) {
			setFavoriteStatus({});
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		try {
			const favorites = await favoritesApi.getFavorites(true);
			const status: Record<string, boolean> = {};

			favorites.forEach((fav) => {
				status[fav.country_name] = true;
			});

			setFavoriteStatus(status);
		} catch (error) {
			console.error("Error loading favorites:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Load favorites when user changes
	useEffect(() => {
		loadFavorites();
	}, [user]);

	const toggleFavorite = async (countryName: string, countryCode: string, countryFlag: string) => {
		if (!user) return;

		const isFav = favoriteStatus[countryName] || false;

		try {
			if (isFav) {
				await favoritesApi.removeFavorite(countryName);
				setFavoriteStatus((prev) => ({
					...prev,
					[countryName]: false,
				}));
			} else {
				await favoritesApi.addFavorite({
					name: { common: countryName, official: countryName },
					cca3: countryCode,
					flags: {
						png: countryFlag,
						svg: countryFlag,
					},
					region: "",
					subregion: "",
					population: 0,
				});
				setFavoriteStatus((prev) => ({
					...prev,
					[countryName]: true,
				}));
			}
		} catch (error) {
			console.error("Error toggling favorite:", error);
		}
	};

	const value = {
		favoriteStatus,
		isLoading,
		toggleFavorite,
		refreshFavorites: loadFavorites,
	};

	return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
