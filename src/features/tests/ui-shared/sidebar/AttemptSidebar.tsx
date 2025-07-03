import { AttemptCoreSchema, TestFullSchema } from "../../api/test.api-gen-v2";
import { AttemptUtils } from "../../ui-items/attempt/attempt-utils";
import { cn } from "../../../../app/cn";
import { TestSidebarPrimitives } from "./TestSidebarPrimitives";
import FetchStateCover2 from "../../ui/fetch-states/FetchStateCover2";
import useTestWithAttemptQueries from "../../hooks/query/useTestWithAttemptQueries";

export default function AttemptSidebar() {
	const testWithAttemptQuery = useTestWithAttemptQueries();

	return (
		<div className="sticky top-2 max-h-[96vh] overflow-y-auto shadow-primary bg-white rounded-xl p-6 flex flex-col gap-6 text-primary border border-primary-toned-200">
			<FetchStateCover2
				fetchState={testWithAttemptQuery}
				dataComponent={({ attempt, test }) => (
					<_AttemptSidebar
						attempt={attempt}
						test={test}
					/>
				)}
			/>
		</div>
	);
}

function _AttemptSidebar({
	attempt,
	test,
}: {
	attempt: AttemptCoreSchema;
	test: TestFullSchema;
}) {
	const { points, answered, answeredCorrect } = attempt._aggregate;
	const { totalPoints } = test._aggregate;

	const getScorePercentage = () => {
		return totalPoints > 0 ? Math.round((points / totalPoints) * 100) : 0;
	};

	const getAccuracyPercentage = () => {
		return answered > 0 ? Math.round((answeredCorrect / answered) * 100) : 0;
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-2xl font-bold">Attempt #{attempt.order}</h3>
					<span
						className={cn(
							AttemptUtils.status(attempt.status).bandage,
							"rounded-full text-xs px-4 py-0.5 w-fit font-bold border-2 mt-1 inline-block"
						)}
					>
						{attempt.status}
					</span>
				</div>
				<div className="flex flex-col items-center justify-center bg-primary text-white rounded-full px-4 py-2 mr-2">
					<span className="text-3xl font-bold">{points}</span>
					<span className="text-xs">
						{" "}
						/ {totalPoints} pts
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-1">
				<div className="flex justify-between text-xs font-medium text-primary-toned-600">
					<span>Score</span>
					<span>{getScorePercentage()}%</span>
				</div>
				<div className="w-full h-3 bg-primary-toned-100 rounded-full overflow-hidden">
					<div
						className="h-full bg-primary transition-all duration-300"
						style={{ width: `${getScorePercentage()}%` }}
					/>
				</div>
			</div>

			<div className="flex justify-between gap-2 text-center mt-2">
				<div className="flex-1 bg-primary-toned-50 rounded-lg py-2">
					<div className="text-lg font-bold">{answeredCorrect}</div>
					<div className="text-xs text-primary-toned-600">Correct</div>
				</div>
				<div className="flex-1 bg-primary-toned-50 rounded-lg py-2">
					<div className="text-lg font-bold">{answered}</div>
					<div className="text-xs text-primary-toned-600">Answered</div>
				</div>
				<div className="flex-1 bg-primary-toned-50 rounded-lg py-2">
					<div className="text-lg font-bold">{getAccuracyPercentage()}%</div>
					<div className="text-xs text-primary-toned-600">Accuracy</div>
				</div>
			</div>

			<hr className="border-primary-toned-300" />

			{/* Test Info */}
			<div className="flex flex-col gap-2">
				<TestSidebarPrimitives.Header
					test={test}
					mode={test.mode}
					authorId={test.authorId}
				/>
				<hr className="border-primary-toned-300 my-2" />
				<TestSidebarPrimitives.CommonInfo
					language={test.language}
					minutesToAnswer={test.minutesToAnswer}
					_aggregate={test._aggregate}
				/>
			</div>
		</>
	);
}


