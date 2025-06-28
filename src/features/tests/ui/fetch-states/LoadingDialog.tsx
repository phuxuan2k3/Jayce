export default function LoadingDialog({ isLoading = true }: { isLoading?: boolean }) {
	if (!isLoading) {
		return null;
	}
	return (
		<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
			<div className="flex flex-col gap-2 items-center bg-white border border-gray-200 rounded-lg px-16 py-8 shadow-md">
				<div className="w-10 h-10 border-4 border-primary-toned-600 border-t-transparent rounded-full animate-spin"></div>
				<div className="text-gray-700">Loading...</div>
			</div>
		</div>
	)
}
