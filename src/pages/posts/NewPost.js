import { GridLoader as Loader } from "react-spinners";

import { useGetUsersQuery } from "../../features/users/usersApiSlice";

import { NewPostForm } from "../../components/forms/posts";

const NewPost = () => {
	const { users } = useGetUsersQuery("usersList", {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map((id) => data?.entities[id]),
		}),
	});

	if (!users?.length)
		return (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
			</div>
		);

	const content = <NewPostForm users={users} />;

	return content;
};

export default NewPost;
