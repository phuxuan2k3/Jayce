export default function LoadingDialog() {
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
