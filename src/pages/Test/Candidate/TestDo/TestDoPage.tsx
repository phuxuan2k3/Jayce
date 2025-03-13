import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionComponent from './Question';
import Sidebar from './Sidebar';
import useGetTestIdParams from '../../../../features/Test/hooks/useGetTestIdParams';
import { useCurrentTestContext } from '../../../../features/Test/context/current-test-context';
import { useGetTestsByTestIdCurrentDoQuery } from '../../../../features/Test/api/test.api-gen';
import paths2 from '../../../../router/path-2';
import { AttemptAnswer } from '../../../../features/Test/types/current';
import FetchState from '../../../../components/wrapper/FetchState';

const TestDoPage = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<AttemptAnswer[]>([]);
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const { isEnded, answers: syncAnswers } = useCurrentTestContext();

	const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
	const { data, isLoading, error } = useGetTestsByTestIdCurrentDoQuery({ testId });

	useEffect(() => {
		if (isEnded && data) {
			navigate(paths2.candidate.tests.attempts.in(data.id).ROOT);
		}
	}, [isEnded]);

	useEffect(() => {
		if (syncAnswers) {
			setAnswers(syncAnswers);
		}
	}, [syncAnswers]);

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
								{data && <QuestionComponent
									currentQuestion={data.questions[currentQuestionIndex]}
									totalQuestion={data.questions.length}
									currentQuestionIndex={currentQuestionIndex}
									setCurrentQuestionIndex={setCurrentQuestionIndex}
									answers={answers}
									setAnswers={setAnswers}
									flaggedQuestions={flaggedQuestions}
									setFlaggedQuestions={setFlaggedQuestions}
								/>}
							</>
						)}
					</FetchState>

					<Sidebar
						answers={answers}
						flaggedQuestions={flaggedQuestions}
						currentQuestionIndex={currentQuestionIndex}
						setCurrentQuestionIndex={setCurrentQuestionIndex}
					/>
				</div>
			</div>
		</div>
	);
}

export default TestDoPage