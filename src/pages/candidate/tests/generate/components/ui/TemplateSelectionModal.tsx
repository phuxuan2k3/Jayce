import React, { useState } from 'react';
import { TemplateCore } from '../../../../../../features/tests/model/test.model';
import { XCircle, Settings, Search } from 'lucide-react';
import paths from '../../../../../../router/paths';
import { useNavigate } from 'react-router-dom';
import MyPagination from '../../../../../../components/ui/common/MyPagination';
import TemplateCard from '../../../templates/components/TemplateCard';
import { useGetTemplatesQuery } from '../../../../../../features/tests/api/test.api-gen';

type Filter = {
	searchName: string;
	page: number;
}

interface TemplateSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectTemplate: (template: TemplateCore) => void;
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

	const { data: pagedTemplates, isLoading } = useGetTemplatesQuery(filters);

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
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
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
					{isLoading === true ? (
						<div className="flex items-center justify-center h-full">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
						</div>
					) : pagedTemplates == null || pagedTemplates.data.length === 0 ? (
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
								{pagedTemplates.data.map((template) => (
									<TemplateCard
										key={template.id}
										data={template}
										onSelectTemplate={(template) => {
											onSelectTemplate(template);
											onClose();
										}}
									/>
								))}
							</div>
							{pagedTemplates.data.length > 0 && (
								<div className="flex justify-center mt-6">
									<MyPagination
										totalPage={pagedTemplates.totalPages}
										initialPage={filters.page}
										onPageChange={handlePageChange}
									/>
								</div>
							)}
						</>
					)}
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
		</div>
	);
};

export default TemplateSelectionModal;