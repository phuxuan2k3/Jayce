import { Outlet } from "react-router-dom";
import FixedContent from "../../../components/ui/common/FixedContent";
import CurrentAttemptStatus from "./common/CurrentAttemptStatus";
import { useShowCurrentTest } from "../contexts/show-current-test.context";

export default function CandidateTestLayout() {
	const { showCurrentTest } = useShowCurrentTest();
	return (
		<>
			<Outlet />
			{showCurrentTest && (
				<FixedContent position="bottom-right">
					<CurrentAttemptStatus />
				</FixedContent>
			)}
		</>
	)
}