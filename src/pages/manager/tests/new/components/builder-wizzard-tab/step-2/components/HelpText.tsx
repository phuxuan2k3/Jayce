interface HelpTextProps { }

export default function HelpText({ }: HelpTextProps) {
	return (<div className="mt-8 p-4 bg-primary-toned-50 border border-primary-toned-200 rounded-lg">
		<h4 className="text-sm font-semibold text-primary-toned-800 mb-2">Tips:</h4>
		<ul className="text-sm text-primary-toned-700 space-y-1">
			<li>• Balance your difficulty distribution: mix Easy, Medium, and Hard questions based on your assessment goals</li>
			<li>• Use clear, descriptive topic names that reflect the specific subject area being tested</li>
			<li>• Consider your target audience's skill level when setting question counts for each difficulty</li>
		</ul>
	</div>
	);
}
