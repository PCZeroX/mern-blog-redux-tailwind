import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
	const token = useSelector(selectCurrentToken);

	let isManager = false;
	let isEditor = false;
	let isAdmin = false;
	let isUser = false;
	let status = null;

	if (token) {
		const decoded = jwtDecode(token);
		const { username, roles } = decoded.UserInfo;

		isManager = roles.includes("Manager");
		isEditor = roles.includes("Editor");
		isAdmin = roles.includes("Admin");
		isUser = roles.includes("User");

		if (isUser) status = "User";

		if (isEditor) status = "Editor";
		if (isManager) status = "Manager";
		if (isAdmin) status = "Admin";

		return {
			username,
			roles,
			status,
			isAdmin,
			isManager,
			isEditor,
			isUser,
		};
	}

	return {
		username: "",
		roles: [],
		status,
		isAdmin,
		isManager,
		isEditor,
		isUser,
	};
};

export default useAuth;
