import { Outlet } from "react-router-dom";
import { CurrentTestProvider } from "../context/current-test-context";

export default function CurrentTestLayout() {
	return (
		<CurrentTestProvider>
			<Outlet />
		</CurrentTestProvider>
	);
}