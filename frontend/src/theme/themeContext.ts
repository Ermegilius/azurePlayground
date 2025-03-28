import { createContext } from "react";

type ThemeContextType = {
	toggleColorMode: () => void;
	mode: "light" | "dark";
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
