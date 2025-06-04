export default function LoadingDialog() {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
			<div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-gray-100">
				<div className="flex flex-col items-center text-center">
					{/* Animated Loading Icon */}
					<div className="relative mb-6">
						<div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-toned-200"></div>
						<div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-toned-500 border-t-transparent absolute top-0 left-0"></div>
					</div>

					{/* Loading Text */}
					<h3 className="text-xl font-semibold text-gray-800 mb-2">
						Generating Your Exam Questions
					</h3>
					<p className="text-gray-600 mb-4">
						Our AI is crafting personalized questions based on your specifications...
					</p>

					{/* Progress Dots */}
					<div className="flex space-x-2">
						<div className="w-2 h-2 bg-primary-toned-500 rounded-full animate-pulse"></div>
						<div className="w-2 h-2 bg-primary-toned-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
						<div className="w-2 h-2 bg-primary-toned-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
					</div>

					{/* Estimated Time */}
					<p className="text-sm text-gray-500 mt-4">
						This usually takes 30-60 seconds
					</p>
				</div>
			</div>
		</div>
	)
}
