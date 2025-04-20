import { Outlet } from "react-router-dom";
import { useShowCurrentTest } from "../../contexts/show-current-test.context";
import { useEffect } from "react";

export default function CandidateInTestLayout() {
	const { setShowCurrentTest } = useShowCurrentTest();
	useEffect(() => {
		setShowCurrentTest(false);
		return () => {
			setShowCurrentTest(true);
		}
	}, []);

	return (
		<Outlet />
	)
}
