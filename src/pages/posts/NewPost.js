import React from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "../../features/users/usersApiSlice";

import { NewPostForm } from "../../components/forms/posts";

const NewPost = () => {
	const users = useSelector(selectAllUsers);

	if (!users?.length) return <p>Not Currently Available</p>;

	const content = <NewPostForm users={users} />;

	return content;
};

export default NewPost;
