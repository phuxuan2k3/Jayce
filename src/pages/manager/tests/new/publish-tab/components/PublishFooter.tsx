import MyButton from "../../../../../../features/tests/ui/buttons/MyButton";

interface PublishFooterProps {
	onPublish: () => void;
}

export const PublishFooter = ({ onPublish }: PublishFooterProps) => {
	return (
		<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-4">
			<div className="flex items-start gap-3">
				<div className="text-primary-toned-600 mt-0.5">
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="flex-1">
					<h4 className="font-semibold text-primary-toned-800 mb-1">Ready to Publish</h4>
					<p className="text-primary-toned-700 text-sm mb-4">
						Review all the information above before publishing your exam. Once published,
						students will be able to access and take this exam according to the configured
						schedule and settings.
					</p>
					<MyButton
						variant={"primary"}
						size={"large"}
						onClick={onPublish}
					>
						Publish Exam
					</MyButton>
				</div>
			</div>
		</div>
	);
};
