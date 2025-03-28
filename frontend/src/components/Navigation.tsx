import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Favorite, Lock } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../theme/useTheme";

export const Navigation = () => {
	const { user, signOut } = useAuth();
	const { toggleColorMode, mode } = useTheme();

	return (
		<AppBar position="sticky" sx={{ mb: 3, bgcolor: "primary.main" }}>
			<Toolbar>
				<Button color="inherit" component={RouterLink} to="/">
					Home
				</Button>
				<Button color="inherit" component={RouterLink} to="/test">
					Test
				</Button>
				<Button color="inherit" component={RouterLink} to="/protected" startIcon={<Lock />}>
					Protected data
				</Button>
				<Button color="inherit" component={RouterLink} to="/countries">
					Countries
				</Button>
				{user && (
					<Button
						color="inherit"
						component={RouterLink}
						to="/favorites"
						startIcon={<Favorite sx={{ color: (theme) => theme.palette.accent.main }} />}
					>
						Favorites
					</Button>
				)}
				{user ? (
					<>
						<Button color="inherit" onClick={signOut}>
							Logout: {user.email}
						</Button>
					</>
				) : (
					<Button color="inherit" component={RouterLink} to="/login">
						Login
					</Button>
				)}
				<IconButton sx={{ ml: "auto" }} onClick={toggleColorMode} color="inherit">
					{mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};
