import { useParams } from "react-router-dom";
import { FadeLoader as Loader } from "react-spinners";

import { useGetUsersQuery } from "../../features/users/usersApiSlice";

import { EditUserForm } from "../../components/forms/users";

const EditUser = () => {
	const { id } = useParams();

	const { user } = useGetUsersQuery("usersList", {
		selectFromResult: ({ data }) => ({
			user: data?.entities[id],
		}),
	});

	if (!user)
		return (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
			</div>
		);

	const content = <EditUserForm user={user} />;

	return content;
};

export default EditUser;
