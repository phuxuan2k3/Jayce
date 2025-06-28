import React, { createContext, useContext } from "react";
import { TemplateCoreSchema } from "../../api/test.api-gen-v2";
import { Trash2 } from "lucide-react";

// Context for sharing template and handlers
interface TemplateCardContextProps {
	template: TemplateCoreSchema;
	onGenerate?: () => void;
	onDelete?: () => void;
}
const TemplateCardContext = createContext<TemplateCardContextProps | undefined>(undefined);

function useTemplateCardContext() {
	const ctx = useContext(TemplateCardContext);
	if (!ctx) throw new Error("TemplateCard subcomponent must be used within TemplateCard");
	return ctx;
}

// Header
const TemplateCardHeader: React.FC = () => {
	const { template, onDelete } = useTemplateCardContext();
	const difficultyColors: Record<string, string> = {
		easy: "bg-green-100 text-green-700",
		medium: "bg-yellow-100 text-yellow-700",
		hard: "bg-red-100 text-red-700",
	};
	const difficultyClass = difficultyColors[template.difficulty.toLowerCase().trim()] || "bg-gray-100 text-gray-700";
	return (
		<div className="flex flex-col gap-2 border-b border-primary-toned-200 pb-2">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<h3 className="font-bold text-lg">{template.name}</h3>
				</div>
				{onDelete && (
					<button
						onClick={e => {
							e.stopPropagation();
							onDelete();
						}}
						className="ml-2 p-1 rounded hover:bg-red-100 text-red-500"
						title="Delete"
					>
						<Trash2 size={18} />
					</button>
				)}
			</div>
			<span className={`w-fit text-xs px-2 py-1 rounded-full ${difficultyClass}`}>
				{template.difficulty}
			</span>
		</div>
	);
};

// Tags
const TemplateCardTags: React.FC = () => {
	const { template } = useTemplateCardContext();
	return (
		<div className="flex flex-wrap gap-1 mt-2">
			{template.tags.map(tag => (
				<span key={tag} className="text-xs bg-blue-chill-100 text-blue-chill-700 px-2 py-1 rounded-full">
					{tag}
				</span>
			))}
		</div>
	);
};

// Footer
const TemplateCardFooter: React.FC = () => {
	const { template, onGenerate } = useTemplateCardContext();
	return (
		<div className="flex justify-between items-center mt-4">
			<span className="text-sm text-primary-toned-500">
				{template.numberOfQuestions} questions • {template.numberOfOptions} options each
			</span>
			{onGenerate != null && (
				<button
					onClick={e => {
						e.stopPropagation();
						onGenerate();
					}}
					className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
				>
					Generate
				</button>
			)}
		</div>
	);
};

// Main Card
export type TemplateCardProps = {
	template: TemplateCoreSchema;
	onClick?: (template: TemplateCoreSchema) => void;
	onGenerate?: (template: TemplateCoreSchema) => void;
	onDelete?: (template: TemplateCoreSchema) => void;
};

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onGenerate, onClick, onDelete }) => (
	<TemplateCardContext.Provider value={{
		template,
		onGenerate: onGenerate ? () => onGenerate?.(template) : undefined,
		onDelete: onDelete ? () => onDelete?.(template) : undefined,
	}}>
		<div
			className="border border-primary-toned-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
			onClick={() => onClick?.(template)}
		>
			<TemplateCardHeader />
			<p className="text-primary-toned-600 text-sm mt-2">{template.title}</p>
			<TemplateCardTags />
			<TemplateCardFooter />
		</div>
	</TemplateCardContext.Provider>
);

export default TemplateCard;