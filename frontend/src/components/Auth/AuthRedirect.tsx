import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AuthRedirect = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/protected"); //if user, than navigate to protected route
		}
	}, [user, navigate]);

	return null;
};
