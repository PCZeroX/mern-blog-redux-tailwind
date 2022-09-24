import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleArrowLeft,
	faSave,
} from "@fortawesome/free-solid-svg-icons";

import { useAddNewPostMutation } from "../../../features/posts/postsApiSlice";

const NewPostForm = ({ users }) => {
	const [
		addNewPost,
		{ isLoading, isSuccess, isError, error },
	] = useAddNewPostMutation();

	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [userId, setUserId] = useState(users[0].id);

	useEffect(() => {
		if (isSuccess) {
			setTitle("");
			setDescription("");
			setUserId("");

			navigate("/posts");
		}
	}, [isSuccess, navigate]);

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onDescriptionChanged = (e) =>
		setDescription(e.target.value);
	const onUserIdChanged = (e) => setUserId(e.target.value);

	const canSave =
		[title, description, userId].every(Boolean) &&
		!isLoading;

	const onSavePostClicked = async (e) => {
		e.preventDefault();
		if (canSave) {
			await addNewPost({
				user: userId,
				title,
				description,
			});
		}
	};

	const options = users.map((user) => {
		return (
			<option key={user.id} value={user.id}>
				{user.username}
			</option>
		);
	});

	const errClass = isError
		? "bg-red-700 text-white py-2 px-4"
		: "";
	const validTitleClass = !title
		? "outline outline-2 outline-red-500"
		: "";
	const validDescriptionClass = !description
		? "outline outline-2 outline-red-500"
		: "";

	return (
		<section className="max-w-2xl mx-auto space-y-8">
			<h2 className="text-2xl xl:text-4xl font-bold text-center">
				NewPostForm
			</h2>

			{isError ? (
				<div className="flex justify-center">
					<p className={errClass}>{error?.data?.message}</p>
				</div>
			) : null}

			<form
				className="p-8 bg-slate-800 space-y-8"
				onSubmit={onSavePostClicked}
			>
				<div className="flex items-center justify-between">
					<h2 className="text-green-400">New Post</h2>
					<div className="flex items-center gap-8">
						<button
							className="flex"
							title={`${!canSave ? "" : "Save"}`}
							disabled={!canSave}
						>
							<FontAwesomeIcon
								icon={faSave}
								className={`w-6 h-6 cursor-pointer duration-500 ${
									!canSave
										? "text-gray-600 cursor-not-allowed"
										: "hover:scale-125  hover:text-green-500"
								}`}
							/>
						</button>
						<button
							className="flex items-center"
							title="Go back"
							onClick={goBack}
						>
							<FontAwesomeIcon
								icon={faCircleArrowLeft}
								className="w-6 h-6 hover:scale-125 duration-500 cursor-pointer hover:text-red-500"
							/>
						</button>
					</div>
				</div>

				<div className="flex flex-col space-y-4">
					<label
						className="text-gray-300"
						htmlFor="title-post"
					>
						Title:
					</label>
					<input
						className={`appearance-none focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 placeholder:text-gray-500 ${validTitleClass}`}
						id="title-post"
						name="title"
						type="text"
						autoComplete="off"
						value={title}
						onChange={onTitleChanged}
					/>

					<label
						className="text-gray-300"
						htmlFor="description-post"
					>
						Description:
					</label>
					<textarea
						className={`appearance-none focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 h-32 placeholder:text-gray-500 ${validDescriptionClass}`}
						id="description-post"
						name="text"
						value={description}
						onChange={onDescriptionChanged}
					/>

					<label
						className="text-gray-300"
						htmlFor="username"
					>
						Assigned To:
					</label>
					<select
						id="username"
						name="username"
						className="focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900"
						value={userId}
						onChange={onUserIdChanged}
					>
						{options}
					</select>
				</div>
			</form>
		</section>
	);
};

export default NewPostForm;
