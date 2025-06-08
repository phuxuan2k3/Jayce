import { AlertTriangle, RefreshCw, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import fetchStateSlice from '../../stores/fetchStateSlice';

export default function FetchStateDialog() {
	const fetchState = useAppSelector((state) => state.fetchState);
	const dispatch = useAppDispatch();

	return (
		<>
			{fetchState.isLoading && <LoadingDialog />}
			{fetchState.errorMessage && (
				<ErrorDialog
					errorMessage={fetchState.errorMessage}
					onClose={() => dispatch(fetchStateSlice.actions.clear())}
					onRetry={() => dispatch(fetchStateSlice.actions.setRetrying(true))}
				/>
			)}
		</>
	)
}



function LoadingDialog() {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
				<div className="flex items-center justify-center mb-4">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
				</div>
				<h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
					Loading, please wait...
				</h2>
				<p className="text-gray-600 text-center">
					This may take a few moments.
				</p>
			</div>
		</div>
	)
}

function ErrorDialog({
	errorMessage,
	onRetry,
	onClose,
}: {
	errorMessage?: string;
	onRetry?: () => void;
	onClose?: () => void;
}) {
	const displayMessage = errorMessage || "An unexpected error occurred. Please try again.";

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md relative animate-fade-in">
				{/* Close button */}
				{onClose && (
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
						aria-label="Close"
					>
						<X size={20} />
					</button>
				)}

				{/* Header with icon */}
				<div className="flex items-center justify-center pt-8 pb-4">
					<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
						<AlertTriangle size={32} className="text-red-500" />
					</div>
				</div>

				{/* Content */}
				<div className="px-6 pb-6">
					<h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
						Something went wrong
					</h2>
					<p className="text-gray-600 text-center mb-6 leading-relaxed">
						{displayMessage}
					</p>

					{/* Action buttons */}
					<div className="flex gap-3">
						{onRetry && (
							<button
								onClick={onRetry}
								className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-toned-700 transition-colors font-medium"
							>
								<RefreshCw size={16} />
								Try Again
							</button>
						)}

						{onClose && (
							<button
								onClick={onClose}
								className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
							>
								Cancel
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
