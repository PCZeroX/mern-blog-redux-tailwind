import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

import { useGetUsersQuery } from "../../features/users/usersApiSlice";

const User = ({ userId }) => {
	const navigate = useNavigate();

	const { user } = useGetUsersQuery("usersList", {
		selectFromResult: ({ data }) => ({
			user: data?.entities[userId],
		}),
	});

	if (user) {
		const handleEdit = () => navigate(`/users/${userId}`);

		const userRolesString = user.roles
			.toString()
			.replaceAll(",", ", ");

		const cellStatus = user.active ? "" : "bg-red-900/50";

		return (
			<tr className="text-center">
				<td
					className={`p-4 border border-slate-700 ${cellStatus}`}
				>
					{user.username}
				</td>
				<td
					className={`p-4 border border-slate-700 ${cellStatus}`}
				>
					{userRolesString}
				</td>
				<td
					className={`p-4 border border-slate-700 ${cellStatus}`}
				>
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
	} else {
		return null;
	}
};

const memoizedUser = memo(User);

export default memoizedUser;
