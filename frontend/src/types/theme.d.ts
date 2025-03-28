import "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		accent: {
			light: string;
			main: string;
			dark: string;
		};
	}

	interface PaletteOptions {
		accent?: {
			light?: string;
			main?: string;
			dark?: string;
		};
	}
	interface TypeBackground {
		main?: string;
		light?: string;
		dark?: string;
	}
}
