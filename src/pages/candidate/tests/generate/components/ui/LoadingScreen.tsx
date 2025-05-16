export const LoadingScreen = ({
	state,
}: {
	state: "generating" | "saving"
}) => (
	<div className="flex flex-col items-center justify-center min-h-[400px]">
		<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
		<p className="mt-4 text-lg text-gray-600">{
			state === "saving"
				? "Saving your test..."
				: "Generating your test..."
		}</p>
	</div>
);
