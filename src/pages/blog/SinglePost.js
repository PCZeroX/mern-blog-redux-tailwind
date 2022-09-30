import { GridLoader as Loader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../features/posts/postsApiSlice";
import useTitle from "../../hooks/useTitle";

const SinglePost = () => {
	const { id } = useParams();

	const { post } = useGetPostsQuery("postsList", {
		selectFromResult: ({ data }) => ({
			post: data?.entities[id],
		}),
	});

	useTitle(`Post ID ${post.ticket}`);

	let content;

	if (post) {
		const updatedDate = new Date(
			post.updatedAt
		).toLocaleString("en-US", {
			day: "numeric",
			month: "long",
		});

		content = (
			<article>
				<h1 className="text-4xl font-bold text-center">
					{post.title}
				</h1>

				<div className="flex justify-between">
					<span>id: {post.ticket}</span>
					<span>{post.username}</span>
					<span>Updated - {updatedDate}</span>
				</div>

				<p>{post.description}</p>
			</article>
		);
	} else {
		content = (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
			</div>
		);
	}

	return content;
};

export default SinglePost;
