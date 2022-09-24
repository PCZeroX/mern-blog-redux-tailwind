import { useEffect } from "react";
import {
	useNavigate,
	Link,
	useLocation,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRightFromBracket,
	faFileCirclePlus,
	faFilePen,
	faUserGear,
	faUserPlus,
	faHome,
} from "@fortawesome/free-solid-svg-icons";
import { BeatLoader as Loader } from "react-spinners";

import { useLogoutMutation } from "../features/auth/authApiSlice";

import useAuth from "../hooks/useAuth";

const POSTS_REGEX = /^\/posts(\/)?$/;
const USERS_REGEX = /^\/users(\/)?$/;

const Header = () => {
	const { username } = useAuth();

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [logout, { isLoading, isSuccess, isError, error }] =
		useLogoutMutation();

	useEffect(() => {
		if (isSuccess) navigate("/");
	}, [isSuccess, navigate]);

	const onGoHomeClicked = () => navigate("/profile");
	const onNewPostClicked = () => navigate("/posts/new");
	const onNewUserClicked = () => navigate("/users/new");
	const onPostsClicked = () => navigate("/posts");
	const onUsersClicked = () => navigate("/users");

	let goHomeButton = null;
	if (pathname !== "/profile") {
		goHomeButton = (
			<button
				className="flex items-center"
				title="Profile"
				onClick={onGoHomeClicked}
			>
				<FontAwesomeIcon
					className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
					icon={faHome}
				/>
			</button>
		);
	}

	let newPostButton = null;
	if (POSTS_REGEX.test(pathname)) {
		newPostButton = (
			<button
				className="flex items-center"
				title="New Post"
				onClick={onNewPostClicked}
			>
				<FontAwesomeIcon
					className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
					icon={faFileCirclePlus}
				/>
			</button>
		);
	}

	let newUserButton = null;
	if (USERS_REGEX.test(pathname)) {
		newUserButton = (
			<button
				className="flex items-center"
				title="New User"
				onClick={onNewUserClicked}
			>
				<FontAwesomeIcon
					className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
					icon={faUserPlus}
				/>
			</button>
		);
	}

	let usersButton = null;
	// if (isManager || isAdmin) {
	if (
		!USERS_REGEX.test(pathname) &&
		pathname.includes("/")
	) {
		usersButton = (
			<button
				className="flex items-center"
				title="Users"
				onClick={onUsersClicked}
			>
				<FontAwesomeIcon
					className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
					icon={faUserGear}
				/>
			</button>
		);
	}
	// }

	let postsButton = null;
	if (
		!POSTS_REGEX.test(pathname) &&
		pathname.includes("/")
	) {
		postsButton = (
			<button
				className="flex items-center"
				title="Posts"
				onClick={onPostsClicked}
			>
				<FontAwesomeIcon
					className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
					icon={faFilePen}
				/>
			</button>
		);
	}

	const logoutButton = (
		<button
			className="flex items-center"
			title="Logout"
			onClick={logout}
		>
			<FontAwesomeIcon
				className="w-6 h-6 duration-500 hover:scale-125 hover:text-red-500"
				icon={faRightFromBracket}
			/>
		</button>
	);

	let buttonContent;
	if (isLoading) {
		buttonContent = (
			<div className="flex justify-center items-center">
				<Loader color="#FFF" />
			</div>
		);
	} else {
		buttonContent = (
			<>
				{goHomeButton}
				{newPostButton}
				{postsButton}
				{newUserButton}
				{usersButton}
				{logoutButton}
			</>
		);
	}

	const content = (
		<header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b-gray-500/25 border-b sticky top-0 z-10 col-span-4">
			{!isError ? (
				<div className="text-center bg-red-700 text-white">
					<p>{error?.data?.message}</p>
				</div>
			) : null}

			<div className="max-w-7xl mx-auto">
				<nav
					className={`flex justify-between items-center h-14 mx-4 xl:mx-0`}
				>
					<Link to="/">
						<img
							src="/img/react.svg"
							alt="React"
							className="h-8"
						/>
					</Link>

					{username ? (
						<div className="flex gap-8">
							{buttonContent}
						</div>
					) : (
						<ul className="flex gap-4">
							<li>
								<Link
									className="hover:text-cyan-400 duration-300"
									to="/login"
								>
									Sign In
								</Link>
							</li>
						</ul>
					)}

					<Link to="/">
						<img
							src="/img/Redux.svg"
							alt="Redux"
							className="h-8"
						/>
					</Link>
				</nav>
			</div>
		</header>
	);

	return content;
};

export default Header;
