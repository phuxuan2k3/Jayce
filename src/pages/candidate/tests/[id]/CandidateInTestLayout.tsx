import { Outlet } from "react-router-dom";
import { useShowCurrentTest } from "../../contexts/show-current-test.context";
import { useEffect } from "react";

export default function CandidateInTestLayout() {
	const { setShowCurrentTest } = useShowCurrentTest();

	// Current test will be hidden in the layout.
	useEffect(() => {
		setShowCurrentTest(false);
		return () => setShowCurrentTest(true);
	}, []);

	return (
		<Outlet />
	)
}