import { TemplateCore } from '../../../../../features/tests/model/test.model';

export default function TemplateCard({
	data,
	onSelectTemplate,
	onDeleteTemplate,
}: {
	data: TemplateCore;
	onSelectTemplate: (template: TemplateCore) => void;
	onDeleteTemplate?: (template: TemplateCore) => void;
}) {

	return (
		<div
			className="border border-primary-toned-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
			onClick={() => onSelectTemplate(data)}
		>
			<div className="flex items-start mb-2">
				<h3 className="font-semibold text-primary-toned-700">Template: {data.name}</h3>
				{onDeleteTemplate && <button
					onClick={(e) => {
						e.stopPropagation();
						onDeleteTemplate(data);
					}}
					className="ml-auto p-1 text-red-500 hover:text-red-700"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
					</svg>
				</button>}
			</div>
			<hr className="w-full border-primary-toned-200 my-2" />
			<h4 className="mb-2 text-primary text-lg">{data.title}</h4>
			<p className="text-sm text-gray-600 mb-2">{data.description}</p>
			<div className="flex items-center text-sm text-gray-500 mb-2 flex-wrap">
				<span className="mr-4">Questions: {data.numberOfQuestions}</span>
				<span>Difficulty: {data.difficulty}</span>
			</div>
			<div className="flex flex-wrap gap-1">
				{data.tags.map((tag, index) => (
					<span
						key={index}
						className="px-2 py-0.5 bg-primary-toned-100 text-primary-toned-800 rounded-full text-xs"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	)
}
