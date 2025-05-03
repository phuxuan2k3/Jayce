import AttemptsList from "./components/AttemptsList";
import useGetAttemptIdParams from "../../../../../../features/tests/hooks/useGetAttemptIdParams";
import CandidateTestsTemplate from "../../../../../../features/tests/ui/CandidateTestsTemplate";
import { useGetUserAttemptsByAttemptIdQuery } from "../../../../../../features/tests/api/test.api-gen";
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
		<CandidateTestsTemplate
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
		</CandidateTestsTemplate>
	);
}

export default CandidateAttemptPage;