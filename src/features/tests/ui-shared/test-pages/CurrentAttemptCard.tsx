import FetchStateCover2 from '../../ui/fetch-states/FetchStateCover2'
import StartNewAttemptButton from './StartNewAttemptButton'
import { AttemptCoreSchema, useGetTestsByTestIdAttemptsQuery } from '../../api/test.api-gen-v2';
import useGetTestIdParams from '../../hooks/useGetTestIdParams';
import useGetUserId from '../../hooks/useGetUserId';
import useTimeCountDown from '../../hooks/useTimeCountDown';
import { AlarmClock, ArrowRight, Calendar, History } from 'lucide-react';
import MyButton from '../../ui/buttons/MyButton';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../router/paths';

export default function CurrentAttemptCard() {
	const testId = useGetTestIdParams();
	const userId = useGetUserId();

	const currentAttemptQuery = useGetTestsByTestIdAttemptsQuery({
		testId,
		candidateId: userId,
		statusFilters: ["IN_PROGRESS"]
	}, {
		pollingInterval: 30000,
		refetchOnMountOrArgChange: true,
	});

	return (
		<FetchStateCover2
			fetchState={{ ...currentAttemptQuery }}
			loadingComponent={(
				<div className='h-64 w-full animate-pulse rounded-md bg-gray-200' />
			)}
			dataComponent={({ data: attempts }) => attempts.length > 0 ? (
				<div className="flex flex-col gap-2">
					{attempts.map(attempt => (
						<CurrentAttemptCardItem key={attempt.id} attempt={attempt} />
					))}
				</div>
			) : (
				<div className="flex flex-col gap-2 items-center justify-center p-6 bg-primary-toned-50 rounded-lg shadow-md text-sm text-primary-toned-600">
					<h2 className="text-xl font-semibold text-primary-toned-800 mb-4">No current attempts</h2>
					<p>You haven't started any attempts for this test yet.</p>
					<p>Click the button below to start a new attempt.</p>
					<hr className="my-2 w-full border-primary-toned-300/50" />
					<StartNewAttemptButton className='mb-4' />
				</div>
			)}
		/>
	)
}

function CurrentAttemptCardItem({ attempt }: { attempt: AttemptCoreSchema }) {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
	const { order, createdAt, updatedAt, _include } = attempt;
	const { test } = _include;
	const { minutesToAnswer, title } = test;
	const secondsLeft = useTimeCountDown({
		endDate: new Date(new Date(attempt.createdAt).getTime() + (minutesToAnswer * 1000 * 60))
	});

	// Format time spent (seconds to mm:ss)
	const formatTime = (s: number) => {
		const m = Math.floor(s / 60);
		const sec = s % 60;
		return `${m}:${sec.toString().padStart(2, '0')}`;
	};

	// Format date
	const formatDate = (date: string) => new Date(date).toLocaleString();

	return (
		<div className={`w-full flex flex-col bg-secondary-toned-50 border border-secondary rounded-xl shadow-lg p-6 gap-4 text-secondary relative overflow-hidden${secondsLeft === 0 ? ' opacity-70' : ''}`}>
			<div className="flex items-center gap-3 mb-2">
				<span className="bg-secondary text-white rounded-full px-3 py-1 text-xs font-bold shadow">#{order}</span>
				<span className="font-semibold text-xl tracking-wide">{title}</span>
			</div>
			<div className="flex items-center gap-4 mt-1">
				<span className="font-medium text-base">Time left:</span>
				{secondsLeft === 0 ? (
					<span className="flex items-center gap-2 text-lg font-semibold px-4 py-2 rounded-lg border border-red-400 bg-red-100 text-red-700 shadow animate-bounce">
						<AlarmClock size={20} className="inline-block" />
						Time's up!
					</span>
				) : (
					<span className="text-lg font-mono bg-secondary/10 px-3 py-1 rounded text-secondary border border-secondary/20">{formatTime(secondsLeft)}</span>
				)}
				<div className="flex-1 h-2 bg-secondary/10 rounded ml-4">
					<div
						className={`h-2 rounded transition-all duration-300 ${secondsLeft === 0 ? 'bg-red-300' : 'bg-secondary'}`}
						style={{ width: `${secondsLeft === 0 ? 0 : Math.max(0, Math.min(100, (secondsLeft / (test.minutesToAnswer * 60)) * 100))}%` }}
					></div>
				</div>
				<MyButton
					variant="secondary"
					className="ml-4 flex items-center gap-2"
					onClick={() => navigate(paths.candidate.tests.in(testId).attempts.in(attempt.id).DO)}
				>
					Continue Attempt
					<ArrowRight strokeWidth={3} />
				</MyButton>
			</div>
			<div className="flex flex-wrap gap-6 text-sm text-secondary-toned-700 mt-3 border-t border-secondary-toned-300 pt-3">
				<div className="flex items-center gap-1">
					<Calendar size={16} className="inline-block" />
					<span>Started: {formatDate(createdAt)}</span>
				</div>
				<div className="flex items-center gap-1">
					<History size={16} className="inline-block" />
					<span>Last answered: {formatDate(updatedAt)}</span>
				</div>
			</div>
		</div>
	);
}
