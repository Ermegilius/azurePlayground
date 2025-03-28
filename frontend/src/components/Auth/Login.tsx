import { Box, GlobalStyles, Paper, Typography } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useTheme } from "@mui/material/styles";
import { supabase } from "../../config/supabase";
import { useTheme as useAppTheme } from "../../theme/useTheme";

export const Login = () => {
	const theme = useTheme();
	const { mode } = useAppTheme();

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				p: 3,
			}}
		>
			{/* Global CSS override for Supabase Auth labels */}
			<GlobalStyles
				styles={{
					".custom-auth-container label": {
						color: theme.palette.text.primary,
					},
				}}
			/>
			<Paper
				elevation={3}
				sx={{
					p: 4,
					maxWidth: 400,
					width: "100%",
					backgroundColor: theme.palette.background.paper,
					boxShadow: 3,
					borderRadius: 2,
				}}
			>
				<Typography variant="h5" gutterBottom textAlign="center" sx={{ mb: 3 }}>
					Welcome
				</Typography>
				<Auth
					supabaseClient={supabase}
					appearance={{
						theme: ThemeSupa,
						variables: {
							default: {
								colors: {
									brand: theme.palette.primary.main,
									brandAccent: theme.palette.secondary.main,
									inputBackground: theme.palette.background.default,
									inputText: theme.palette.text.primary,
									inputBorderFocus: theme.palette.accent?.main || theme.palette.primary.main,
									messageText: theme.palette.text.primary,
									anchorTextColor: theme.palette.primary.main,
								},
							},
							dark: {
								colors: {
									brand: theme.palette.primary.main,
									brandAccent: theme.palette.secondary.main,
									inputBackground: theme.palette.background.default,
									inputText: theme.palette.text.primary,
									inputBorderFocus: theme.palette.accent?.main || theme.palette.primary.main,
									messageText: theme.palette.text.primary,
									anchorTextColor: theme.palette.primary.main,
								},
							},
						},
						className: {
							anchor: "custom-auth-link",
							button: "custom-auth-button",
							container: "custom-auth-container",
						},
					}}
					theme={mode}
					providers={["google"]}
					socialLayout="horizontal"
					view="sign_in"
					data-testid="login-form"
				/>
			</Paper>
		</Box>
	);
};
