import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { Login } from "./components/Auth/Login";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Navigation } from "./components/Navigation";
import ProtectedTestData from "./components/ProtectedTestData";
import { AuthRedirect } from "./components/Auth/AuthRedirect";
import CountriesList from "./components/CountriesList";
import CountryDetail from "./components/CountryDetail";
import Favorites from "./components/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
	return (
		<AuthProvider>
			<FavoritesProvider>
				<BrowserRouter>
					<Box>
						<Navigation />
						<Box sx={{ p: 3 }}>
							<Routes>
								<Route
									path="/login"
									element={
										<>
											<AuthRedirect />
											<Login />
										</>
									}
								/>
								<Route path="/" element={<CountriesList />} />
								<Route path="/countries" element={<CountriesList />} />
								<Route path="/test" element={<TestData />} />
								<Route path="/countries/:name" element={<CountryDetail />} />
								<Route
									path="/protected"
									element={
										<ProtectedRoute>
											<ProtectedTestData />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/favorites"
									element={
										<ProtectedRoute>
											<Favorites />
										</ProtectedRoute>
									}
								/>
								{/* Other routes... */}
							</Routes>
						</Box>
					</Box>
				</BrowserRouter>
			</FavoritesProvider>
		</AuthProvider>
	);
}

export default App;
