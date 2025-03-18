import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionComponent from './Question';
import Sidebar from './Sidebar';
import useGetTestIdParams from '../../../../features/Test/hooks/useGetTestIdParams';
import { useGetTestsByTestIdCurrentDoQuery, useGetTestsByTestIdCurrentQuery } from '../../../../features/Test/api/test.api-gen';
import paths2 from '../../../../router/path-2';
import FetchState from '../../../../components/wrapper/FetchState';
import { useAppSelector } from '../../../../app/redux/hooks';
import { curerntAttemptSelects } from '../../../../features/Test/reducers/currentAttemtpSlice';

const TestDoPage = () => {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const { data: testToDo, isLoading, error } = useGetTestsByTestIdCurrentDoQuery({ testId });
	const { currentQuestionIndex } = useAppSelector(curerntAttemptSelects.selectCurrentAttempt);
	const currentAttemptQuery = useGetTestsByTestIdCurrentQuery({ testId });

	// TODO: Add notification upon test ends.
	useEffect(() => {
		if (currentAttemptQuery.isSuccess == false) return;
		if (currentAttemptQuery.data.hasCurrentAttempt === false) {
			// TODO: Add modal to notify user that the test has ended.
			navigate(paths2.candidate.tests.in(testId).ATTEMPTS);
		}
	}, [currentAttemptQuery]);

	// TODO: Use loading page
	if (!testToDo || currentAttemptQuery.isSuccess == false) return <>Loading...</>;
	if (currentAttemptQuery.data.currentAttempt == null) return <>No current attempt</>;

	const currentQuestion = testToDo.questions[currentQuestionIndex];
	const { currentAttempt } = currentAttemptQuery.data;

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<FetchState
					isLoading={isLoading}
					error={error}
				>
					<h1 className="text-2xl font-bold mb-6">
						{testToDo?.test.title}
					</h1>
				</FetchState>
				<div className="flex flex-row w-full justify-between">
					<FetchState
						isLoading={isLoading}
						error={error}
					>
						{testToDo?.questions.length === 0 ? (
							<div>No questions found</div>
						) : (
							<>
								{testToDo &&
									<QuestionComponent
										currentAttempt={currentAttempt}
										question={currentQuestion}
										totalQuestion={testToDo.questions.length}
									/>
								}
							</>
						)}
					</FetchState>

					<Sidebar
						questionIds={testToDo.questions.map((question) => question.id) ?? []}
						currentAttempt={currentAttempt}
					/>
				</div>
			</div>
		</div>
	);
}

export default TestDoPage