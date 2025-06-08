import { useState } from 'react';
import NewLeftLayoutTemplate from '../../../../../components/layouts/NewLeftLayoutTemplate'
import AttemptsTab from './components/attempts-tab';
import Sidebar from './components/Sidebar';
import QuestionsTab from './components/questions-tab';
import ExamInformationTab from './components/exam-information-tab';
import { TabMode } from './type';
import ParticipantsTab from './components/participants-tab';
import useGetTestIdParams from '../../../../../infra-test/hooks/useGetTestIdParams';

export default function ManagerTestPage() {
	const testId = useGetTestIdParams();

	const [mode, setMode] = useState<TabMode>('info');

	const getTab = (mode: TabMode) => {
		switch (mode) {
			case 'info':
				return <ExamInformationTab
					testId={testId}
				/>;
			case 'questions':
				return <QuestionsTab
					testId={testId}
				/>;
			case 'attempts':
				return <AttemptsTab
					testId={testId}
				/>;
			case 'participants':
				return <ParticipantsTab
					testId={testId}
				/>;
		}
	}

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title="Exams Management"
					description="Manage all your exams."
				/>
			}
			left={<Sidebar
				testId={testId}
				onModeChange={(mode) => setMode(mode)}
				mode={mode}
			/>}
		>
			{getTab(mode)}
		</NewLeftLayoutTemplate>
	);
}

