import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleArrowLeft,
	faSave,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
	useDeletePostMutation,
	useUpdatePostMutation,
} from "../../../features/posts/postsApiSlice";

const EditPostForm = ({ post, users }) => {
	const [
		updatePost,
		{
			isLoading,
			isSuccess: isUpdateSuccess,
			isError: isUpdateError,
			error: updateError,
		},
	] = useUpdatePostMutation();

	const [
		deletePost,
		{
			isSuccess: isDeleteSuccess,
			isError: isDeleteError,
			error: deleteError,
		},
	] = useDeletePostMutation();

	const [title, setTitle] = useState(post.title);
	const [description, setDescription] = useState(
		post.description
	);
	const [completed, setCompleted] = useState(
		post.isCompleted
	);
	const [userId, setUserId] = useState(post.user);

	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	useEffect(() => {
		if (isUpdateSuccess || isDeleteSuccess) {
			setTitle("");
			setDescription("");
			setUserId("");

			navigate("/posts");
		}
	}, [isUpdateSuccess, isDeleteSuccess, navigate]);

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onDescriptionChanged = (e) =>
		setDescription(e.target.value);
	const onCompletedChanged = () =>
		setCompleted((prev) => !prev);
	const onUserIdChanged = (e) => setUserId(e.target.value);

	const canSave =
		[title, description, userId].every(Boolean) &&
		!isLoading;

	const onSavePostClicked = async (e) => {
		if (canSave) {
			await updatePost({
				id: post.id,
				user: userId,
				title,
				description,
				isCompleted: completed,
			});
		}
	};

	const onDeletePostClicked = async () => {
		await deletePost({ id: post.id });
	};

	const created = new Date(post.createdAt).toLocaleString(
		"en-US",
		{
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		}
	);
	const updated = new Date(post.updatedAt).toLocaleString(
		"en-US",
		{
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		}
	);

	const options = users.map((user) => {
		return (
			<option
				className="checked:bg-blue-700 checked:text-white"
				key={user.id}
				value={user.id}
			>
				{user.username}
			</option>
		);
	});

	const errClass =
		isUpdateError || isDeleteError
			? "bg-red-700 text-white py-2 px-4"
			: "";
	const validTitleClass = !title
		? "outline outline-2 outline-red-500"
		: "";
	const validDescriptionClass = !description
		? "outline outline-2 outline-red-500"
		: "";

	const errContent =
		(updateError?.data?.message ||
			deleteError?.data?.message) ??
		"";

	let deleteButton = null;
	// if (isManager || isAdmin) {
	deleteButton = (
		<button
			className="flex"
			title="Delete"
			onClick={onDeletePostClicked}
		>
			<FontAwesomeIcon
				className="w-6 h-6 hover:scale-125 duration-500 hover:text-red-500"
				icon={faTrashCan}
			/>
		</button>
	);
	// }

	return (
		<section className="max-w-2xl mx-auto space-y-8">
			<h2 className="text-2xl xl:text-4xl font-bold text-center">
				EditPostForm
			</h2>

			{isUpdateError ? (
				<div className="flex justify-center mb-4">
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
						<span className="font-bold text-green-400">
							{` ${post.ticket}`}
						</span>
					</h2>
					<div className="flex items-center gap-8">
						<button
							className="flex"
							title={`${!canSave ? "" : "Save"}`}
							onClick={onSavePostClicked}
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
						{deleteButton}
					</div>
				</div>

				<div className="flex flex-col space-y-4">
					<label htmlFor="post-title">Title:</label>
					<input
						className={`focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 placeholder:text-gray-500 ${validTitleClass}`}
						id="post-title"
						name="title"
						type="text"
						autoComplete="off"
						value={title}
						onChange={onTitleChanged}
					/>

					<label htmlFor="post-description">
						Description:
					</label>
					<textarea
						className={`focus:ring-blue-500 focus:ring rounded p-4 focus:outline-none bg-gray-900 placeholder:text-gray-500 ${validDescriptionClass} h-32 whitespace-pre-line`}
						id="post-description"
						name="text"
						value={description}
						onChange={onDescriptionChanged}
					/>
					<div className="grid grid-cols-2 gap-8">
						<div className="flex flex-col justify-between gap-4">
							<div>
								<label
									className="inline-flex items-center gap-4 select-none"
									htmlFor="note-completed"
								>
									Work Complete:
									<input
										className="w-6 h-6 focus:outline-offset-4 accent-blue-600 focus:outline focus:outline-blue-500"
										id="note-completed"
										name="completed"
										type="checkbox"
										checked={completed}
										onChange={onCompletedChanged}
									/>
								</label>
							</div>

							<label
								className="select-none"
								htmlFor="note-username"
							>
								Assigned To:
							</label>
							<select
								className="focus:ring-blue-500 focus:ring rounded p-2 focus:outline-none bg-gray-900"
								id="note-username"
								name="username"
								value={userId}
								onChange={onUserIdChanged}
							>
								{options}
							</select>
						</div>

						<div className="flex flex-col justify-between">
							<p>
								Created:
								<br />
								{created}
							</p>
							<p>
								Updated:
								<br />
								{updated}
							</p>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
};

export default EditPostForm;
