import AttemptsList from "./components/AttemptsList";
import useGetAttemptIdParams from "../../../../../../features/tests/hooks/useGetAttemptIdParams";
import RightLayoutTemplate from "../../../../../../components/layouts/RightLayoutTemplate";
import { useGetUserAttemptsByAttemptIdQuery } from "../../../../../../features/tests/legacy/test.api-gen";
import { useGetUsersQuery } from "../../../../../../features/auth/api/auth-profile.api";
import Sidebar from "./components/Sidebar";


const CandidateAttemptPage = () => {
	const attemptId = useGetAttemptIdParams();
	const { data: attemptSummary } = useGetUserAttemptsByAttemptIdQuery({ attemptId });
	const { data: manager } = useGetUsersQuery({
		user_ids: [Number(attemptSummary?.test.managerId)]
	}, {
		skip: !!attemptSummary?.test.managerId,
	});


	return (
		<RightLayoutTemplate
			header={{
				title: attemptSummary?.test.title || "",
				description: `By: ${manager?.users[0]?.username || "unknown"}`,
			}}
			right={
				<Sidebar
					attemptSummary={attemptSummary}
					manager={manager}
				/>
			}
		>
			<AttemptsList attemptId={attemptId} />
		</RightLayoutTemplate>
	);
}

export default CandidateAttemptPage;