interface HelpTextProps { }

export default function HelpText({ }: HelpTextProps) {
	return (
		<div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
			<h4 className="text-sm font-semibold text-blue-800 mb-2">Tips:</h4>
			<ul className="text-sm text-blue-700 space-y-1">
				<li>• Difficulty percentages must total 100% for each topic</li>
				<li>• Use descriptive topic names to organize your questions effectively</li>
				<li>• Consider your target audience when setting difficulty distributions</li>
			</ul>
		</div>
	);
}
