import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../router/paths';
import { TestFullSchema, usePostTestsByTestIdParticipantsMutation } from '../../../../../features/tests/api/test.api-gen-v2';
import MyButton from '../../../../../features/tests/ui/buttons/MyButton';

export default function ExamInfoDialogBottom({
	examData,
	hasJoined,
	password,
	onJoinError,
	onCancel,
}: {
	examData: TestFullSchema;
	hasJoined: boolean;
	password: string;
	onJoinError: (error: string) => void;
	onCancel: () => void;
}) {
	const navigate = useNavigate();
	const [join, joinState] = usePostTestsByTestIdParticipantsMutation();

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
		if (examData._detail.mode === "EXAM" && examData._detail.hasPassword) {
			if (!password) {
				onJoinError('Please enter the password to join this test');
			} else {
				join({
					testId: examData.id,
					body: {
						password,
					}
				});
			}
		}
		else {
			join({
				testId: examData.id,
				body: {}
			});
		}
	};

	return (
		<div className="flex justify-between items-center gap-4 w-full">
			<MyButton
				onClick={onCancel}
				variant={"gray"}
				className='flex-1'
				size={"medium"}
			>
				Cancel
			</MyButton>

			<MyButton
				onClick={handleJoin}
				variant={"primary"}
				className='flex-1'
				size={"medium"}
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
			</MyButton>
		</div>
	);
}

