import { AttemptCoreSchema } from '../../api/test.api-gen-v2'

export default function AttemptCard({ attempt }: { attempt: AttemptCoreSchema }) {
	const { id, order, status, secondsSpent, createdAt, updatedAt, _aggregate, _include } = attempt;
	const { points, answered, answeredCorrect } = _aggregate;
	const { test } = _include;

	// Format time spent (seconds to mm:ss)
	const formatTime = (s: number) => {
		const m = Math.floor(s / 60);
		const sec = s % 60;
		return `${m}:${sec.toString().padStart(2, '0')}`;
	};

	// Format date
	const formatDate = (date: string) => new Date(date).toLocaleString();

	return (
		<div className="border rounded-lg shadow-sm p-4 bg-white flex flex-col gap-2">
			<div className="flex justify-between items-center">
				<div className="font-semibold text-lg">Attempt #{order}</div>
				<span className={`px-2 py-1 rounded text-xs font-medium ${status === 'GRADED' ? 'bg-green-100 text-green-700' : status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{status}</span>
			</div>
			<div className="text-sm text-gray-600">Test: <span className="font-medium">{test.title}</span></div>
			<div className="flex flex-wrap gap-4 mt-2">
				<div>
					<span className="font-medium">Points:</span> {points}
				</div>
				<div>
					<span className="font-medium">Answered:</span> {answered}
				</div>
				<div>
					<span className="font-medium">Correct:</span> {answeredCorrect}
				</div>
				<div>
					<span className="font-medium">Time Spent:</span> {formatTime(secondsSpent)}
				</div>
			</div>
			<div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
				<div>Started: {formatDate(createdAt)}</div>
				<div>Updated: {formatDate(updatedAt)}</div>
				<div>Attempt ID: {id}</div>
			</div>
		</div>
	);
}
