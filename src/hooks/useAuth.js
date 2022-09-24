import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
	const token = useSelector(selectCurrentToken);

	if (token) {
		const decoded = jwtDecode(token);
		const { username, roles } = decoded.UserInfo;

		// console.log("decoded:", decoded);

		return { username, roles };
	}

	return { username: "", roles: [] };
};

export default useAuth;
