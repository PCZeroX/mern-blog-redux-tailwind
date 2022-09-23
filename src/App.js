import { Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="profile" element={<Profile />} />
			</Route>
		</Routes>
	);
}

export default App;
