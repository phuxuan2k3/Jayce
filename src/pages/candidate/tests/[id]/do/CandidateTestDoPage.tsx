import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionComponent from './Question';
import Sidebar from './Sidebar';
import useGetTestIdParams from '../../../../../features/tests/hooks/useGetTestIdParams';
import paths from '../../../../../router/paths';
import FetchState from '../../../../../components/wrapper/FetchState';
import useGetUserId, { useAppSelector } from '../../../../../app/hooks';
import { curerntAttemptSelects } from '../../../../../features/tests/stores/currentAttemtpSlice';
import { useGetCurrentAttemptDoQuery, useGetCurrentAttemptStateQuery } from '../../../../../features/tests/api/test.api-gen';

const CandidateTestDoPage = () => {
	const userId = useGetUserId();
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const doQuery = useGetCurrentAttemptDoQuery({
		"x-user-id": userId,
	});
	const { currentQuestionIndex } = useAppSelector(curerntAttemptSelects.selectCurrentAttempt);
	const stateQuery = useGetCurrentAttemptStateQuery({
		"x-user-id": userId,
	}, {
		refetchOnMountOrArgChange: true,
	});

	// TODO: Add notification upon test ends.
	useEffect(() => {
		// Make sure it has fresh data from server, not cached data
		if (stateQuery.isFetching == true) return;
		if (stateQuery.isError) throw new Error("Failed to get current Attempt");
		if (stateQuery.data == null) return;
		if (stateQuery.data.hasCurrentAttempt === false) {
			// TODO: Add modal to notify user that the test has ended.
			navigate(paths.candidate.tests.in(testId).ATTEMPTS);
		}
	}, [stateQuery]);

	// TODO: Use loading page
	if (doQuery.isLoading || stateQuery.isLoading) return <>Loading...</>;
	if (doQuery.error || stateQuery.error) return <>Error</>;
	if (doQuery.data == null || stateQuery.data == null) return <>No data</>;
	if (stateQuery.data.currentAttempt == null) return <>No current attempt</>;

	const currentQuestion = doQuery.data.questions[currentQuestionIndex];
	const { currentAttempt } = stateQuery.data;

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<FetchState
					isLoading={doQuery.isLoading}
					error={doQuery.error}
				>
					<h1 className="text-2xl font-bold mb-6">
						{doQuery.data.test.title}
					</h1>
				</FetchState>
				<div className="flex flex-row w-full justify-between">
					<FetchState
						isLoading={doQuery.isLoading}
						error={doQuery.error}
					>
						{doQuery.data.questions.length === 0 ? (
							<div>No questions found</div>
						) : (
							<>
								{doQuery.data &&
									<QuestionComponent
										currentAttempt={currentAttempt}
										question={currentQuestion}
										totalQuestion={doQuery.data.questions.length}
									/>
								}
							</>
						)}
					</FetchState>

					<Sidebar
						questionIds={doQuery.data.questions.map((q) => q.id) ?? []}
						currentAttempt={currentAttempt}
					/>
				</div>
			</div>
		</div>
	);
}

export default CandidateTestDoPage