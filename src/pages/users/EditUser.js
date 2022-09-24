import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FadeLoader as Loader } from "react-spinners";

import { selectUserById } from "../../features/users/usersApiSlice";
import { EditUserForm } from "../../components/forms/users";

const EditUser = () => {
	const { id } = useParams();

	const user = useSelector((state) =>
		selectUserById(state, id)
	);

	const content = user ? (
		<EditUserForm user={user} />
	) : (
		<div className="flex justify-center items-center">
			<Loader color="#33F0F9" />
		</div>
	);

	return content;
};

export default EditUser;
