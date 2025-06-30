import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useGetTestIdParams from '../../../../../features/tests/hooks/useGetTestIdParams';
import { useGetTestsByTestIdQuery } from '../../../../../features/tests/api/test.api-gen-v2';
import FetchStateCover2 from '../../../../../features/tests/ui/fetch-states/FetchStateCover2';
import paths from '../../../../../router/paths';

export default function CandidateTestPage() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const testQuery = useGetTestsByTestIdQuery({ testId });

	useEffect(() => {
		if (testQuery.isSuccess && testQuery.data != null) {
			const mode = testQuery.data.mode;
			if (mode === "PRACTICE") {
				navigate(paths.candidate.tests.in(testId).PRACTICE);
			} else if (mode === "EXAM") {
				navigate(paths.candidate.tests.in(testId).EXAM);
			}
		}
	}, [testQuery.data, testQuery.isSuccess]);

	return (
		<FetchStateCover2
			fetchState={testQuery}
			dataComponent={(test) => (
				<div>
					<h2 className="text-xl font-bold">{test.title}</h2>
					<p className="mt-2">{test.description}</p>
				</div>
			)}
		/>
	);
}
