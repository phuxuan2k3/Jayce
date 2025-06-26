interface PublishFooterProps {
	totalQuestions: number;
	onPublish: () => void;
}

export const PublishFooter = ({ totalQuestions, onPublish }: PublishFooterProps) => {
	const isDisabled = totalQuestions === 0;

	return (
		<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
			<div className="flex items-start gap-3">
				<div className="text-blue-600 mt-0.5">
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="flex-1">
					<h4 className="font-medium text-blue-800 mb-1">Ready to Publish</h4>
					<p className="text-blue-700 text-sm mb-4">
						Review all the information above before publishing your exam. Once published,
						students will be able to access and take this exam according to the configured
						schedule and settings.
					</p>
					<button
						onClick={onPublish}
						disabled={isDisabled}
						className={`px-6 py-3 rounded-lg font-medium transition-colors ${isDisabled
								? "bg-gray-300 text-gray-500 cursor-not-allowed"
								: "bg-primary hover:bg-primary-toned-700 text-white"
							}`}
					>
						{isDisabled ? "Add Questions to Publish" : "Publish Exam"}
					</button>
				</div>
			</div>
		</div>
	);
};
