import { useState } from 'react';
import NewLeftLayoutTemplate from '../../../../../components/layouts/NewLeftLayoutTemplate'
import AttemptsTab from './components/attempts-tab';
import Sidebar from './components/Sidebar';
import { mockFullExamInformation } from './mockExamInformationData';
import QuestionsTab from './components/questions-tab';
import ExamInformationTab from './components/exam-information-tab';
import { TabMode } from './types/tab-mode';

export default function ManagerTestPage() {
	const [mode, setMode] = useState<TabMode>('info');

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title="Exams Management"
					description="Manage all your exams."
				/>
			}
			left={<Sidebar
				onModeChange={(mode) => setMode(mode)}
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