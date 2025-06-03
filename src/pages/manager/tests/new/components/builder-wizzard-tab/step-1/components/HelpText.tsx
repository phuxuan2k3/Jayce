interface HelpTextProps { }

export default function HelpText({ }: HelpTextProps) {
	return (
		<div className="mt-8 p-4 bg-primary-toned-50 border border-primary-toned-200 rounded-lg">
			<h4 className="text-sm font-semibold text-primary-toned-800 mb-2">Tips:</h4>
			<ul className="text-sm text-primary-toned-700 space-y-1">
				<li>• Choose a clear, descriptive title that reflects the purpose of your test</li>
				<li>• Provide a detailed description to help candidates understand what the test covers</li>
				<li>• Select the appropriate language and seniority level to match your target audience</li>
				<li>• Consider the experience level you're testing for when setting the seniority level</li>
			</ul>
		</div>
	);
}
