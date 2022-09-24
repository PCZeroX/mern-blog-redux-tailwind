import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleArrowLeft,
	faSave,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import {
	useUpdateUserMutation,
	useDeleteUserMutation,
} from "../../../features/users/usersApiSlice";

import { ROLES } from "../../../config/roles";

const USERNAME_REGEX = /^[A-z]{3,20}$/;
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
	const [
		updateUser,
		{
			isLoading,
			isSuccess: isUpdateSuccess,
			isError: isUpdateError,
			error: updateError,
		},
	] = useUpdateUserMutation();

	const [
		deleteUser,
		{
			isSuccess: isDeleteSuccess,
			isError: isDeleteError,
			error: deleteError,
		},
	] = useDeleteUserMutation();

	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	const [username, setUsername] = useState(user.username);
	const [validUsername, setValidUsername] = useState(false);
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [roles, setRoles] = useState(user.roles);
	const [active, setActive] = useState(user.active);

	useEffect(() => {
		setValidUsername(USERNAME_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
	}, [password]);

	useEffect(() => {
		if (isUpdateSuccess || isDeleteSuccess) {
			setUsername("");
			setPassword("");
			setRoles([]);

			navigate("/users");
		}
	}, [isUpdateSuccess, isDeleteSuccess, navigate]);

	const onUsernameChanged = (e) =>
		setUsername(e.target.value);

	const onPasswordChanged = (e) =>
		setPassword(e.target.value);

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setRoles(values);
	};

	const onActiveChanged = () => setActive((prev) => !prev);

	const onSaveUserClicked = async () => {
		if (password) {
			await updateUser({
				id: user.id,
				username,
				password,
				roles,
				active,
			});
		} else {
			await updateUser({
				id: user.id,
				username,
				roles,
				active,
			});
		}
	};

	const onDeleteUserClicked = async () => {
		await deleteUser({ id: user.id });
	};

	const options = Object.values(ROLES).map((role) => {
		return (
			<option
				className="checked:bg-blue-800 checked:text-white p-2 hover:bg-blue-600"
				key={role}
				value={role}
			>
				{role}
			</option>
		);
	});

	let canSave;
	if (password)
		canSave =
			[roles.length, validUsername, validPassword].every(
				Boolean
			) && !isLoading;
	// else
	// 	canSave =
	// 		[roles.length, validUsername].every(Boolean) &&
	// 		!isLoading;

	const errClass =
		isUpdateError || isDeleteError
			? "bg-red-700 text-white py-2 px-4"
			: "";
	const validUsernameClass = !validUsername
		? "outline outline-2 outline-red-500"
		: "";
	const validPasswordClass =
		password && !validPassword
			? "outline outline-2 outline-red-500"
			: "";
	const validRolesClass = !Boolean(roles.length)
		? "outline outline-2 outline-red-500"
		: "";

	const errContent =
		(updateError?.data?.message ||
			deleteError?.data?.message) ??
		"";

	return (
		<section className="max-w-xl mx-auto space-y-8">
			<h2 className="text-2xl xl:text-4xl font-bold text-center">
				EditUserForm
			</h2>

			{isUpdateError ? (
				<div className="flex justify-center mb-6">
					<p className={errClass}>{errContent}</p>
				</div>
			) : null}

			<form
				className="bg-slate-800 p-8 space-y-8"
				onSubmit={(e) => e.preventDefault()}
			>
				<div className="flex items-center justify-between">
					<h2>
						ID:
						<span className="text-green-400">
							{` ${user.id}`}
						</span>
					</h2>
					<div className="flex items-center gap-8">
						<button
							className="flex"
							title={`${!canSave ? "" : "Save"}`}
							onClick={onSaveUserClicked}
							disabled={!canSave}
						>
							<FontAwesomeIcon
								icon={faSave}
								className={`w-6 h-6 cursor-pointer duration-500 ${
									!canSave
										? "text-gray-600 cursor-not-allowed"
										: "hover:scale-125 hover:text-green-500"
								}`}
							/>
						</button>
						<button
							className="flex"
							title="Go back"
							onClick={goBack}
						>
							<FontAwesomeIcon
								icon={faCircleArrowLeft}
								className="w-6 h-6 hover:scale-125 duration-500 hover:text-red-500"
							/>
						</button>
						<button
							className="flex"
							title="Delete"
							onClick={onDeleteUserClicked}
						>
							<FontAwesomeIcon
								icon={faTrashCan}
								className="w-6 h-6 hover:scale-125 duration-500 hover:text-red-500"
							/>
						</button>
					</div>
				</div>

				<div className="flex flex-col space-y-4">
					<label
						className="flex justify-between text-gray-300 gap-4"
						htmlFor="username"
					>
						Username
						<span className="text-green-400">
							[3-20 letters]
						</span>
					</label>
					<input
						className={`focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 placeholder:text-gray-500 ${validUsernameClass}`}
						id="username"
						name="username"
						type="text"
						autoComplete="off"
						value={username}
						onChange={onUsernameChanged}
					/>

					<label
						className="flex justify-between text-gray-300 gap-4"
						htmlFor="password"
					>
						Password
						<span className="text-green-400">
							[empty = no change] [4-12 chars incl. !@#$%]
						</span>
					</label>
					<input
						className={`focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 placeholder:text-gray-500 ${validPasswordClass}`}
						id="password"
						name="password"
						type="password"
						value={password}
						onChange={onPasswordChanged}
					/>

					<div>
						<label
							className="inline-flex items-center gap-4 select-none"
							htmlFor="user-active"
						>
							Active:
							<input
								className="w-6 h-6 focus:outline-offset-4 accent-blue-600 focus:outline focus:outline-blue-500"
								id="user-active"
								name="user-active"
								type="checkbox"
								checked={active}
								onChange={onActiveChanged}
							/>
						</label>
					</div>

					<label className="select-none" htmlFor="roles">
						Assigned Roles:
					</label>
					<select
						id="roles"
						name="roles"
						className={`focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 overflow-y-auto ${validRolesClass}`}
						multiple={true}
						// size={5}
						size={Object.values(ROLES).length}
						value={roles}
						onChange={onRolesChanged}
					>
						{options}
					</select>
				</div>
			</form>
		</section>
	);
};

export default EditUserForm;
