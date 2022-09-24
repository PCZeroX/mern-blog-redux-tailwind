import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleArrowLeft,
	faSave,
} from "@fortawesome/free-solid-svg-icons";

import { useAddNewUserMutation } from "../../../features/users/usersApiSlice";

import { ROLES } from "../../../config/roles";

const USERNAME_REGEX = /^[A-z]{3,20}$/;
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
	const [
		addNewUser,
		{ isLoading, isSuccess, isError, error },
	] = useAddNewUserMutation();

	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);

	const [roles, setRoles] = useState(["User"]);

	useEffect(() => {
		setValidUsername(USERNAME_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
	}, [password]);

	useEffect(() => {
		if (isSuccess) {
			setUsername("");
			setPassword("");
			setRoles([]);

			navigate("/users");
		}
	}, [isSuccess, navigate]);

	const onUsernameChanged = (e) =>
		setUsername(e.target.value);
	const onPasswordChanged = (e) =>
		setPassword(e.target.value);

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions, //HTMLCollection
			(option) => option.value
		);
		setRoles(values);
	};

	const canSave =
		[roles.length, validUsername, validPassword].every(
			Boolean
		) && !isLoading;

	const onSaveUserClicked = async (e) => {
		e.preventDefault();
		if (canSave) {
			await addNewUser({ username, password, roles });
		}
	};

	const options = Object.values(ROLES).map((role) => {
		return (
			<option
				className="checked:bg-blue-700 checked:text-white p-2 hover:bg-blue-500"
				key={role}
				value={role}
			>
				{role}
			</option>
		);
	});

	const errClass = isError
		? "bg-red-700 text-white py-2 px-4"
		: "";
	const validUsernameClass = !validUsername
		? "outline outline-2 outline-red-500"
		: "";
	const validPasswordClass = !validPassword
		? "outline outline-2 outline-red-500"
		: "";
	const validRolesClass = !Boolean(roles.length)
		? "outline outline-2 outline-red-500"
		: "";

	return (
		<section className="max-w-xl mx-auto space-y-8">
			<h2 className="text-2xl xl:text-4xl font-bold text-center">
				NewUserForm
			</h2>

			{isError ? (
				<div className="flex justify-center">
					<p className={errClass}>{error?.data?.message}</p>
				</div>
			) : null}

			<form
				className="p-8 bg-slate-800 space-y-8"
				onSubmit={onSaveUserClicked}
			>
				<div className="flex items-center justify-between">
					<h2 className="text-green-400">New User</h2>
					<div className="flex items-center gap-8">
						<button
							className="flex"
							title={`${!canSave ? "" : "Save"}`}
							disabled={!canSave}
						>
							<FontAwesomeIcon
								icon={faSave}
								className={`w-6 h-6 duration-500 ${
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
						className={`appearance-none focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 placeholder:text-gray-500 ${validUsernameClass}`}
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
							[4-12 chars incl. !@#$%]
						</span>
					</label>
					<input
						className={`appearance-none focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 placeholder:text-gray-500 ${validPasswordClass}`}
						id="password"
						name="password"
						type="password"
						value={password}
						onChange={onPasswordChanged}
					/>

					<label className="select-none" htmlFor="roles">
						Assigned Roles:
					</label>
					<select
						id="roles"
						name="roles"
						className={`focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 overflow-y-auto ${validRolesClass}`}
						multiple={true}
						// size={4}
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

export default NewUserForm;
