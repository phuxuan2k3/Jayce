import { ArrowDownToLine, Trash2 } from 'lucide-react';
import { EditTabs } from '../page';
import ManagerSidebar from '../../../../../../features/tests/ui-shared/sidebar/ManagerSidebar';
import QuickAction from '../../../../../../features/tests/ui/sidebar/primitive/QuickAction';
import SidebarLayout from '../../../../../../features/tests/ui/sidebar/SidebarLayout';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function Sidebar({
	tab,
	onModeChange,
	onSave,
	onDelete,
	hasAttempts,
}: {
	tab: EditTabs;
	onModeChange: (tab: EditTabs) => void;
	onSave: () => void;
	onDelete: () => void;
	hasAttempts: boolean;
}) {
	const { t } = useLanguage();

	return (
		<SidebarLayout className='min-h-[96vh]'>
			<ManagerSidebar.Info
				active={tab === "info"}
				onClick={() => onModeChange('info')}
			/>

			{hasAttempts === false ? (
				<ManagerSidebar.Questions
					active={tab === "questions"}
					onClick={() => onModeChange('questions')}
				/>
			) : (
				<div className="flex items-center gap-2 p-4 text-sm text-primary bg-primary-toned-50 rounded-md border border-primary-toned-200 shadow-md">
					<p>{t("exam_sidebar_attempts_warning")}</p>
				</div>
			)}

			<div className="mt-auto flex flex-col gap-4">
				<QuickAction
					icon={<ArrowDownToLine />}
					title={t("save_changes")}
					variant={"alert"}
					description={t("save_changes_description")}
					onClick={onSave}
				/>

				<QuickAction
					icon={<Trash2 />}
					title={t("delete_exam")}
					variant={"danger"}
					description={t("delete_exam_description")}
					onClick={onDelete}
				/>
			</div>
		</SidebarLayout>
	)
}
