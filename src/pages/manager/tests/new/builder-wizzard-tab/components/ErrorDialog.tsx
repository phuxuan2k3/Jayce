export default function ErrorDialog({
	error,
	onRetry,
}: {
	error: string;
	onRetry: () => void;
}) {
	return (
		<div className="max-w-md mx-auto p-6">
			<div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
				{/* Error Icon */}
				<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>

				{/* Error Content */}
				<h3 className="text-lg font-semibold text-red-800 mb-2">
					Generation Failed
				</h3>
				<p className="text-red-700 mb-4 leading-relaxed">
					{error}
				</p>

				{/* Retry Button */}
				<button
					onClick={() => onRetry()}
					className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
				>
					Try Again
				</button>

				{/* Help Text */}
				<p className="text-sm text-red-600 mt-3">
					If the problem persists, please check your internet connection or try again later.
				</p>
			</div>
		</div>
	)
}
