import { RingLoader as Loader } from "react-spinners";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";

import User from "./User";

const UsersList = () => {
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery("usersList", {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	let content;

	if (isLoading)
		content = (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
			</div>
		);

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
		const { ids } = users;

		// const tableContent = ids?.length ? ids.map((userId) => <User key={ userId } userId={ userId } />) : null;

		const tableContent =
			ids?.length &&
			ids.map((userId) => (
				<User key={userId} userId={userId} />
			));

		content = (
			<table className="w-full mx-auto border-2 border-slate-700">
				<thead className="bg-black">
					<tr className="font-bold text-center">
						<th
							scope="col"
							className="p-4 border-2 border-slate-700"
						>
							Username
						</th>
						<th
							scope="col"
							className="p-4 border-2 border-slate-700"
						>
							Roles
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

export default UsersList;
