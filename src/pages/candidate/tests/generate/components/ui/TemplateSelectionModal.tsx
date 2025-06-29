import React, { useState } from 'react';
import { XCircle, Settings, Search } from 'lucide-react';
import paths from '../../../../../../router/paths';
import { useNavigate } from 'react-router-dom';
import { TemplateCoreSchema, useGetTemplatesQuery } from '../../../../../../features/tests/api/test.api-gen-v2';
import TemplateCard from '../../../../../../features/tests/ui-items/template/TemplateCard';
import MyDialog from '../../../../../../features/tests/ui/MyDialog';
import FetchStateCover2 from '../../../../../../features/tests/ui/fetch-states/FetchStateCover2';
import MyPaginationSection from '../../../../../../features/tests/ui/sections/MyPaginationSection';

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
			<div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl font-bold text-primary">Choose a Template</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<XCircle size={24} />
					</button>
				</div>

				<div className="p-4 overflow-y-auto flex-1">
					<FetchStateCover2
						fetchState={templatesQuery}
						dataComponent={({ data, total, perPage, totalPages }) => (
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
								<>
									<div className="flex justify-between items-center mb-4">
										<span className="text-sm text-gray-600">Select a template to use as a starting point</span>
										<button
											onClick={handleManageTemplates}
											className="px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary-toned-700 inline-flex items-center gap-1 text-sm"
										>
											<Settings size={14} />
											Manage Templates
										</button>
									</div>
									<div className="mb-4">
										<div className="relative">
											<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
											<input
												type="text"
												value={filters.searchName}
												onChange={(e) => handleSearch(e.target.value)}
												onKeyDown={handleKeyPress}
												className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
												placeholder="Search templates..."
											/>
										</div>
									</div>
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

									<MyPaginationSection
										onPageChange={handlePageChange}
										page={filters.page}
										perPage={perPage}
										total={total}
										totalPages={totalPages}
									/>
								</>
							)
						)}
					/>
				</div>

				<div className="p-4 border-t flex justify-between">
					<button
						onClick={handleManageTemplates}
						className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary-toned-50 inline-flex items-center gap-2"
					>
						<Settings size={16} />
						Manage All Templates
					</button>
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
					>
						Cancel
					</button>
				</div>
			</div>
		</MyDialog>
	);
};

export default TemplateSelectionModal;