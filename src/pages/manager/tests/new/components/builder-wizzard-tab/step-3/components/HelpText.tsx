interface HelpTextProps { }

export default function HelpText({ }: HelpTextProps) {
	return (
		<div className="mt-8 p-4 bg-primary-toned-50 border border-primary-toned-200 rounded-lg">
			<h4 className="text-sm font-semibold text-primary-toned-800 mb-2">Tips:</h4>
			<ul className="text-sm text-primary-toned-700 space-y-1">
				<li>• Conservative creativity generates predictable, standard questions following common patterns</li>
				<li>• Balanced creativity offers a mix of conventional and moderately innovative question styles</li>
				<li>• Creative mode produces more unique, thought-provoking questions that challenge traditional approaches</li>
				<li>• Add context through text, files, or links to provide AI with relevant information for question generation</li>
				<li>• Upload documents like specifications, manuals, or code samples to create context-specific questions</li>
			</ul>
		</div>
	);
}
