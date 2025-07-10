import { ArrowDownToLine, Trash2 } from 'lucide-react';
import { EditTabs } from '../page';
import ManagerSidebar from '../../../../../../features/tests/ui-shared/sidebar/ManagerSidebar';
import QuickAction from '../../../../../../features/tests/ui/sidebar/primitive/QuickAction';
import SidebarLayout from '../../../../../../features/tests/ui/sidebar/SidebarLayout';
import useGetTestIdParams from '../../../../../../features/tests/hooks/useGetTestIdParams';
import { useGetTestsByTestIdAttemptsQuery } from '../../../../../../features/tests/api/test.api-gen-v2';
import FetchStateCover2 from '../../../../../../features/tests/ui/fetch-states/FetchStateCover2';

export default function Sidebar({
	tab,
	onModeChange,
	onSave,
	onDelete,
}: {
	tab: EditTabs;
	onModeChange: (tab: EditTabs) => void;
	onSave: () => void;
	onDelete: () => void;
}) {
	const testId = useGetTestIdParams();
	const attemptsQuery = useGetTestsByTestIdAttemptsQuery({ testId });

	return (
		<SidebarLayout className='min-h-[96vh]'>
			<ManagerSidebar.Info
				active={tab === "info"}
				onClick={() => onModeChange('info')}
			/>

			<FetchStateCover2
				fetchState={attemptsQuery}
				dataComponent={({ total }) => total === 0 ? (
					<ManagerSidebar.Questions
						active={tab === "questions"}
						onClick={() => onModeChange('questions')}
					/>
				) : (
					<div className="flex items-center gap-2 p-4 text-sm text-primary bg-primary-toned-50 rounded-md border border-primary-toned-200 shadow-md">
						<p>You cannot modify exam's questions after attempts have been made</p>
					</div>
				)}
			/>

			<div className="mt-auto flex flex-col gap-4">
				<QuickAction
					icon={<ArrowDownToLine />}
					title='Save'
					variant={"alert"}
					description='Save changes to the exam'
					onClick={onSave}
				/>

				<QuickAction
					icon={<Trash2 />}
					title='Delete Exam'
					variant={"danger"}
					description='Remove this exam permanently'
					onClick={onDelete}
				/>
			</div>
		</SidebarLayout>
	)
}
