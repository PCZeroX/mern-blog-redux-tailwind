```TS
npm install react-router-dom @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @reduxjs/toolkit react-redux react-spinners jwt-decode
```

```TS
npm install -D autoprefixer postcss tailwindcss
```

```TS
npx tailwind init -p
```

```TS
npx tailwindcss -i ./public/css/tailwind.css -o ./public/css/styles.css --watch
```
`Header.js`

```TS
// import { useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faRightFromBracket,
// 	faFileCirclePlus,
// 	faFilePen,
// 	faUserGear,
// 	faUserPlus,
// 	faHome,
// } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

// const POSTS_REGEX = /^\/notes(\/)?$/;
// const USERS_REGEX = /^\/users(\/)?$/;

const Header = () => {
	// const { username, isManager, isAdmin } = useAuth();
	// const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

	// const navigate = useNavigate();
	// const { pathname } = useLocation();

	// useEffect(() => {
	// 	if (isSuccess) navigate("/");
	// }, [isSuccess, navigate]);

	// const onGoHomeClicked = () => navigate("/profile");
	// const onNewPostClicked = () => navigate("/posts/new");
	// const onNewUserClicked = () => navigate("/users/new");
	// const onPostsClicked = () => navigate("/posts");
	// const onUsersClicked = () => navigate("/users");

	// let goHomeButton = null;
	// if (pathname !== "/profile") {
	// 	goHomeButton = (
	// 		<button
	// 			className="flex items-center"
	// 			title="Profile"
	// 			onClick={onGoHomeClicked}
	// 		>
	// 			<FontAwesomeIcon
	// 				className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
	// 				icon={faHome}
	// 			/>
	// 		</button>
	// 	);
	// }

	// let newPostButton = null;
	// if (POSTS_REGEX.test(pathname)) {
	// 	newPostButton = (
	// 		<button
	// 			className="flex items-center"
	// 			title="New Note"
	// 			onClick={onNewPostClicked}
	// 		>
	// 			<FontAwesomeIcon
	// 				className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
	// 				icon={faFileCirclePlus}
	// 			/>
	// 		</button>
	// 	);
	// }

	// let newUserButton = null;
	// if (USERS_REGEX.test(pathname)) {
	// 	newUserButton = (
	// 		<button
	// 			className="flex items-center"
	// 			title="New User"
	// 			onClick={onNewUserClicked}
	// 		>
	// 			<FontAwesomeIcon
	// 				className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
	// 				icon={faUserPlus}
	// 			/>
	// 		</button>
	// 	);
	// }

	// let usersButton = null;
	// if (isManager || isAdmin) {
	// 	if (!USERS_REGEX.test(pathname) && pathname.includes("/")) {
	// 		usersButton = (
	// 			<button
	// 				className="flex items-center"
	// 				title="Users"
	// 				onClick={onUsersClicked}
	// 			>
	// 				<FontAwesomeIcon
	// 					className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
	// 					icon={faUserGear}
	// 				/>
	// 			</button>
	// 		);
	// 	}
	// }

	// let postsButton = null;
	// if (!POSTS_REGEX.test(pathname) && pathname.includes("/")) {
	// 	postsButton = (
	// 		<button
	// 			className="flex items-center"
	// 			title="Notes"
	// 			onClick={onPostsClicked}
	// 		>
	// 			<FontAwesomeIcon
	// 				className="w-6 h-6 duration-500 hover:scale-125 hover:text-cyan-500"
	// 				icon={faFilePen}
	// 			/>
	// 		</button>
	// 	);
	// }

	// const logoutButton = (
	// 	<button className="flex items-center" title="Logout" onClick={sendLogout}>
	// 		<FontAwesomeIcon
	// 			className="w-6 h-6 duration-500 hover:scale-125 hover:text-red-500"
	// 			icon={faRightFromBracket}
	// 		/>
	// 	</button>
	// );

	// let buttonContent;
	// if (isLoading) {
	// 	buttonContent = <Spinner />;
	// } else {
	// 	buttonContent = (
	// 		<>
	// 			{goHomeButton}
	// 			{newPostButton}
	// 			{postsButton}
	// 			{newUserButton}
	// 			{usersButton}
	// 			{logoutButton}
	// 		</>
	// 	);
	// }

	return (
		<header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b-gray-500/25 border-b sticky top-0 z-10 col-span-4">
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

					{/* {username ? (
						<ul className="flex gap-8">{buttonContent}</ul>
					) : (
						<ul className="flex gap-4">
							<li>
								<Link className="hover:text-cyan-400 duration-300" to="/login">
									Sign In
								</Link>
							</li>
						</ul>
					)} */}

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
};

export default Header;

```
