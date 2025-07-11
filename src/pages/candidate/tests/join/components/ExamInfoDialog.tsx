import React, { useState } from 'react';
import { AlarmClock, AlertCircle, Globe } from 'lucide-react';
import { format } from 'date-fns';
import PasswordInput from './PasswordInput';
import ExamInfoDialogBottom from './ExamInfoDialogBottom';
import { GetTestsFindByRoomApiResponse } from '../../../../../features/tests/api/test.api-gen-v2';
import MyDialog from '../../../../../features/tests/ui/MyDialog';
import MyButton from '../../../../../features/tests/ui/buttons/MyButton';
import { SmallUserInfo } from '../../../../../features/tests/ui-shared/SmallUserInfo';

interface ExamInfoDialogProps {
	isOpen: boolean;
	onClose: () => void;
	roomId: string;
	data: GetTestsFindByRoomApiResponse;
}

const ExamInfoDialog: React.FC<ExamInfoDialogProps> = ({
	isOpen,
	onClose,
	roomId,
	data
}) => {
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState<string | null>(null);

	if (!isOpen) return null;
	if (data == null) return null;

	const { data: examData, hasJoined } = data;
	if (examData == null || examData._detail.mode !== "EXAM") {
		return (
			<MyDialog>
				<MyDialog.Content>
					<div className="flex flex-col items-center justify-center">
						<div className="bg-red-100 p-3 rounded-full mb-4">
							<AlertCircle size={40} className="text-red-500" />
						</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-2">Test Not Found</h3>
						<p className="text-gray-600 text-center mb-6">No test found with the provided roomId: {roomId}</p>
						<MyButton
							className='w-full'
							variant={"gray"}
							onClick={onClose}
						>
							Close
						</MyButton>
					</div>
				</MyDialog.Content>
			</MyDialog>
		);
	}
	const detail = examData._detail;
	const { openDate, closeDate, hasPassword, isAllowedToSeeOtherResults, isAnswerVisible, isPublic, numberOfAttemptsAllowed, numberOfParticipants } = detail;

	return (
		<MyDialog>
			<MyDialog.Content>
				<MyDialog.Header
					title="Exam Information"
					description={`Room ID: ${roomId}`}
					onClose={onClose}
				/>

				<div className='flex flex-col items-center gap-2 flex-1 overflow-auto p-6'>
					<h2 className="text-2xl text-primary-toned-700 font-bold text-center">
						{examData.title}
					</h2>
					<SmallUserInfo userId={examData.authorId} />

					{examData.description.trim() !== "" && <div className='w-full bg-gray-50 rounded-lg p-2 shadow-sm border border-gray-200'>
						<p className="text-sm text-gray-500">{examData.description}</p>
					</div>}

					<div className='flex items-center gap-2 w-full'>
						<div className="flex items-center gap-2 text-xs font-semibold px-4 py-0.5 bg-primary-toned-100 rounded-full w-fit h-fit text-primary-toned-700">
							<AlarmClock size={14} />
							<span>{examData.minutesToAnswer} min(s)</span>
						</div>

						<div className="flex items-center gap-2 text-xs font-semibold px-4 py-0.5 bg-primary-toned-100 rounded-full w-fit h-fit text-primary-toned-700">
							<Globe size={14} />
							<span>{examData.language}</span>
						</div>
					</div>

					<div className='flex flex-col items-start w-full mt-2'>
						<span className="font-semibold text-sm text-primary mr-2">Available:</span>
						<span className='text-sm text-gray-500'>{formatDate(openDate)} - {formatDate(closeDate)}</span>
					</div>

					<div className='flex flex-col items-start w-full mt-2'>
						<span className="font-semibold text-sm text-primary mr-2">Participants count:</span>
						<span className='text-sm text-gray-500'>{detail.participants.length}</span>
					</div>

					<hr className='w-full border-gray-200 my-1' />

					<div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 shadow-sm rounded-lg grid grid-cols-[auto_1fr] [&>*:nth-child(even)]:justify-self-end gap-1 text-gray-700 text-sm">
						<span className="font-medium mr-2">Max number of attempts allowed:</span>
						<span>{numberOfAttemptsAllowed === 0 ? "Unlimited" : numberOfAttemptsAllowed}</span>

						<span className="font-medium mr-2">Answers visible:</span>
						<span>{isAnswerVisible ? 'Yes' : 'No'}</span>

						<span className="font-medium mr-2">See other results:</span>
						<span>{isAllowedToSeeOtherResults ? "Yes" : "No"}</span>

						<span className="font-medium mr-2">Max number of participants:</span>
						<span>{numberOfParticipants === 0 ? "Unlimited" : numberOfParticipants}</span>

						<span className="font-medium mr-2">Public:</span>
						<span>{isPublic ? 'Yes' : 'No'}</span>
					</div>
				</div>

				<div className='flex flex-col items-center gap-4 mt-4 w-full'>
					{(hasJoined === false && hasPassword === true) ? (
						<PasswordInput
							password={password}
							onPasswordChange={setPassword}
							passwordError={passwordError}
							onPasswordErrorChange={setPasswordError}
						/>
					) : (
						<div></div>
					)}


					{examData && examData._detail.mode === "EXAM" && (
						<ExamInfoDialogBottom
							examData={examData}
							hasJoined={hasJoined === true}
							onCancel={onClose}
							onJoinError={setPasswordError}
							password={password}
						/>
					)}
				</div>

			</MyDialog.Content>
		</MyDialog>
	);
};

export default ExamInfoDialog;

const formatDate = (dateString: string | null) => {
	try {
		if (!dateString) return "N/A";
		return format(new Date(dateString), 'MMM dd, yyyy • hh:mm a');
	} catch (error) {
		return dateString;
	}
};