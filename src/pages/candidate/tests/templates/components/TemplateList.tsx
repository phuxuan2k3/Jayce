import React from "react";
import { TemplateCoreSchema } from "../../../../../features/tests/api/test.api-gen-v2";
import TemplateCard from "../../../../../features/tests/ui-items/template/TemplateCard";
import MyButton from "../../../../../features/tests/ui/buttons/MyButton";
import ErrorCover from "../../../../../features/tests/ui/fetch-states/ErrorCover";
import LoadingCover from "../../../../../features/tests/ui/fetch-states/LoadingCover";
import NoDataAvailibleCover from "../../../../../features/tests/ui/fetch-states/NoDataAvailibleCover";
import MyPaginationSection from "../../../../../features/tests/ui/sections/MyPaginationSection";
import { useGetTemplatesQuery } from "../apis/template.api-enhance";

interface TemplateListProps {
	searchName: string;
	onSelect: (template: TemplateCoreSchema) => void;
	onDelete: (template: TemplateCoreSchema) => void;
	onCreateNew: () => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
	searchName,
	onSelect,
	onDelete,
	onCreateNew,
}) => {
	const [page, setPage] = React.useState(1);
	const { data: pagedTemplates, isSuccess, isLoading, error } = useGetTemplatesQuery({
		page: page,
		perPage: 10,
		search: searchName,
	});

	if (isLoading) return <LoadingCover />
	if (error) return <ErrorCover error={error} />;
	if (!isSuccess) return <NoDataAvailibleCover />;

	const { data: templates } = pagedTemplates;

	return (
		<div className="flex flex-col gap-4 w-full h-full">
			<div className="flex justify-between items-center border-b pb-4 mb-4">
				<h3 className="text-lg font-semibold">Available Templates</h3>
				<MyButton onClick={onCreateNew}>Create New</MyButton>
			</div>

			{templates.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
					{searchName ? "No templates match your search" : "No templates available"}
				</div>
			)}

			<div className="mt-auto flex flex-col items-center border-t pt-4">
				<MyPaginationSection {...pagedTemplates} onPageChange={(page) => setPage(page)} />
			</div>
		</div>
	);
}

export default TemplateList;
