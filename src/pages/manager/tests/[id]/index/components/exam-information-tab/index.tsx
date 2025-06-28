import { ExamDetails } from './components/ExamDetailsCard';
import { AttemptsOverviewCard } from './components/AttemptsOverviewCard';
import { QuestionsOverviewCard } from './components/QuestionsOverviewCard';
import { ParticipantsOverviewCard } from './components/ParticipantsOverviewCard';
import FetchStateCover2 from '../../../../../../../features/tests/ui/fetch-states/FetchStateCover2';
import { useGetTestsByTestIdQuery } from '../../../../../../../features/tests/api/test.api-gen-v2';

export default function ExamInformationTab({
	testId,
}: {
	testId: string;
}) {
	const examQuery = useGetTestsByTestIdQuery({ testId });

	return (
		<FetchStateCover2
			fetchState={examQuery}
			dataComponent={(exam) => (
				<div className="w-full flex flex-col gap-6">
					<header className="text-center">
						<h1 className="text-2xl font-bold text-primary-dark">{exam.title}</h1>
						<p className="text-sm text-gray-600 mt-2 max-w-3xl mx-auto">{exam.description}</p>
						<p className="text-xs text-gray-500 mt-1">Created on: {new Date(exam.createdAt).toLocaleDateString()}</p>
						<p className="text-xs text-gray-500 mt-1">Last updated: {new Date(exam.updatedAt).toLocaleDateString()}</p>
					</header>

					<hr className="border-primary-toned-300" />

					<ExamDetails exam={exam} />

					<hr className="border-primary-toned-300" />


					<div className="flex flex-col gap-2">
						<h2 className="text-lg font-semibold text-gray-700">Exam Summary</h2>
						<p className="text-sm text-gray-500">
							Here you can find the futher details about the exam, including the number of questions, total points, and more.
						</p>
					</div>

					<div className="grid grid-cols-3 gap-4 ">
						<QuestionsOverviewCard
							numberOfQuestions={exam._aggregate.numberOfQuestions}
							totalPoints={exam._aggregate.totalPoints}
						/>
						<ParticipantsOverviewCard
							totalParticipants={exam._aggregate.totalCandidates}
							totalAttempts={exam._aggregate.totalAttempts}
						/>
						<AttemptsOverviewCard
							totalAttempts={exam._aggregate.totalAttempts}
							totalCandidates={exam._aggregate.totalCandidates}
							highestScore={exam._aggregate.highestScore}
							averageScore={exam._aggregate.averageScore}
							lowestScore={exam._aggregate.lowestScore}
							averageTime={exam._aggregate.averageTime}
						/>
					</div>
				</div>
			)}
		/>
	);
}
