import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RingLoader as Loader } from "react-spinners";

import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";

import usePersist from "../../hooks/usePersist";

const PersistLogin = () => {
	const token = useSelector(selectCurrentToken);
	const [persist] = usePersist();
	const effectRan = useRef(false);

	const [trueSuccess, setTrueSuccess] = useState(false);

	// console.log("persist:", persist);
	// console.log("Boolean(persist):", Boolean(persist));
	// console.log("token:", token);
	// console.log("Boolean(token):", Boolean(token));

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();

	useEffect(() => {
		if (effectRan.current === true || process.env.NODE_ENV !== "development") {
			const verifyRefreshToken = async () => {
				try {
					await refresh();

					setTrueSuccess(true);
				} catch (err) {
					console.log("err: 🐼", err);
				}
			};

			if (!token && persist) verifyRefreshToken();
		}

		return () => (effectRan.current = true);

		// eslint-disable-next-line
	}, []);

	let content;

	if (!persist) {
		// persist: no
		content = <Outlet />;
	} else if (isLoading) {
		//persist: yes, token: no
		content = (
			<div className="flex justify-center items-center">
				<Loader color="#33F0F9" />
			</div>
		);
	} else if (isError) {
		//persist: yes, token: no
		console.log("error");
		content = (
			<div className="text-center">
				<Link className="text-white bg-red-700 hover:bg-red-900 p-4 rounded duration-500" to="/login">
					{error?.data?.message} - Please login again
				</Link>
			</div>
		);
	} else if (isSuccess && trueSuccess) {
		//persist: yes, token: yes
		console.log("success");
		content = <Outlet />;
	} else if (token && isUninitialized) {
		//persist: yes, token: yes
		console.log("token and uninit");
		console.log("isUninitialized", isUninitialized);
		content = <Outlet />;
	}

	return content;
};

export default PersistLogin;
