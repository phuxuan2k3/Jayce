import React, { useState } from 'react';
import { AlarmClock, AlertCircle, CheckCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import PasswordInput from './PasswordInput';
import ExamInfoDialogBottom from './ExamInfoDialogBottom';
import { GetTestsFindByRoomApiResponse } from '../../../../../features/tests/api/test.api-gen-v2';

interface ExamInfoDialogProps {
	isOpen: boolean;
	onClose: () => void;
	roomId: string;
	isLoading: boolean;
	data: GetTestsFindByRoomApiResponse | undefined;
	error: string | null;
}

const ExamInfoDialog: React.FC<ExamInfoDialogProps> = ({
	isOpen,
	onClose,
	roomId,
	isLoading,
	data,
	error
}) => {
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState<string | null>(null);

	if (!isOpen) return null;
	if (data == null) return null;

	const { data: examData, hasJoined } = data;
	if (examData == null) {
		return (
			<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
				<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
					<h2 className="text-xl font-bold mb-4">Test Not Found</h2>
					<p className="text-gray-600 mb-4">No test found with roomId: {roomId}</p>
					<button
						onClick={onClose}
						className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		);
	}
	if (examData._detail.mode !== "EXAM") {
		return (
			<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
				<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
					<h2 className="text-xl font-bold mb-4">Invalid Test Type</h2>
					<p className="text-gray-600 mb-4">This test is not an exam. Please join a valid exam.</p>
					<button
						onClick={onClose}
						className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		);
	}
	const detail = examData._detail;


	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md relative animate-fadeIn">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
				>
					<X size={20} />
				</button>

				{/* Loading State */}
				{isLoading && (
					<div className="p-8 flex flex-col items-center justify-center">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
						<h3 className="text-xl font-semibold text-gray-800 mb-2">Searching for test...</h3>
						<p className="text-gray-600 text-center">Looking for test with roomId: {roomId}</p>
					</div>
				)}

				{/* Error State */}
				{!isLoading && error && (
					<div className="p-8 flex flex-col items-center justify-center">
						<div className="bg-red-100 p-3 rounded-full mb-4">
							<AlertCircle size={40} className="text-red-500" />
						</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-2">Test Not Found</h3>
						<p className="text-gray-600 text-center mb-6">{error}</p>
						<button
							onClick={onClose}
							className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
						>
							Go Back
						</button>
					</div>
				)}

				{/* Success State: Test Found */}
				{!isLoading && !error && examData && (
					<div className="p-6">
						<div className="mb-6 flex items-center justify-center">
							<div className="bg-green-100 p-3 rounded-full">
								<CheckCircle size={32} className="text-green-500" />
							</div>
						</div>

						<h2 className="text-xl font-bold text-center mb-6">
							<span className="text-primary">{examData._detail.mode}</span>
							{examData.title}
						</h2>

						<div className="space-y-4 mb-6">
							<div className="bg-gray-50 p-4 rounded-lg">
								<p className="text-gray-700 mb-1">{examData.description}</p>

								<div className="mt-4 space-y-2 text-sm text-gray-600">
									<div className="flex items-center">
										<AlarmClock size={16} className="mr-2" />
										<span>Duration: {examData.minutesToAnswer} minutes</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Available:</span>
										<span>{formatDate(detail.openDate)} - {formatDate(detail.closeDate)}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Language:</span>
										<span>{examData.language}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Attempts allowed:</span>
										<span>{detail.numberOfAttemptsAllowed}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Answers visible:</span>
										<span>{detail.isAnswerVisible ? 'Yes' : 'No'}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">See other results:</span>
										<span>{detail.isAllowedToSeeOtherResults ? "Yes" : "No"}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Max number of participants:</span>
										<span>{detail.mode}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Current number of participants:</span>
										<span>{detail.participants.length}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Public:</span>
										<span>{detail.isPublic ? 'Yes' : 'No'}</span>
									</div>
								</div>
							</div>
						</div>
						{(hasJoined === false && detail.hasPassword === true) ? (
							<PasswordInput
								password={password}
								onPasswordChange={setPassword}
								passwordError={passwordError}
								onPasswordErrorChange={setPasswordError}
							/>
						) : (
							<div></div>
						)}
					</div>
				)}

				{examData && examData._detail.mode === "EXAM" && <div className='pb-4 px-4'>
					<ExamInfoDialogBottom
						examData={examData}
						hasJoined={hasJoined === true}
						onCancel={onClose}
						onJoinError={setPasswordError}
						password={password}
					/>
				</div>}
			</div>
		</div>
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