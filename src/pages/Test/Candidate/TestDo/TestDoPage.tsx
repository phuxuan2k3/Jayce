import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionComponent from './Question';
import Sidebar from './Sidebar';
import useGetTestIdParams from '../../../../features/Test/hooks/useGetTestIdParams';
import { useGetTestsByTestIdCurrentDoQuery, useGetTestsByTestIdCurrentQuery } from '../../../../features/Test/api/test.api-gen';
import paths2 from '../../../../router/path-2';
import FetchState from '../../../../components/wrapper/FetchState';
import { useAppSelector } from '../../../../app/redux/hooks';
import { testClientSliceSelects } from '../../../../features/Test/slice/testClientSlice';

const TestDoPage = () => {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const { data, isLoading, error } = useGetTestsByTestIdCurrentDoQuery({ testId });
	const { hasOnGoingTest, currentQuestionIndex } = useAppSelector(testClientSliceSelects.selectClientState);
	const { data: currentAttempt } = useGetTestsByTestIdCurrentQuery({ testId });

	// TODO: Add notification upon test ends.
	useEffect(() => {
		if (hasOnGoingTest === false) {
			navigate(paths2.candidate.tests.in(testId).ATTEMPTS);
		}
	}, [hasOnGoingTest]);

	// TODO: Use loading page
	if (!data || !currentAttempt) return <>Loading...</>;
	const { } = currentAttempt;

	const currentQuestion = data.questions[currentQuestionIndex];

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<FetchState
					isLoading={isLoading}
					error={error}
				>
					<h1 className="text-2xl font-bold mb-6">
						{data?.test.title}
					</h1>
				</FetchState>
				<div className="flex flex-row w-full justify-between">
					<FetchState
						isLoading={isLoading}
						error={error}
					>
						{data?.questions.length === 0 ? (
							<div>No questions found</div>
						) : (
							<>
								{data &&
									<QuestionComponent
										currentAttempt={currentAttempt}
										question={currentQuestion}
										totalQuestion={data.questions.length}
									/>
								}
							</>
						)}
					</FetchState>

					<Sidebar
						questionIds={data.questions.map((question) => question.id) ?? []}
						currentAttempt={currentAttempt}
					/>
				</div>
			</div>
		</div>
	);
}

export default TestDoPage