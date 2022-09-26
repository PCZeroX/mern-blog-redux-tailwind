import { useParams } from "react-router-dom";
import { GridLoader as Loader } from "react-spinners";

import { useGetPostsQuery } from "../../features/posts/postsApiSlice";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";

import { EditPostForm } from "../../components/forms/posts";

import useAuth from "../../hooks/useAuth";

const EditPost = () => {
	const { id } = useParams();

	const { username, isManager, isAdmin } = useAuth();

	const { post } = useGetPostsQuery("postsList", {
		selectFromResult: ({ data }) => ({
			post: data?.entities[id],
		}),
	});

	const { users } = useGetUsersQuery("usersList", {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map((id) => data?.entities[id]),
		}),
	});

	if (!post || !users?.length)
		return (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
			</div>
		);

	if (!isManager && !isAdmin) {
		if (post.username !== username) {
			return (
				<div className="text-center">
					<p className="bg-red-700 text-red-100 inline-block p-4 rounded">
						No Access
					</p>
				</div>
			);
		}
	}

	const content = (
		<EditPostForm post={post} users={users} />
	);

	return content;
};

export default EditPost;
