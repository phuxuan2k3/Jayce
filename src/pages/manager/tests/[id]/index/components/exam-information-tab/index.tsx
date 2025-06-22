
import { InformationTabModel } from "./type";
import { useGetExamsByTestIdAggregateQuery, useGetExamsByTestIdAttemptsAggregateQuery, useGetExamsByTestIdQuery } from '../../../../../../../infra-test/api/test.api-gen';
import FetchStateCover from '../../../../../../../components/wrapper/FetchStateCover';
import { ContentOverviewCard } from './components/ContentOverviewCard';
import { ExamDetails } from './components/ExamDetailsCard';
import { ExamHeader } from './components/ExamHeader';
import { ParticipantsStatisticCard } from './components/ParticipantsStatisticCard';
import { PerformanceMetricCard } from './components/PerformanceMetricCard';
import { ScheduleAccess } from './components/ScheduleAccess';

/**
 * Main ExamInformationSection component that assembles all the sub-components
 */
export default function ExamInformationTab({
	testId,
}: {
	testId: string;
}) {
	const examQuery = useGetExamsByTestIdQuery({ testId });
	const testAggregateQuery = useGetExamsByTestIdAggregateQuery({ testId });
	const attemptsOfTestAggregateQuery = useGetExamsByTestIdAttemptsAggregateQuery({ testId });

	const isLoading =
		examQuery.isLoading ||
		testAggregateQuery.isLoading ||
		attemptsOfTestAggregateQuery.isLoading;
	const error =
		examQuery.error ||
		testAggregateQuery.error ||
		attemptsOfTestAggregateQuery.error;


	if (
		examQuery.data == null ||
		testAggregateQuery.data == null ||
		attemptsOfTestAggregateQuery.data == null
	) {
		return null;
	}

	const model: InformationTabModel = {
		exam: examQuery.data,
		testAggregate: testAggregateQuery.data,
		attemptOfTestAggregate: attemptsOfTestAggregateQuery.data,
	};

	const { exam, testAggregate, attemptOfTestAggregate } = model;

	return (
		<FetchStateCover
			queryState={{
				isLoading,
				error,
				data: model,
			}}
		>
			<div className="w-full flex flex-col gap-6">
				<ExamHeader exam={exam} />

				<hr className="border-primary-toned-300" />

				<div className='grid grid-cols-2 gap-4'>
					<ExamDetails exam={exam} />

					<ScheduleAccess exam={exam} />
				</div>

				<hr className="border-primary-toned-300" />


				<div className="flex flex-col gap-2">
					<h2 className="text-lg font-semibold text-gray-700">Exam Summary</h2>
					<p className="text-sm text-gray-500">
						Here you can find the futher details about the exam, including the number of questions, total points, and more.
					</p>
				</div>

				<div className="grid grid-cols-3 gap-4 ">
					<ContentOverviewCard
						testAggregate={testAggregate}
					/>
					<ParticipantsStatisticCard
						attemptOfTestAggregate={attemptOfTestAggregate}
					/>
					<PerformanceMetricCard
						attemptOfTestAggregate={attemptOfTestAggregate}
					/>
				</div>
			</div>
		</FetchStateCover>
	);
}
