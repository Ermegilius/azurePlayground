import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ReactNode, useMemo, useState } from "react";
import { createAppTheme } from "./theme";
import { ThemeContext } from "./themeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<"light" | "dark">("light");

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
			mode,
		}),
		[mode]
	);

	// Use the createAppTheme function to get a theme based on the current mode
	const theme = useMemo(() => createAppTheme(mode), [mode]);

	return (
		<ThemeContext.Provider value={colorMode}>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</ThemeContext.Provider>
	);
};
