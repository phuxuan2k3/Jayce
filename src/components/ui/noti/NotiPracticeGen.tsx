import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import practiceGenSlice from '../../../features/tests/stores/practiceGenSlice'
import { cn } from '../../../app/cn';
import { useNavigate } from 'react-router-dom';
import paths from '../../../router/paths';

type NotiProps = {
	notiStatus: "loading" | "success" | "error";
}

const CommonClassNames = {
	loading: {
		background: "bg-gradient-to-br from-blue-500 to-blue-600",
		dotBackground: "bg-white animate-pulse",
		notiTitle: "Generating Test",
	},
	success: {
		background: "bg-gradient-to-br from-green-500 to-green-600",
		dotBackground: "bg-green-200",
		notiTitle: "Successfully Generated",
	},
	error: {
		background: "bg-gradient-to-br from-red-500 to-red-600",
		dotBackground: "bg-red-200",
		notiTitle: "Generation Error",
	},
} as const;

export default function NotiPracticeGen() {
	const dispatch = useAppDispatch();

	const [isExpanded, setIsExpanded] = useState(false);
	const [isDismissed, setIsDismissed] = useState(false);
	const [noti, setNoti] = useState<NotiProps>({
		notiStatus: "loading",
	});

	const genStatus = useAppSelector(practiceGenSlice.selectors.selectGenStatus);
	const savedTestId = useAppSelector(practiceGenSlice.selectors.selectSavedTestId);
	const errorMessage = useAppSelector(practiceGenSlice.selectors.selectApiErrorMessage);

	useEffect(() => {
		if (genStatus === "saved" && savedTestId !== null) {
			setNoti({ notiStatus: "success" });
			setIsExpanded(true);
		}
	}, [genStatus, savedTestId, dispatch]);

	useEffect(() => {
		if (errorMessage !== null) {
			setNoti({ notiStatus: "error" });
			setIsExpanded(true);
		}
	}, [errorMessage, dispatch]);

	const handleMinimize = () => {
		setIsExpanded(false);
	};

	const handleDismiss = () => {
		setIsDismissed(true);
		if (noti.notiStatus === "success" || noti.notiStatus === "error") {
			dispatch(practiceGenSlice.actions.acknowledgeGeneratedTest());
		}
	};

	const notiStatus = noti.notiStatus;
	const {
		background,
		dotBackground,
		notiTitle,
	} = CommonClassNames[notiStatus];

	if (isDismissed || genStatus === "none") {
		return null;
	}

	return (
		<div className="fixed bottom-4 right-4 z-50">
			<div
				className={cn(
					"text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out",
					background,
					isExpanded
						? "w-80 p-4"
						: "w-12 h-12 cursor-pointer hover:scale-105",
				)}
			>
				{!isExpanded ? (
					// Collapsed state - small floating icon
					<div
						className="flex items-center justify-center w-full h-full"
						onClick={() => setIsExpanded(true)}
					>
						<div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
					</div>
				) : (
					// Expanded state - full notification
					<div className="space-y-3">

						{/* Header */}
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className={cn(
									"w-2 h-2 rounded-full",
									dotBackground
								)}></div>
								<span className="font-medium text-sm">
									{notiTitle}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<MinimizeButton
									onClick={handleMinimize}
								/>
								<DismissButton
									onClick={handleDismiss}
								/>
							</div>
						</div>

						{/* Content */}
						<div className="text-sm opacity-90">
							{notiStatus === "error" ? (
								<ErrorContent />
							) : notiStatus === "success" ? (
								<SuccessContent />
							) : notiStatus === "loading" ? (
								<LoadingContent />
							) : null}
						</div>
					</div>
				)}
			</div >
		</div >
	);
}


const MinimizeButton = ({
	className = "",
	onClick,
}: {
	className?: string;
	onClick: () => void;
}) => (
	<button
		onClick={onClick}
		className={cn("p-1 hover:bg-white/20 rounded transition-colors", className)}
		title="Minimize"
	>
		<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
		</svg>
	</button>
);

const DismissButton = ({
	onClick,
	className = "",
}: {
	onClick: () => void;
	className?: string;
}) => (
	<button
		onClick={onClick}
		className={cn("p-1 hover:bg-white/20 rounded transition-colors", className)}
		title="Dismiss"
	>
		<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>
);

const ErrorContent = () => {
	const navigate = useNavigate();

	const errorMessage = useAppSelector(practiceGenSlice.selectors.selectApiErrorMessage);
	const requestData = useAppSelector(practiceGenSlice.selectors.selectRequestData);

	const handleRetry = () => {
		navigate(paths.candidate.tests.GENERATE, {
			state: {
				template: requestData,
			}
		});
	};

	if (!errorMessage) {
		return null;
	};

	return (
		<div className="space-y-1">
			<div>Status: Failed</div>
			<div className="text-xs text-red-100">
				{errorMessage}
			</div>

			<button className='bg-white/20 hover:bg-white/30 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2'
				onClick={handleRetry}
			>
				Retry
			</button>
		</div>
	);
}

const SuccessContent = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const savedTestId = useAppSelector(practiceGenSlice.selectors.selectSavedTestId);

	const handleTakeTest = () => {
		if (savedTestId != null) {
			navigate(paths.candidate.tests.in(savedTestId).PRACTICE);
			dispatch(practiceGenSlice.actions.acknowledgeGeneratedTest());
		}
	};

	return (
		<div className="space-y-1">
			<div>Status: Complete</div>
			<div className="text-xs text-green-100">
				Your practice test has been generated successfully!
			</div>
			<button
				onClick={handleTakeTest}
				className="w-full bg-white/20 hover:bg-white/30 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
			>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
				Take Test
			</button>
		</div>
	);
}

const LoadingContent = () => {
	const navigate = useNavigate();
	const genStatus = useAppSelector(practiceGenSlice.selectors.selectGenStatus);

	const handleGenerating = () => {
		navigate(paths.candidate.tests.GENERATE);
	};

	if (genStatus !== "generating" && genStatus !== "saving") {
		return null;
	}
	const progressBarWidth = genStatus === "generating"
		? "w-1/3"
		: genStatus === "saving"
			? "w-2/3"
			: "w-0";
	return (
		<div>
			<div>Status: {genStatus}</div>
			<div className="w-full bg-white/30 rounded-full h-1">
				<div className={cn("bg-white h-1 rounded-full animate-pulse", progressBarWidth)}></div>
			</div>

			<button
				className='w-full bg-white/20 hover:bg-white/30 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2'
				onClick={handleGenerating}
			>
				Generating...
			</button>
		</div>
	);
}
