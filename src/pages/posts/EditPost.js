import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GridLoader as Loader } from "react-spinners";

import { selectPostById } from "../../features/posts/postsApiSlice";
import { selectAllUsers } from "../../features/users/usersApiSlice";

import { EditPostForm } from "../../components/forms/posts";

const EditPost = () => {
	const { id } = useParams();

	const post = useSelector((state) =>
		selectPostById(state, id)
	);
	const users = useSelector(selectAllUsers);

	const content =
		post && users ? (
			<EditPostForm post={post} users={users} />
		) : (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
			</div>
		);

	return content;
};

export default EditPost;
