export default function SpinnerLoading() {
	return (
		<div className="flex justify-center items-center w-full h-full px-2">
			<div className="w-10 h-10 border-4 border-primary-toned-600 border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
}
