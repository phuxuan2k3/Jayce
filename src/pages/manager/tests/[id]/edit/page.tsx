import useGetTestIdParams from "../../../../../infra-test/hooks/useGetTestIdParams";
import { useGetTestsByTestIdQuery, useGetTestsByTestIdQuestionsQuery } from "../../../../../infra-test/api/test.api-gen-v2";
import { TestConverter } from "../../../../../infra-test/ui-items/test/test-converter";
import FetchStateCover2 from "../../../../../infra-test/ui/fetch-states/FetchStateCover2";
import ManagerTestEditMain from "./main";

export type EditTabs = "info" | "questions";

export default function ManagerTestEditPage() {
	const testId = useGetTestIdParams();

	const testQuery = useGetTestsByTestIdQuery({ testId });
	const questionsQuery = useGetTestsByTestIdQuestionsQuery({ testId, viewCorrectAnswer: "1" });

	return (
		<FetchStateCover2
			fetchState={testQuery}
			dataComponent={(test) => (
				<FetchStateCover2
					fetchState={questionsQuery}
					dataComponent={(questions) => {
						const data = TestConverter.testFullWithQuestions_2_examPersistCore(test, questions);
						if (!data) throw new Error("Test is not in EXAM mode!");
						return (
							<ManagerTestEditMain data={data} />
						);
					}}
				/>
			)}
		/>
	);
}
