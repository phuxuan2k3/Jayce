import { format } from "date-fns";
import AttemptSidebar from "./components/AttemptSidebar";
import AnswersList from "./components/AnswersList";
import FetchStateContent from "./components/FetchStateContent";
import { useState } from "react";
import useIsTestAllowToShowAnswer from "./hooks/useTestAllowToShowAnswer";
import useGetAttemptIdParams from "../../../../../../../infra-test/hooks/useGetAttemptIdParams";
import NewRightLayoutTemplate from "../../../../../../../components/layouts/NewRightLayoutTemplate";
import { AttemptCoreSchema, TestFullSchema, useGetAttemptsByAttemptIdQuery, useGetTestsByTestIdQuery } from "../../../../../../../infra-test/api/test.api-gen-v2";
import FetchStateCover2 from "../../../../../../../infra-test/ui/fetch-states/FetchStateCover2";
import useGetTestIdParams from "../../../../../../../infra-test/hooks/useGetTestIdParams";
import useGetUserId from "../../../../../../../infra-test/hooks/useGetUserId";

export default function CandidateTestsAttemptPage() {
	const attemptId = useGetAttemptIdParams();
	const testId = useGetTestIdParams();
	const userId = useGetUserId();

	const [showAnswers, setShowAnswers] = useState(false);

	const attemptQuery = useGetAttemptsByAttemptIdQuery({ attemptId });
	const testQuery = useGetTestsByTestIdQuery({ testId });

	const isAllowedToShowAnswer = (attempt: AttemptCoreSchema, test: TestFullSchema) => {
		return (
			(userId === test.authorId) ||
			(test._detail.mode === "PRACTICE" && attempt.candidateId === test.authorId) ||
			(test._detail.mode === "EXAM" && (
				test._detail.isAnswerVisible === true ||
				userId === test.authorId
			))
		);
	}

	return (
		<FetchStateCover2
			fetchState={attemptQuery}
			dataComponent={(attempt) => (
				<FetchStateCover2
					fetchState={testQuery}
					dataComponent={(test) => (
						<NewRightLayoutTemplate
							header={
								<NewRightLayoutTemplate.Header
									title={`Attempt ${attempt.order} - ${test.title}`}
									description={`Started at ${format(new Date(attempt.createdAt), "dd MMM yyyy, HH:mm")}`}
								/>
							}
							right={
								<AttemptSidebar
									showAnswersAvailable={isAllowedToShowAnswer(attempt, test)}
									setShowAnswers={setShowAnswers}
									showAnswers={showAnswers}
									attempt={attempt}
									test={test}
								/>
							}
						>
							<div className="w-full p-4">
								<FetchStateContent
									{...attemptQuery}
									childrenFactory={(data) => (
										<AnswersList
											showAnswers={showAnswers}
											attempt={data}
										/>
									)}
								/>
							</div>
						</NewRightLayoutTemplate>
					)}
				/>
			)}
		/>
	);
}