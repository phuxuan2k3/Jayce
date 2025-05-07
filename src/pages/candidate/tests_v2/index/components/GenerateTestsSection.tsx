import { PromptTemplate } from "../../../../../features/tests/model/test/test-practice";
import TemplateCard from "./TemplateCard";

type GenerateTestsSectionProps = {
	templates: PromptTemplate[];
	onGenerateTest: (templateId: number) => void;
	onViewAllTemplates: () => void;
};

const GenerateTestsSection = ({
	templates,
	onGenerateTest,
	onViewAllTemplates
}: GenerateTestsSectionProps) => {
	return (
		<section className="border-b pb-6 border-primary-toned-200">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold">Generate Practice Tests</h2>
				<button
					onClick={onViewAllTemplates}
					className="text-primary underline text-sm"
				>
					View All Templates
				</button>
			</div>

			<p className="text-primary-toned-700 mb-4">Choose a template to generate a customized practice test using AI.</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{templates.map(template => (
					<TemplateCard
						key={template.id}
						template={template}
						onGenerate={onGenerateTest}
					/>
				))}
			</div>
		</section>
	);
};

export default GenerateTestsSection;