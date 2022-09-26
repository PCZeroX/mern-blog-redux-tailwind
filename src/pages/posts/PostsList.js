import { RingLoader as Loader } from "react-spinners";
import { useGetPostsQuery } from "../../features/posts/postsApiSlice";

import useAuth from "../../hooks/useAuth";

import Post from "./Post";

const PostsList = () => {
	const { username, isManager, isAdmin } = useAuth();

	const {
		data: posts,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetPostsQuery("postsList", {
		pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	let content;

	if (isLoading) {
		content = (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
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
		const { ids, entities } = posts;

		let filteredIds;
		if (isManager || isAdmin) {
			filteredIds = [...ids];
		} else {
			filteredIds = ids.filter(
				(postId) => entities[postId].username === username
			);
		}

		const tableContent =
			ids?.length &&
			filteredIds.map((postId) => (
				<Post key={postId} postId={postId} />
			));

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
							className="p-4 border-2 border-slate-700 xl:table-cell hidden"
						>
							Created
						</th>
						<th
							scope="col"
							className="p-4 border-2 border-slate-700 xl:table-cell hidden"
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
