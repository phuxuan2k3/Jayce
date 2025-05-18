import { format } from "date-fns";
import RightLayoutTemplate from "../../../../../../components/layouts/RightLayoutTemplate";
import useGetAttemptIdParams from "../../../../../../features/tests/hooks/useGetAttemptIdParams";
import { useGetSelfAttemptsByAttemptIdQuery } from "../../../../../../features/tests/api/test.api-gen";
import AttemptSidebar from "./components/AttemptSidebar";
import AnswerList from "./components/AnswerList";
import FetchStateContent from "./components/FetchStateContent";
import { useState } from "react";
import useIsTestAllowToShowAnswer from "./hooks/useTestAllowToShowAnswer";

export default function CandidateTestsAttemptPage() {
	const attemptId = useGetAttemptIdParams();
	const attemptQuery = useGetSelfAttemptsByAttemptIdQuery({ attemptId });
	const [showAnswers, setShowAnswers] = useState(false);
	const { allowToShowAnswer } = useIsTestAllowToShowAnswer({
		testId: attemptQuery.data?.testId,
		mode: (attemptQuery.data?.test.mode as "practice" | "exam"),
	});

	const attempt = attemptQuery.data;

	return (
		<RightLayoutTemplate
			header={{
				title: attempt ? `Attempt #${attempt.order}: ${attempt.test.title}` : "Loading Attempt...",
				description: attempt ? `Taken on ${format(new Date(attempt.createdAt), "MMMM d, yyyy")}` : "",
			}}
			right={
				<FetchStateContent
					{...attemptQuery}
					childrenFactory={(data) => {
						return <AttemptSidebar
							setShowAnswers={setShowAnswers}
							showAnswersAvailable={allowToShowAnswer}
							showAnswers={showAnswers}
							attempt={data}
							test={data.test}
						/>
					}}
				/>
			}
		>
			<div className="w-full p-4">
				<FetchStateContent
					{...attemptQuery}
					childrenFactory={(data) => (
						<AnswerList
							showAnswers={showAnswers}
							attempt={data}
						/>
					)}
				/>
			</div>
		</RightLayoutTemplate>
	);
}