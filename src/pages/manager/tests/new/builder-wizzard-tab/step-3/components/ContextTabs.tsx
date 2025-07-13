import { cn } from "../../../../../../../app/cn";
import { useLanguage } from "../../../../../../../LanguageProvider";

export type TabType = 'text' | 'files' | 'links';

interface ContextTabsProps {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
	filesCount: number;
	linksCount: number;
}

export default function ContextTabs({
	activeTab,
	onTabChange,
	filesCount,
	linksCount
}: ContextTabsProps) {
	const { t } = useLanguage();
	
	const tabButtonClass = (isActive: boolean) =>
		cn(
			'px-4 py-2 text-sm rounded-t-lg transition-colors font-semibold',
			isActive
				? 'bg-primary text-white border-b-2 border-primary'
				: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
		);

	return (
		<div className="flex border-b border-gray-200">
			<button
				type="button"
				onClick={() => onTabChange('text')}
				className={tabButtonClass(activeTab === 'text')}
			>
				{t("context_tab_text")}
			</button>
			<button
				type="button"
				onClick={() => onTabChange('files')}
				className={tabButtonClass(activeTab === 'files')}
			>
				{t("context_tab_files")} ({filesCount})
			</button>
			<button
				type="button"
				onClick={() => onTabChange('links')}
				className={tabButtonClass(activeTab === 'links')}
			>
				{t("context_tab_links")} ({linksCount})
			</button>
		</div>
	);
}
