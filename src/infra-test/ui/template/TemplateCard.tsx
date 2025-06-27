import { TemplateCore } from "../../core/test.model";

type TemplateCardProps = {
	template: TemplateCore;
	onGenerate?: (templateId: string) => void;
};

const TemplateCard = ({ template, onGenerate }: TemplateCardProps) => (
	<div className="border border-primary-toned-300 rounded-lg p-4 hover:shadow-md transition-shadow">
		<div className="flex justify-between">
			<h3 className="font-bold text-lg">{template.title}</h3>
			<span className="text-sm bg-primary-toned-100 text-primary-toned-700 px-2 py-1 rounded-full">
				{template.difficulty}
			</span>
		</div>
		<p className="text-primary-toned-600 text-sm mt-2">{template.description}</p>

		<div className="flex flex-wrap gap-1 mt-2">
			{template.tags.map(tag => (
				<span key={tag} className="text-xs bg-blue-chill-100 text-blue-chill-700 px-2 py-1 rounded-full">
					{tag}
				</span>
			))}
		</div>

		<div className="flex justify-between items-center mt-4">
			<span className="text-sm text-primary-toned-500">
				{template.numberOfQuestions} questions • {template.numberOfOptions} options each
			</span>
			<button
				onClick={() => onGenerate?.(template.id)}
				className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
			>
				Generate
			</button>
		</div>
	</div>
);

export default TemplateCard;