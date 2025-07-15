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
import { LanguageTranslations, useLanguage } from '../../../../../../LanguageProvider';
import { useDebounce } from '../../../../../../components/hooks/useDebounce';

interface TemplateSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectTemplate: (template: TemplateCoreSchema) => void;
}

const Language: LanguageTranslations = {
	en: {
		no_template_available: "No templates available",
		no_template_found: "No templates found",
	},
	vi: {
		no_template_available: "Không có mẫu nào",
		no_template_found: "Không tìm thấy mẫu nào",
	},
} as const;

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
	isOpen,
	onClose,
	onSelectTemplate,
}) => {
	const { t, tTranslation } = useLanguage();
	const tLocal = (key: string) => tTranslation(key, Language);
	const [search, setSearch] = useState<string>('');
	const [page, setPage] = useState<number>(1);

	const searchKey = useDebounce(search, 500);

	const navigate = useNavigate();

	const templatesQuery = useGetTemplatesQuery({
		search: searchKey,
		page,
	});

	if (!isOpen) return null;

	const handleManageTemplates = () => {
		onClose();
		navigate(paths.candidate.tests.TEMPLATES);
	};

	const handleSearch = (searchKey: string) => {
		setSearch(searchKey);
		setPage(1);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch(e.currentTarget.value);
		}
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<MyDialog>
			<MyDialog.Content className='w-[70vw] h-[90vh]'>
				<div className='flex flex-col w-full gap-6 p-4'>
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold text-primary">{t("template_modal_title")}</h2>
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
									placeholder={t("template_modal_search_placeholder")}
									value={search}
									onChange={(e) => handleSearch(e.target.value)}
									onKeyDown={handleKeyPress}
								/>
							}
						/>
						<MyButton
							className='ml-auto'
							onClick={handleManageTemplates}
						>
							<Settings size={14} />
							{t("template_modal_manage_button")}
						</MyButton>
					</div>
				</div>


				<div className="p-4 overflow-y-auto flex-1 bg-gray-50 shadow-inner rounded-md mx-2">
					<FetchStateCover2
						fetchState={templatesQuery}
						dataComponent={({ data }) => (
							data.length === 0 ? (
								<div className="flex flex-col items-center justify-center h-full">
									{searchKey === '' ? (
										<p className="text-gray-500 mb-4">{tLocal("no_template_available")}</p>
									) : (
										<p className="text-gray-500 mb-4">{tLocal("no_template_found")}</p>
									)}
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
					page={page}
					perPage={6}
					total={templatesQuery?.data?.total}
					totalPages={templatesQuery?.data?.totalPages}
				/>
			</MyDialog.Content>
		</MyDialog>
	);
};

export default TemplateSelectionModal;
