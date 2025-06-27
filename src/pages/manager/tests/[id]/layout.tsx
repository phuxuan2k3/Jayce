import { Outlet } from "react-router-dom";
import { DeleteTestModalProvider } from "./components/delete-test-modal.context";

export default function ManagerTestLayout() {
	return (
		<DeleteTestModalProvider>
			<Outlet />
		</DeleteTestModalProvider>
	);
}
