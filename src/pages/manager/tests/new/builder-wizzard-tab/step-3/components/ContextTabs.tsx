import { cn } from "../../../../../../../app/cn";

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
	const tabButtonClass = (isActive: boolean) =>
		cn(
			'px-4 py-2 font-medium text-sm rounded-t-lg transition-colors',
			isActive
				? 'bg-primary text-white border-b-2 border-primary'
				: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
		);

	return (
		<div className="flex border-b border-gray-200 mb-4">
			<button
				type="button"
				onClick={() => onTabChange('text')}
				className={tabButtonClass(activeTab === 'text')}
			>
				Text
			</button>
			<button
				type="button"
				onClick={() => onTabChange('files')}
				className={tabButtonClass(activeTab === 'files')}
			>
				Files ({filesCount})
			</button>
			<button
				type="button"
				onClick={() => onTabChange('links')}
				className={tabButtonClass(activeTab === 'links')}
			>
				Links ({linksCount})
			</button>
		</div>
	);
}
