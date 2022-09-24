import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RingLoader as Loader } from "react-spinners";

import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";

const Login = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading, isError }] =
		useLoginMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [username, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { accessToken } = await login({
				username,
				password,
			}).unwrap();

			dispatch(setCredentials({ accessToken }));

			setUsername("");
			setPassword("");

			navigate("/profile");
		} catch (err) {
			console.log("err:", err);
			if (!err.status) {
				setErrMsg("No Server Response");
			} else if (err.status === 400) {
				setErrMsg("Missing username or password");
			} else if (err.status === 401) {
				setErrMsg(err.data?.message);
			} else if (err.status === "FETCH_ERROR") {
				setErrMsg(err.error);
			} else {
				setErrMsg(err.data?.message);
			}
			errRef.current.focus();
		}
	};

	const handleUserInput = (e) =>
		setUsername(e.target.value);
	const handlePasswordInput = (e) =>
		setPassword(e.target.value);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
			</div>
		);
	}

	const errClass = errMsg
		? "bg-red-700 text-white py-2 px-4"
		: "";

	return (
		<section className="max-w-xl mx-auto space-y-8">
			<h1 className=" text-2xl xl:text-4xl font-bold text-center">
				Login
			</h1>
			{isError ? (
				<div className="flex justify-center mb-6">
					<p
						ref={errRef}
						className={errClass}
						aria-live="assertive"
					>
						{errMsg}
					</p>
				</div>
			) : null}

			<form
				className="p-8 bg-slate-900/75 space-y-8"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col space-y-4">
					<label
						className="text-sm xl:text-base"
						htmlFor="username"
					>
						Username
					</label>
					<input
						className="focus:ring-blue-500 focus:ring rounded xl:p-4 p-2 focus:outline-none bg-black/75 placeholder:text-gray-500"
						type="text"
						id="username"
						ref={userRef}
						value={username}
						onChange={handleUserInput}
						autoComplete="off"
						required
					/>

					<label
						className="text-sm xl:text-base"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="focus:ring-blue-500 focus:ring rounded xl:p-4 p-2 focus:outline-none bg-black/75 placeholder:text-gray-500"
						type="password"
						id="password"
						onChange={handlePasswordInput}
						value={password}
						required
					/>
				</div>

				<div>
					<label
						htmlFor="persist"
						className="text-xs xl:text-base inline-flex items-center gap-4 cursor-pointer select-none"
					>
						<input
							id="persist"
							type="checkbox"
							className="w-4 h-4 xl:w-6 xl:h-6 focus:outline-offset-4 accent-blue-600 focus:outline focus:outline-blue-500"
							// onChange={handleToggle}
							// checked={persist}
						/>
						Keep me logged in
					</label>
				</div>

				<div className="text-center">
					<button className="bg-blue-600 hover:bg-blue-800 rounded-full py-2 px-8 text-white duration-300">
						Sign In
					</button>
				</div>
			</form>
		</section>
	);
};

export default Login;
