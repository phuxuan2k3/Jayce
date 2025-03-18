import { Outlet } from "react-router-dom";
import FixedContent from "../../../components/ui/common/FixedContent";
import CurrentAttemptStatus from "../partials/CurrentAttemptStatus";

export default function CurrentTestLayout() {
	return (
		<>
			<Outlet />
			<FixedContent position="bottom-right">
				<CurrentAttemptStatus />
			</FixedContent>
		</>
	)
}