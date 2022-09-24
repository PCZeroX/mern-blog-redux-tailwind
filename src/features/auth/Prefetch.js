import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { postsApiSlice } from "../posts/postsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";

const Prefetch = () => {
	useEffect(() => {
		const users = store.dispatch(
			usersApiSlice.endpoints.getUsers.initiate()
		);
		const posts = store.dispatch(
			postsApiSlice.endpoints.getPosts.initiate()
		);

		return () => {
			users.unsubscribe();
			posts.unsubscribe();
		};
	}, []);

	return <Outlet />;
};

export default Prefetch;
