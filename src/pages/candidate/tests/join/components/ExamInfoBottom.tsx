import { useEffect } from 'react'
import { usePostExamsJoinMutation } from '../../../../../infra-test/api/test.api-gen';
import { ExamCore } from '../../../../../infra-test/core/test.model';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../router/paths';

export default function ExamInfoBottom({
	examData,
	hasJoined,
	password,
	onJoinError,
	onCancel,
}: {
	examData: ExamCore;
	hasJoined: boolean;
	password: string;
	onJoinError: (error: string) => void;
	onCancel: () => void;
}) {
	const navigate = useNavigate();
	const [join, joinState] = usePostExamsJoinMutation();

	useEffect(() => {
		if (joinState.isSuccess) {
			navigate(paths.candidate.tests.in(examData.id).EXAM);
		}
	}, [joinState.isSuccess, examData, navigate]);

	const handleJoin = async () => {
		if (hasJoined) {
			navigate(paths.candidate.tests.in(examData.id).EXAM);
			return;
		}
		// If the test requires a password but none was provided
		if (examData.hasPassword) {
			if (!password) {
				onJoinError('Please enter the password to join this test');
			} else {
				join({
					body: {
						password,
						testId: examData.id,
					}
				});
			}
		}
		else {
			join({
				body: {
					testId: examData.id,
				}
			});
		}
	};

	return (
		<div className="flex justify-end space-x-3 mt-6">
			<button
				onClick={onCancel}
				className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
			>
				Cancel
			</button>

			<button
				onClick={handleJoin}
				className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
			>
				{hasJoined ? (
					<span>Back to Test</span>
				) : (joinState.isLoading ? (
					<span className="flex items-center">
						<span className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
						Joining...
					</span>
				) : (
					<span>Join Test</span>
				))}
			</button>
		</div>
	);
}

