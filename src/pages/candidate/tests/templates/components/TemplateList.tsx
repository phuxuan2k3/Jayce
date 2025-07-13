import React from "react";
import { TemplateCoreSchema } from "../../../../../features/tests/api/test.api-gen-v2";
import TemplateCard from "../../../../../features/tests/ui-items/template/TemplateCard";
import ErrorCover from "../../../../../features/tests/ui/fetch-states/ErrorCover";
import LoadingCover from "../../../../../features/tests/ui/fetch-states/LoadingCover";
import NoDataAvailibleCover from "../../../../../features/tests/ui/fetch-states/NoDataAvailibleCover";
import MyPaginationSection from "../../../../../features/tests/ui-sections/MyPaginationSection";
import { useGetTemplatesQuery } from "../apis/template.api-enhance";
import { useLanguage } from "../../../../../LanguageProvider";

interface TemplateListProps {
	searchName: string;
	// difficultiesFilter?: string[];
	onSelect: (template: TemplateCoreSchema) => void;
	onDelete: (template: TemplateCoreSchema) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
	searchName,
	onSelect,
	onDelete,
	// difficultiesFilter,
}) => {
	const { t } = useLanguage();
	const [page, setPage] = React.useState(1);
	const { data: pagedTemplates, isSuccess, isLoading, error } = useGetTemplatesQuery({
		page: page,
		perPage: 10,
		search: searchName,
		// filterDifficulty: difficultiesFilter ? difficultiesFilter.length > 0 ? difficultiesFilter : undefined : undefined,
	});

	if (isLoading) return <LoadingCover />
	if (error) return <ErrorCover error={error} />;
	if (!isSuccess) return <NoDataAvailibleCover />;

	const { data: templates } = pagedTemplates;

	return (
		<div className="flex flex-col w-full h-full">
			{templates.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-2">
					{templates.map((template) => (
						<TemplateCard
							key={template.id}
							template={template}
							onClick={onSelect}
							onDelete={onDelete}
						/>
					))}
				</div>
			) : (
				<div className="h-full w-full flex items-center justify-center text-gray-500">
					{searchName ? t("template_list_no_match") : t("template_list_no_templates")}
				</div>
			)}

			<div className="mt-auto flex flex-col items-center border-t pt-4">
				<MyPaginationSection {...pagedTemplates} onPageChange={(page) => setPage(page)} />
			</div>
		</div>
	);
}

export default TemplateList;
