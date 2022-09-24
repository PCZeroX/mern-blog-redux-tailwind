import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPostById } from "../../features/posts/postsApiSlice";

const Post = ({ postId }) => {
	const navigate = useNavigate();

	const post = useSelector((state) =>
		selectPostById(state, postId)
	);

	if (post) {
		const created = new Date(post.createdAt).toLocaleString(
			"en-US",
			{ day: "numeric", month: "long" }
		);

		const updated = new Date(post.updatedAt).toLocaleString(
			"en-US",
			{ day: "numeric", month: "long" }
		);

		const handleEdit = () => navigate(`/posts/${postId}`);

		return (
			<tr className="text-center">
				<td className="p-4 border border-slate-700">
					{post.isCompleted ? (
						<span className="text-green-500">
							Completed
						</span>
					) : (
						<span className="text-red-500">Open</span>
					)}
				</td>
				<td className="p-4 border border-slate-700 xl:table-cell hidden">
					{created}
				</td>
				<td className="p-4 border border-slate-700 xl:table-cell hidden">
					{updated}
				</td>
				<td className="p-4 border border-slate-700">
					{post.title}
				</td>
				<td className="p-4 border border-slate-700">
					{post.username}
				</td>

				<td className="p-4 border border-slate-700 ">
					<button
						className="flex mx-auto"
						onClick={handleEdit}
					>
						<FontAwesomeIcon
							className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
							icon={faPenToSquare}
						/>
					</button>
				</td>
			</tr>
		);
	}
};

export default Post;
