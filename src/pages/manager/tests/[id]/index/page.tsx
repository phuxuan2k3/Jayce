import { useState } from 'react';
import NewLeftLayoutTemplate from '../../../../../components/layouts/NewLeftLayoutTemplate'
import AttemptsTab from './components/attempts-tab';
import Sidebar from './components/Sidebar';
import QuestionsTab from './components/questions-tab';
import ExamInformationTab from './components/exam-information-tab';
import { TabMode } from './type';
import { useAppDispatch } from '../../../../../app/hooks';
import deleteExamSlice from '../../../../../infra-test/stores/deleteExamSlice';
import ParticipantsTab from './components/participants-tab';
import { useGetExamsByTestIdQuery } from '../../../../../features/tests/api/test.api-gen';
import useGetTestIdParams from '../../../../../infra-test/hooks/useGetTestIdParams';

export default function ManagerTestPage() {
	const testId = useGetTestIdParams();
	const dispatch = useAppDispatch();

	const [mode, setMode] = useState<TabMode>('info');
	const examQuery = useGetExamsByTestIdQuery({ testId });
	const exam = examQuery.data;

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
				onDelete={() => {
					if (exam == null) return;
					dispatch(deleteExamSlice.actions.setDeleteExam(exam))
				}}
			/>}
		>
			{getTab(mode)}
		</NewLeftLayoutTemplate>
	);
}

