export const GenerationLoading: React.FC = () => {
	return (
		<div className="w-full h-full px-12 mt-12">
			<h2 className="text-2xl font-semibold mb-2">Generating options...</h2>
			<p className="text-gray-500  mt-8">Please wait while we generate the question for you, this will take around 30 seconds</p>
			<progress className="progress w-full mt-12"></progress>
		</div>
	);
};