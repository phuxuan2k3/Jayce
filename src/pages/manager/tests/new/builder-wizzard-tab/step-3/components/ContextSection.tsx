import { useState } from 'react';
import ContextTabs, { TabType } from './ContextTabs';
import TextContextTab from './TextContextTab';
import FilesContextTab from './FilesContextTab';
import LinksContextTab from './LinksContextTab';
import { BuilderStep3Type } from '../../../common/step-schema';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useLanguage } from '../../../../../../../LanguageProvider';

interface ContextSectionProps {
	context: BuilderStep3Type['context'];
	onContextChange: (field: keyof BuilderStep3Type['context'], value: any) => void;
}

export default function ContextSection({ context, onContextChange }: ContextSectionProps) {
	const { t } = useLanguage();

	const [activeTab, setActiveTab] = useState<TabType>('text');
	const [newLink, setNewLink] = useState('');

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		onContextChange("files", [...context.files, ...files]);
	};

	const handleFileRemove = (index: number) => {
		const updatedFiles = context.files.filter((_, i) => i !== index);
		onContextChange('files', updatedFiles);
	};

	const handleAddLink = () => {
		if (newLink.trim()) {
			if (z.string().url().safeParse(newLink).success === false) {
				toast.warning(t("context_section_invalid_url"));
				return;
			}

			onContextChange('links', [...context.links, newLink.trim()]);
			setNewLink('');
		}
	};

	const handleRemoveLink = (index: number) => {
		const updatedLinks = context.links.filter((_, i) => i !== index);
		onContextChange('links', updatedLinks);
	};

	return (
		<div className="mb-6">
			<h3 className="text-lg font-semibold text-primary mb-2">
				{t("context_section_title")}
			</h3>

			<ContextTabs
				activeTab={activeTab}
				onTabChange={setActiveTab}
				filesCount={context.files.length}
				linksCount={context.links.length}
			/>

			<div className="min-h-[200px] p-4 bg-gray-50 border border-gray-200 rounded-b-lg shadow-inner">
				{activeTab === 'text' && (
					<TextContextTab
						value={context.text}
						onChange={(value) => onContextChange('text', value)}
					/>
				)}

				{activeTab === 'files' && (
					<FilesContextTab
						files={context.files}
						onFileUpload={handleFileUpload}
						onFileRemove={handleFileRemove}
					/>
				)}

				{activeTab === 'links' && (
					<LinksContextTab
						links={context.links}
						newLink={newLink}
						onNewLinkChange={setNewLink}
						onAddLink={handleAddLink}
						onRemoveLink={handleRemoveLink}
					/>
				)}
			</div>
		</div>
	);
}
