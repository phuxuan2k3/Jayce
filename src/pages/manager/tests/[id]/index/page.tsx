import { useState } from 'react';
import NewLeftLayoutTemplate from '../../../../../components/layouts/NewLeftLayoutTemplate'
import AttemptsTab from './components/attempts-tab';
import Sidebar from './components/Sidebar';
import { mockFullExamInformation } from './mockExamInformationData';
import QuestionsTab from './components/questions-tab';
import ExamInformationTab from './components/exam-information-tab';
import { TabMode } from './types/tab-mode';
import useGetTestIdParams from '../../../../../features/tests/hooks/useGetTestIdParams';
import { useAppDispatch } from '../../../../../app/hooks';
import dialogSlice from '../../../../../features/tests/stores/dialogSlice';

export default function ManagerTestPage() {
	const tesId = useGetTestIdParams();
	const dispatch = useAppDispatch();
	const [mode, setMode] = useState<TabMode>('info');

	const examInfo = mockFullExamInformation;

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title="Exams Management"
					description="Manage all your exams."
				/>
			}
			left={<Sidebar
				testId={tesId}
				onModeChange={(mode) => setMode(mode)}
				onDelete={() => dispatch(dialogSlice.actions.setDeleteExam(examInfo.exam))}
			/>}
		>
			{getTab(mode)}
		</NewLeftLayoutTemplate>
	);
}

const getTab = (mode: TabMode) => {
	switch (mode) {
		case 'info':
			return <ExamInformationTab {...mockFullExamInformation} />;
		case 'questions':
			return <QuestionsTab />;
		case 'attempts':
			return <AttemptsTab />;
	}
}