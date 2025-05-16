import React, { useEffect, useState } from 'react';
import { ExamCore } from '../../../../../features/tests/model/test.model';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../router/paths';
import { AlarmClock, AlertCircle, LockIcon, CheckCircle, X, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { usePostExamsJoinMutation } from '../../../../../features/tests/api/test.api-gen';
import { useAppSelector } from '../../../../../app/hooks';
import { authSelectors } from '../../../../../features/auth/store/authSlice';

interface ExamInfoDialogProps {
	isOpen: boolean;
	onClose: () => void;
	roomId: string;
	isLoading: boolean;
	examData: ExamCore | null;
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
	const [join, joinState] = usePostExamsJoinMutation();
	const userId = useAppSelector(authSelectors.selectUserId);
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	useEffect(() => {
		if (examData && joinState.isSuccess) {
			navigate(paths.candidate.tests.in(examData.id).TAKE_PRACTICE);
		}
	}, [joinState.isSuccess, examData, navigate]);

	if (!isOpen) return null;

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setPasswordError(null);
	};

	const handleJoinTest = async () => {
		if (!examData || userId == null) return;

		// If the test requires a password but none was provided
		if (examData.hasPassword) {
			if (!password) {
				setPasswordError('Please enter the password to join this test');
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
					password: "",
				}
			});
		}
	};

	const formatDate = (dateString: string) => {
		try {
			return format(new Date(dateString), 'MMM dd, yyyy • hh:mm a');
		} catch (error) {
			return dateString;
		}
	};

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

							{/* Password input if required */}
							{examData.hasPassword && (
								<div className="mt-4">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										This test is password protected
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<LockIcon size={16} className="text-gray-400" />
										</div>
										<input
											type={showPassword ? "text" : "password"}
											value={password}
											onChange={handlePasswordChange}
											className={`pl-10 pr-10 py-2 w-full border ${passwordError ? 'border-red-500' : 'border-gray-300'
												} rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
											placeholder="Enter password to join"
										/>
										<button
											type="button"
											className="absolute inset-y-0 right-0 pr-3 flex items-center"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOff size={16} className="text-gray-400" />
											) : (
												<Eye size={16} className="text-gray-400" />
											)}
										</button>
									</div>
									{passwordError && (
										<p className="mt-1 text-sm text-red-600">{passwordError}</p>
									)}
								</div>
							)}
						</div>

						<div className="flex justify-end space-x-3 mt-6">
							<button
								onClick={onClose}
								className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleJoinTest}
								className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
							>
								{
									joinState.isLoading ? (
										<span className="flex items-center">
											<span className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
											Joining...
										</span>
									) : "Start Test"
								}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ExamInfoDialog;
