import React, { useState } from 'react';
import { ExamCore } from '../../../../../features/tests/model/test.model';
import { AlarmClock, AlertCircle, CheckCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import PasswordInput from './PasswordInput';
import ExamInfoBottom from './ExamInfoBottom';

interface ExamInfoDialogProps {
	isOpen: boolean;
	onClose: () => void;
	roomId: string;
	isLoading: boolean;
	examData?: ExamCore & {
		hasJoined: boolean;
	};
	error: string | null;
}

const ExamInfoDialog: React.FC<ExamInfoDialogProps> = ({
	isOpen,
	onClose,
	roomId,
	isLoading,
	examData,
	error
}) => {
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState<string | null>(null);

	if (!isOpen) return null;

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

						<h2 className="text-xl font-bold text-center mb-6">{examData.title}</h2>

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
										<span>{formatDate(examData.openDate)} - {formatDate(examData.closeDate)}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Language:</span>
										<span>{examData.language}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Attempts allowed:</span>
										<span>{examData.numberOfAttemptsAllowed}</span>
									</div>

									<div className="flex items-center">
										<span className="font-medium mr-2">Answers visible:</span>
										<span>{examData.isAnswerVisible ? 'Yes' : 'No'}</span>
									</div>
								</div>
							</div>
						</div>

						<PasswordInput
							password={password}
							onPasswordChange={setPassword}
							passwordError={passwordError}
							onPasswordErrorChange={setPasswordError}
						/>
					</div>
				)}

				{examData && <ExamInfoBottom
					examData={examData}
					hasJoined={examData.hasJoined}
					onCancel={onClose}
					onJoinError={setPasswordError}
					password={password}
				/>}
			</div>
		</div>
	);
};

export default ExamInfoDialog;

const formatDate = (dateString: string) => {
	try {
		return format(new Date(dateString), 'MMM dd, yyyy • hh:mm a');
	} catch (error) {
		return dateString;
	}
};