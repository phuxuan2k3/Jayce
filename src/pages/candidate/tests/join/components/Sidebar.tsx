import { useNavigate } from 'react-router-dom';
import SidebarLayout from '../../../../../features/tests/ui/sidebar/SidebarLayout'
import QuickAction from '../../../../../features/tests/ui/sidebar/primitive/QuickAction'
import { JoinTabType } from '../types'
import { History, Earth, ClipboardList, ArrowLeft } from 'lucide-react'
import paths from '../../../../../router/paths';

export default function Sidebar({
	tab,
	onTabChange,
}: {
	tab: JoinTabType;
	onTabChange: (tab: JoinTabType) => void;
}) {
	const navigate = useNavigate();

	return (
		<SidebarLayout className='flex flex-col gap-4'>
			<QuickAction
				icon={<ClipboardList className='h-5 w-5' />}
				title='Ongoing Exams'
				description='View your ongoing exams'
				onClick={() => onTabChange('ONGOING')}
				active={tab === 'ONGOING'}
			/>

			<QuickAction
				icon={<Earth className='h-5 w-5' />}
				title='Public Exams'
				description='Join publicly available exams'
				onClick={() => onTabChange('PUBLIC')}
				active={tab === 'PUBLIC'}
			/>

			<QuickAction
				icon={<History className='h-5 w-5' />}
				title='Exam History'
				description='View your completed exams'
				onClick={() => onTabChange('HISTORY')}
				active={tab === 'HISTORY'}
			/>

			<QuickAction
				className='mt-auto'
				icon={<ArrowLeft className='h-5 w-5' />}
				title='Back to Tests'
				description='Return to the tests overview'
				onClick={() => navigate(paths.candidate.tests.ROOT)}
				variant={"alert"}
			/>

		</SidebarLayout>
	)
}
