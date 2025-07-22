import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import practiceGenSlice from '../../../features/tests/stores/practiceGenSlice'
import { cn } from '../../../app/cn';
import { useNavigate } from 'react-router-dom';
import paths from '../../../router/paths';
import { useLanguage } from '../../../LanguageProvider';

type NotiProps = {
	notiStatus: "loading" | "success" | "error" | "idle";
}

export default function NotiPracticeGen() {
	const { t } = useLanguage();

	const CommonClassNames = {
		loading: {
			background: cn("bg-gradient-to-br from-primary-toned-500 to-secondary-toned-500"),
			dotBackground: cn("bg-white animate-pulse"),
			notiTitle: t("notipracgen_title_loading"),
		},
		success: {
			background: cn("bg-gradient-to-br from-green-500 to-green-600"),
			dotBackground: cn("bg-green-200"),
			notiTitle: t("notipracgen_title_success"),
		},
		error: {
			background: cn("bg-gradient-to-br from-red-500 to-red-600"),
			dotBackground: cn("bg-red-200"),
			notiTitle: t("notipracgen_title_error"),
		},
		idle: {
			background: cn("bg-gray-500 opacity-30 hover:opacity-100"),
			dotBackground: cn("bg-gray-200"),
			notiTitle: t("notipracgen_title_idle"),
		},
	} as const;

	const dispatch = useAppDispatch();
	const notificationRef = useRef<HTMLDivElement>(null);

	const [isExpanded, setIsExpanded] = useState(false);
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
		} else if (errorMessage != null) {
			setNoti({ notiStatus: "error" });
			setIsExpanded(true);
		} else if (genStatus === "generating" || genStatus === "saving") {
			setNoti({ notiStatus: "loading" });
		}
		else {
			setNoti({ notiStatus: "idle" });
			setIsExpanded(false);
		}
	}, [errorMessage, genStatus, savedTestId, dispatch]);

	// Click outside handler
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
				setIsExpanded(false);
			}
		};

		// Only add listener when expanded
		if (isExpanded) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isExpanded]);

	const handleMinimize = () => {
		setIsExpanded(false);
	};

	const notiStatus = noti.notiStatus;
	const {
		background,
		dotBackground,
		notiTitle,
	} = CommonClassNames[notiStatus];

	return (
		<div className="fixed bottom-4 right-4 z-50">
			<div
				ref={notificationRef}
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
						onClick={() => {
							if (notiStatus === "idle") {
								return; // Do nothing if idle
							}
							setIsExpanded(true);
						}}
					>
						<div className={cn("w-3 h-3 bg-white rounded-full",
							notiStatus !== "idle" && "animate-pulse"
						)}></div>
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
									t={t}
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
							) : notiStatus === "idle" ? (
								<IdleContent />
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
	t,
}: {
	className?: string;
	onClick: () => void;
	t: (key: string) => string;
}) => (
	<button
		onClick={onClick}
		className={cn("p-1 hover:bg-white/20 rounded transition-colors", className)}
		title={t("notipracgen_minimize_button")}
	>
		<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
		</svg>
	</button>
);

// const DismissButton = ({
// 	onClick,
// 	className = "",
// }: {
// 	onClick: () => void;
// 	className?: string;
// }) => (
// 	<button
// 		onClick={onClick}
// 		className={cn("p-1 hover:bg-white/20 rounded transition-colors", className)}
// 		title="Dismiss"
// 	>
// 		<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// 			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// 		</svg>
// 	</button>
// );

const ErrorContent = () => {
	const { t } = useLanguage();

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

	if (errorMessage == null) {
		return null;
	};

	return (
		<div className="space-y-1">
			<div>{t("notipracgen_status_failed")}</div>
			<div className="text-xs text-red-100">
				{errorMessage}
			</div>

			<button className='bg-white/20 hover:bg-white/30 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2'
				onClick={handleRetry}
			>
				{t("notipracgen_error_retry")}
			</button>
		</div>
	);
}

const SuccessContent = () => {
	const { t } = useLanguage();

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
			<div>{t("notipracgen_status_complete")}</div>
			<div className="text-xs text-green-100">
				{t("notipracgen_success_message")}
			</div>
			<button
				onClick={handleTakeTest}
				className="w-full bg-white/20 hover:bg-white/30 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
			>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
				{t("notipracgen_success_take_test")}
			</button>
		</div>
	);
}

const LoadingContent = () => {
	const { t } = useLanguage();

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
		<div className="flex flex-col gap-1">
			<div>{t("notipracgen_status")}: {t(`notipracgen_status_${genStatus}`)}</div>
			<div className="w-full bg-white/30 rounded-full h-1 mb-2">
				<div className={cn("bg-white h-1 rounded-full animate-pulse", progressBarWidth)}></div>
			</div>

			<button
				className='w-full bg-white/20 hover:bg-white/30 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2'
				onClick={handleGenerating}
			>
				{t("notipracgen_loading_generating")}
			</button>
		</div>
	);
}

const IdleContent = () => {
	const { t } = useLanguage();

	const navigate = useNavigate();
	const handlePracticeNow = () => {
		navigate(paths.candidate.tests.GENERATE);
	};
	return (
		<div className='flex flex-col gap-2 items-center justify-center'>
			<div className="text-xs text-gray-400">
				{t("notipracgen_idle_message")}
			</div>

			<button className='bg-white/20 hover:bg-white/30 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2'
				onClick={handlePracticeNow}
			>
				{t("notipracgen_idle_button")}
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</button>
		</div>
	);
}