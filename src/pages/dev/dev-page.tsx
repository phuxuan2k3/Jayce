import { MockTemplateCoreSchemaItems } from "../../infra-test/ui-items/template/template";
import TemplateCard from "../../infra-test/ui-items/template/TemplateCard";

export default function DevPage() {
	const template = MockTemplateCoreSchemaItems[0];
	return (<>
		<div className="container mx-auto p-4">
			<TemplateCard
				template={template}
				onGenerate={() => console.log("Generate template")}
				onDelete={() => console.log("Delete template")}
			/>
		</div>
	</>);
}
