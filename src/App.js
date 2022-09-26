import { Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";

import Welcome from "./pages/profile/Welcome";

import UsersList from "./pages/users/UsersList";
import NewUser from "./pages/users/NewUser";
import EditUser from "./pages/users/EditUser";

import PostsList from "./pages/posts/PostsList";
import NewPost from "./pages/posts/NewPost";
import EditPost from "./pages/posts/EditPost";

import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";

import { ROLES } from "./config/roles";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />

				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
						<Route element={<Prefetch />}>
							<Route path="profile">
								<Route index element={<Welcome />} />
							</Route>

							<Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
								<Route path="users">
									<Route index element={<UsersList />} />
									<Route path="new" element={<NewUser />} />
									<Route path=":id" element={<EditUser />} />
								</Route>
							</Route>

							<Route path="posts">
								<Route index element={<PostsList />} />
								<Route path="new" element={<NewPost />} />
								<Route path=":id" element={<EditPost />} />
							</Route>
						</Route>
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
