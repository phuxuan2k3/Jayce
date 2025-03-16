import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionComponent from './Question';
import Sidebar from './Sidebar';
import useGetTestIdParams from '../../../../features/Test/hooks/useGetTestIdParams';
import { useGetTestsByTestIdCurrentDoQuery } from '../../../../features/Test/api/test.api-gen';
import paths2 from '../../../../router/path-2';
import FetchState from '../../../../components/wrapper/FetchState';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import { testSliceActions, testSliceSelects } from '../../../../features/Test/slice/testSlice';

const TestDoPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const testId = useGetTestIdParams();
	const { data, isLoading, error } = useGetTestsByTestIdCurrentDoQuery({ testId });
	if (!data) return null;

	const isOnGoing = useAppSelector(testSliceSelects.selectIsOngoing);
	const currentIndex = useAppSelector(testSliceSelects.selectCurrentIndex);
	const isFlagged = useAppSelector(testSliceSelects.selectIsIndexFlagged);
	const currentQuestion = data.questions[currentIndex];
	if (currentQuestion == null) throw new Error("Index is not valid");
	const currentChosenOption = useAppSelector(testSliceSelects.selectCurrentAnswer)(currentQuestion.id);

	// Sync answers from the server to the redux store
	// TODO: Use RTK Query combined with Socket.io instead of API call like this, it only sync all when we navigate to the page. We want it to be synced from the server command, not from client fetching
	useEffect(() => {
		if (data != null) {
			dispatch(testSliceActions.syncTest({ attemptAnswers: data.answers, totalQuestions: data.questions.length }));
		}
	}, [data]);

	// Todo: Add notification upon test ends.
	useEffect(() => {
		if (isOnGoing == false && data != null) {
			navigate(paths2.candidate.tests.attempts.in(data.id).ROOT);
		}
	}, [isOnGoing]);

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
										currentQuestion={{
											...currentQuestion,
											chosenOption: currentChosenOption,
											isFlagged
										}}
									/>
								}
							</>
						)}
					</FetchState>

					<Sidebar
						questionIds={data.questions.map((question) => question.id) ?? []}
					/>
				</div>
			</div>
		</div>
	);
}

export default TestDoPage