import { Navigate } from "react-router-dom";
import paths from "../../../router/paths";

export default function ManagerIndexPage() {
	return (
		<>
			<Navigate to={paths.manager.tests.ROOT} />
		</>
	)
}
