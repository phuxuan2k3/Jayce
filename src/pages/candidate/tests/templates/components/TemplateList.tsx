import React from "react";
import { TemplateCoreSchema, useGetTemplatesQuery } from "../../../../../infra-test/api/test.api-gen-v2";
import TemplateCard from "../../../../../infra-test/ui-items/template/TemplateCard";
import LoadingCover from "../../../../../infra-test/ui-items/fetch-states/LoadingCover";
import ErrorCover from "../../../../../infra-test/ui-items/fetch-states/ErrorCover";
import NotAvailible from "../../../../../infra-test/ui-items/fetch-states/NotAvailible";
import MyPagination from "../../../../../components/ui/common/MyPagination";

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
	if (!isSuccess) return <NotAvailible />;

	const { data: templates, totalPages, total } = pagedTemplates;

	return (
		<div className="flex flex-col gap-4 w-full h-full">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Available Templates</h3>
				<button
					onClick={onCreateNew}
					className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
				>
					Create New
				</button>
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
				<div className="text-center py-8 text-gray-500">
					{searchName ? "No templates match your search" : "No templates available"}
				</div>
			)}

			<div className="mt-auto flex flex-col items-center border-t pt-4">
				<MyPagination totalPage={totalPages} initialPage={page} onPageChange={(page) => setPage(page)} />

				<span className="text-sm text-gray-500 mt-4 italic w-full">
					Showing {templates.length} of {total} templates
				</span>
			</div>
		</div>
	);
}

export default TemplateList;
