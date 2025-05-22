import { ExamCore, TestAggregateCore } from '../../../../../../../features/tests/model/test.model';
import { AttemptsOfTestAggregate } from '../../../../../../../features/tests/model/attempt.model';
import { ExamHeader } from './ExamHeader';
import { ExamDetails } from './ExamDetailsCard';
import { ScheduleAccess } from './ScheduleAccess';
import { ContentOverviewCard } from './ContentOverviewCard';
import { ParticipantsStatisticCard } from './ParticipantsStatisticCard';
import { PerformanceMetricCard } from './PerformanceMetricCard';

/**
 * Main ExamInformationSection component that assembles all the sub-components
 */
export default function ExamInformationTab({
	exam,
	testAggregate,
	attemptOfTestAggregate,
}: {
	exam: ExamCore;
	testAggregate: TestAggregateCore;
	attemptOfTestAggregate: AttemptsOfTestAggregate;
}) {
	return (
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
	);
}
