import React, { createContext, useContext } from "react";
import { TemplateCoreSchema } from "../../api/test.api-gen-v2";
import {
	Trash2,
	Clock,
	Calendar,
	Globe,
	Tag,
	ListChecks,
	LayoutTemplate,
	ChevronRight
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { DifficultyType } from "../../../../pages/manager/tests/new/common/base-schema";
import { cn } from "../../../../app/cn";
import { useLanguage } from "../../../../LanguageProvider";
import MyButton from "../../ui/buttons/MyButton";

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

const DifficultyColors: Record<DifficultyType, string> = {
	Intern: cn("bg-green-100 text-green-700"),
	Junior: cn("bg-yellow-100 text-yellow-700"),
	Middle: cn("bg-orange-100 text-orange-700"),
	Senior: cn("bg-red-100 text-red-700"),
	Lead: cn("bg-purple-100 text-purple-700"),
	Expert: cn("bg-blue-100 text-blue-700"),
};

// Header
const TemplateCardHeader: React.FC = () => {
	const { t } = useLanguage();

	const { template, onDelete } = useTemplateCardContext();

	const lastUpdated = new Date(template.updatedAt);
	const timeAgo = formatDistanceToNow(lastUpdated, { addSuffix: true });

	return (
		<div className="flex flex-col gap-2 rounded-t-lg bg-primary-toned-50 pl-4 pr-4 py-4 border-b border-primary-toned-200">
			<div className="flex justify-between items-center">
				<div className="flex flex-col items-start gap-1">
					<div className="flex items-center gap-2">
						<LayoutTemplate
							size={20}
							className="text-primary-toned-700"
							strokeWidth={2.5}
						/>
						<h3 className="font-bold text-lg text-primary-toned-700">{template.name.trim() === "" ? (
							<span className="text-gray-400 italic">{t("no_name_provided")}</span>
						) : template.name}</h3>
					</div>

					<div className="flex text-primary items-center justify-end text-xs">
						<Calendar size={12} className="mr-1" />
						{t("last_updated")}: {timeAgo}
					</div>
				</div>

				{onDelete != null && (
					<button
						onClick={e => {
							e.stopPropagation();
							onDelete();
						}}
						className="ml-2 p-2 rounded-full hover:bg-red-100 text-red-500"
						title="Delete"
					>
						<Trash2 size={18} />
					</button>
				)}
			</div>
		</div>
	);
};

// Tags and content section
const TemplateCardContent: React.FC = () => {
	const { t } = useLanguage();

	const { template } = useTemplateCardContext();
	const difficultyClass = DifficultyColors[template.difficulty as DifficultyType] || "bg-gray-100 text-gray-700";

	return (
		<div className="flex flex-col gap-2 p-4">
			{/* Title and Description */}
			<div className="flex flex-col gap-1">
				<div className="flex items-center justify-between">
					<h4 className="text-primary-toned-800 font-semibold">{template.title}</h4>
					<Bandage className={cn(difficultyClass)}>
						<ListChecks size={14} />
						{template.difficulty}
					</Bandage>
				</div>
				<p className="text-primary text-sm line-clamp-2">{template.description}</p>
			</div>

			<div className="flex flex-wrap items-center gap-2 mt-2">
				<Bandage className="bg-primary-toned-100 text-primary-toned-700">
					<Clock size={14} />
					{template.minutesToAnswer} {t("minutes")}
				</Bandage>

				<Bandage className="bg-primary-toned-100 text-primary-toned-700">
					<Globe size={14} />
					{template.language}
				</Bandage>
			</div>
		</div>
	);
};

// Footer
const TemplateCardFooter: React.FC = () => {
	const { t } = useLanguage();

	const { template, onGenerate } = useTemplateCardContext();
	return (
		<div className="flex justify-between items-center px-4 py-2 border-t border-primary-toned-200">
			{template.tags && template.tags.length > 0 && (
				<div className="flex items-baseline gap-2 text-primary-toned-600 text-sm">
					<span>{t("tags_label")}:</span>
					<div className="flex flex-wrap gap-1">
						{template.tags.map(tag => (
							<span key={tag} className="flex items-center gap-1 text-xs bg-blue-chill-100 text-blue-chill-700 px-2 py-1 rounded-full">
								<Tag size={10} />
								{tag}
							</span>
						))}
					</div>
				</div>
			)}

			{onGenerate != null && (
				<MyButton
					size={"small"}
					onClick={e => {
						e.stopPropagation();
						onGenerate();
					}}
					className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
				>
					{t("generate_button")}
					<ChevronRight size={14} />
				</MyButton>
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
			className="border-l-4 border-l-blue-chill-500 border border-primary-toned-300 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-primary hover:-translate-y-1 transition-all flex flex-col justify-between"
			onClick={() => onClick?.(template)}
		>
			<TemplateCardHeader />
			<div className="flex-1">
				<TemplateCardContent />
			</div>
			<TemplateCardFooter />
		</div>
	</TemplateCardContext.Provider>
);

export default TemplateCard;

const Bandage = ({
	className = '',
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<span className={cn("flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full", className)}>
			{children}
		</span>
	);
}

