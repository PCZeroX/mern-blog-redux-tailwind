import { useState, useEffect } from "react";

const usePersist = () => {
	const [persist, setPersist] = useState(
		// JSON.parse(localStorage.getItem("persist")) || false
		JSON.parse(localStorage.getItem("isPersist")) || true
	);

	useEffect(() => {
		localStorage.setItem(
			"isPersist",
			JSON.stringify(persist)
		);
	}, [persist]);

	return [persist, setPersist];
};

export default usePersist;
