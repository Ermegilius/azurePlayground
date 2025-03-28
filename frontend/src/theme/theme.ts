import { createTheme, PaletteMode, Theme, ThemeOptions } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

// Declare module augmentation for custom palette properties
declare module "@mui/material/styles" {
	interface Palette {
		accent: {
			main: string;
		};
	}
	interface PaletteOptions {
		accent?: {
			main: string;
		};
	}
}

// Define theme colors as constants
const themeColors = {
	light: {
		primary: {
			main: "#3F72AF",
			light: "#F9F7F7",
			dark: "#bbdefb",
		},
		secondary: {
			main: "#3F72AF",
			light: "#bbdefb",
			dark: "#64b5f6",
		},
		accent: "#f50057",
		background: {
			default: "#F9F7F7",
			paper: "#DBE2EF",
		},
		text: {
			primary: "#112D4E",
			secondary: "#3F72AF",
		},
		hover: "#bbdefb",
	},
	dark: {
		primary: {
			main: "#112D4E",
			light: "#bbdefb",
			dark: "#64b5f6",
		},
		secondary: {
			main: "#2196f3",
			light: "#64b5f6",
			dark: "#112D4E",
		},
		accent: "#FF61CA",
		background: {
			default: "#112D4E",
			paper: "#3F72AF",
		},
		text: {
			primary: "#F9F7F7",
			secondary: "#DBE2EF",
		},
		hover: "#3F72AF",
	},
};

// Create a function that returns a theme based on the current mode
export const createAppTheme = (mode: PaletteMode) => {
	// Get colors based on current mode
	const colors = mode === "light" ? themeColors.light : themeColors.dark;

	// Light theme settings
	const lightTheme: ThemeOptions = {
		palette: {
			mode: "light",
			primary: themeColors.light.primary,
			secondary: themeColors.light.secondary,
			accent: {
				main: themeColors.light.accent,
			},
			background: themeColors.light.background,
			text: themeColors.light.text,
			action: {
				hover: themeColors.light.hover,
			},
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						backgroundColor: "#F9F7F7",
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23F9F7F7' stroke-width='0.4' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cuse fill='%23f6f5f5' href='%23s' y='2'/%3E%3Cuse fill='%23f6f5f5' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23f4f2f2' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23f4f2f2' href='%23s'/%3E%3Cuse fill='%23f1efef' href='%23s' x='2'/%3E%3Cuse fill='%23f1efef' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23efeded'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23efeded'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23eceaea'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23F9F7F7'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23eae8e8'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23F9F7F7'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23F9F7F7'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23F9F7F7'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
						backgroundAttachment: "fixed",
						backgroundSize: "cover",
						position: "relative",
					},
					"body::before": {
						content: '""',
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(249, 247, 247, 0.5)", // Light theme overlay - adjust opacity as needed
						zIndex: -1,
						pointerEvents: "none",
					},
				},
			},
		},
	};

	// Dark theme settings
	const darkTheme: ThemeOptions = {
		palette: {
			mode: "dark",
			primary: themeColors.dark.primary,
			secondary: themeColors.dark.secondary,
			accent: {
				main: themeColors.dark.accent,
			},
			background: themeColors.dark.background,
			text: themeColors.dark.text,
			action: {
				hover: themeColors.dark.hover,
			},
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						backgroundColor: "#112D4E",
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23112D4E' stroke-width='0.4' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cuse fill='%23283955' href='%23s' y='2'/%3E%3Cuse fill='%23283955' href='%23s' x='1' y='2'/%3E%3Cuse fill='%2336435c' href='%23s' x='2' y='2'/%3E%3Cuse fill='%2336435c' href='%23s'/%3E%3Cuse fill='%23414c62' href='%23s' x='2'/%3E%3Cuse fill='%23414c62' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%234a5468'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%234a5468'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23525b6d'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23112D4E'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%235a6273'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23112D4E'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23112D4E'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(18.4) translate(-945.65 -709.24)'%3E%3Cg fill='%23112D4E'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
						backgroundAttachment: "fixed",
						backgroundSize: "cover",
						position: "relative",
					},
					"body::before": {
						content: '""',
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(17, 45, 78, 0.8)", // Light theme overlay - adjust opacity as needed
						zIndex: -1,
						pointerEvents: "none",
					},
				},
			},
		},
	};

	// Common theme settings
	const commonTheme: ThemeOptions = {
		typography: {
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
			].join(","),
			h1: {
				fontSize: "2.5rem",
				fontWeight: 600,
			},
			h2: {
				fontSize: "2rem",
				fontWeight: 600,
			},
			h3: {
				fontSize: "1.75rem",
				fontWeight: 600,
			},
			body1: {
				fontSize: "1rem",
				lineHeight: 1.5,
			},
			button: {
				textTransform: "none" as const,
				margin: ".3rem",
				fontSize: "1rem",
				fontWeight: 450,
			},
		},
		components: {
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 12,
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					},
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						"& .MuiButton-root": {
							"&:hover": {
								backgroundColor: colors.hover,
								color: colors.text.primary,
								transform: "translateY(-1px)",
								boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							},
						},
					},
				},
			},
		},
	};

	// Merge themes based on mode
	const themeOptions = mode === "light" ? deepmerge(commonTheme, lightTheme) : deepmerge(commonTheme, darkTheme);

	return createTheme(themeOptions);
};

// Export a default theme for backward compatibility
export const theme = createAppTheme("light");
