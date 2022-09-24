import { Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";

import Welcome from "./pages/profile/Welcome";

import UsersList from "./pages/users/UsersList";
import PostsList from "./pages/posts/PostsList";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />

				<Route path="profile">
					<Route index element={<Welcome />} />
				</Route>

				<Route path="users">
					<Route index element={<UsersList />} />
				</Route>

				<Route path="posts">
					<Route index element={<PostsList />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
