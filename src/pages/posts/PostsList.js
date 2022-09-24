import { RingLoader } from "react-spinners";
import { useGetPostsQuery } from "../../features/posts/postsApiSlice";

import Post from "./Post";

const PostsList = () => {
	const {
		data: posts,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetPostsQuery();

	let content;

	if (isLoading) {
		content = (
			<div className="flex justify-center items-center">
				<RingLoader color={"#FFF"} />
			</div>
		);
	}

	if (isError) {
		content = (
			<div className="text-white text-center">
				<p className="inline-block bg-red-600 px-4 py-2 rounded">
					{error?.data?.message}
				</p>
			</div>
		);
	}

	if (isSuccess) {
		const { ids } = posts;

		const tableContent = ids?.length
			? ids.map((postId) => (
					<Post key={postId} postId={postId} />
			  ))
			: null;

		content = (
			<table className="w-full border-2 border-slate-700">
				<thead className="bg-black">
					<tr className="font-bold text-center">
						<th
							scope="col"
							className="p-4 border-2 border-slate-700"
						>
							Status
						</th>
						<th
							scope="col"
							className="p-4 border-2 border-slate-700"
						>
							Created
						</th>
						<th
							scope="col"
							className="p-4 border-2 border-slate-700"
						>
							Updated
						</th>
						<th
							scope="col"
							className="p-4 border-2 border-slate-700"
						>
							Title
						</th>
						<th
							scope="col"
							className="p-4 border-2 border-slate-700"
						>
							Owner
						</th>
						<th
							scope="col"
							className="p-4 border-2 border-slate-700"
						>
							Edit
						</th>
					</tr>
				</thead>
				<tbody className="bg-slate-800/50">
					{tableContent}
				</tbody>
			</table>
		);
	}

	return content;
};

export default PostsList;
