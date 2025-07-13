import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../../../../../features/tests/ui/sidebar/SidebarLayout'
import QuickAction from '../../../../../features/tests/ui/sidebar/primitive/QuickAction'
import { JoinTabType } from '../types'
import { History, Earth, ClipboardList, ArrowLeft } from 'lucide-react'
import paths from '../../../../../router/paths';
import { useLanguage } from '../../../../../LanguageProvider';

export default function Sidebar({
	tab,
	onTabChange,
}: {
	tab: JoinTabType;
	onTabChange: (tab: JoinTabType) => void;
}) {
	const { t } = useLanguage();

	const navigate = useNavigate();

	return (
		<SidebarLayout className='flex flex-col gap-4'>
			<QuickAction
				icon={<ClipboardList className='h-5 w-5' />}
				title={t("sidebar_ongoing_title")}
				description={t("sidebar_ongoing_description")}
				onClick={() => onTabChange('ONGOING')}
				active={tab === 'ONGOING'}
			/>

			<QuickAction
				icon={<Earth className='h-5 w-5' />}
				title={t("sidebar_public_title")}
				description={t("sidebar_public_description")}
				onClick={() => onTabChange('PUBLIC')}
				active={tab === 'PUBLIC'}
			/>

			<QuickAction
				icon={<History className='h-5 w-5' />}
				title={t("sidebar_history_title")}
				description={t("sidebar_history_description")}
				onClick={() => onTabChange('HISTORY')}
				active={tab === 'HISTORY'}
			/>

			<QuickAction
				className='mt-auto'
				icon={<ArrowLeft className='h-5 w-5' />}
				title={t("sidebar_back_title")}
				description={t("sidebar_back_description")}
				onClick={() => navigate(paths.candidate.tests.ROOT)}
				variant={"alert"}
			/>

		</SidebarLayout>
	)
}
