import { useMemo } from 'react'
import { useGetExamsByTestIdQuery } from '../../../../../../../infra-test/api/test.api-gen';

export default function useIsTestAllowToShowAnswer({
	testId,
	mode,
}: {
	testId?: string;
	mode?: "exam" | "practice";
}) {
	const examQuery = useGetExamsByTestIdQuery({
		testId: testId || "",
	}, {
		skip: testId == null || mode !== "exam",
	});

	const isTestAllowToShowAnswers = useMemo(() => {
		if (mode === "practice") {
			return true;
		}
		if (examQuery.isSuccess && examQuery.data != null) {
			return examQuery.data.isAnswerVisible;
		}
		return false;
	}, [mode, examQuery.isSuccess, examQuery.data]);

	return {
		allowToShowAnswer: isTestAllowToShowAnswers,
	};
}
