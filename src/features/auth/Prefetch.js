import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { postsApiSlice } from "../posts/postsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";

const Prefetch = () => {
	useEffect(() => {
		store.dispatch(
			postsApiSlice.util.prefetch("getPosts", "postsList", {
				force: true,
			})
		);

		store.dispatch(
			usersApiSlice.util.prefetch("getUsers", "usersList", {
				force: true,
			})
		);
	}, []);

	return <Outlet />;
};

export default Prefetch;
