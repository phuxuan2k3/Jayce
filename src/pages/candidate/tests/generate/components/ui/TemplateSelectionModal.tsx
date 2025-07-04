import React, { useState } from 'react';
import { XCircle, Settings } from 'lucide-react';
import paths from '../../../../../../router/paths';
import { useNavigate } from 'react-router-dom';
import { TemplateCoreSchema, useGetTemplatesQuery } from '../../../../../../features/tests/api/test.api-gen-v2';
import TemplateCard from '../../../../../../features/tests/ui-items/template/TemplateCard';
import MyDialog from '../../../../../../features/tests/ui/MyDialog';
import FetchStateCover2 from '../../../../../../features/tests/ui/fetch-states/FetchStateCover2';
import MyPaginationSection from '../../../../../../features/tests/ui-sections/MyPaginationSection';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import MyInputWithSearch from '../../../../../../features/tests/ui/forms/MyInputWithSearch';
import MyInput from '../../../../../../features/tests/ui/forms/MyInput';

type Filter = {
	searchName: string;
	page: number;
}

interface TemplateSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectTemplate: (template: TemplateCoreSchema) => void;
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
	isOpen,
	onClose,
	onSelectTemplate,
}) => {
	const navigate = useNavigate();
	const [filters, setFilters] = useState<Filter>({
		searchName: '',
		page: 1,
	});

	const templatesQuery = useGetTemplatesQuery(filters);

	if (!isOpen) return null;

	const handleManageTemplates = () => {
		onClose();
		navigate(paths.candidate.tests.TEMPLATES);
	};

	const handleSearch = (searchKey: string) => {
		setFilters({
			...filters,
			searchName: searchKey,
			page: 1, // Reset to first page when searching
		});
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch(e.currentTarget.value);
		}
	};

	const handlePageChange = (newPage: number) => {
		setFilters({
			...filters,
			page: newPage,
		});
	};

	return (
		<MyDialog>
			<div className="bg-white rounded-lg shadow-lg w-full max-w-[70vw] h-[90vh] flex flex-col p-4">
				<div className='flex flex-col w-full gap-6 p-4'>
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold text-primary">Choose a Template</h2>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700"
						>
							<XCircle size={24} />
						</button>
					</div>

					<div className='flex items-center gap-4'>
						<MyInputWithSearch
							className='flex-1'
							inputComponent={
								<MyInput
									type="text"
									placeholder="Search templates..."
									value={filters.searchName}
									onChange={(e) => handleSearch(e.target.value)}
									onKeyDown={handleKeyPress}
									className=""
								/>
							}
						/>
						<MyButton
							className='ml-auto'
							onClick={handleManageTemplates}
						>
							<Settings size={14} />
							Manage Templates
						</MyButton>
					</div>
				</div>


				<div className="p-4 overflow-y-auto flex-1 bg-gray-50 shadow-inner rounded-md mx-2">
					<FetchStateCover2
						fetchState={templatesQuery}
						dataComponent={({ data }) => (
							data.length === 0 ? (
								<div className="text-center py-8">
									<p className="text-gray-500 mb-4">No templates available</p>
									<button
										onClick={handleManageTemplates}
										className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-toned-700 inline-flex items-center gap-2"
									>
										<Settings size={16} />
										Manage Templates
									</button>
								</div>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{data.map((template) => (
										<TemplateCard
											key={template.id}
											template={template}
											onClick={() => {
												onSelectTemplate(template);
												onClose();
											}}
										/>
									))}
								</div>
							)
						)}
					/>
				</div>

				<MyPaginationSection
					onPageChange={handlePageChange}
					page={filters.page}
					perPage={6}
					total={templatesQuery?.data?.total}
					totalPages={templatesQuery?.data?.totalPages}
				/>
			</div>
		</MyDialog>
	);
};

export default TemplateSelectionModal;
