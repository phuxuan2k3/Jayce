import { useState } from 'react';
import Sidebar from './components/Sidebar';
import QuestionsTab from './components/questions-tab';
import ExamInformationTab from './components/exam-information-tab';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../router/paths';
import useGetTestIdParams from '../../../../../features/tests/hooks/useGetTestIdParams';
import AttemptsTab from '../../../../../features/tests/ui-shared/test-pages/attempts-tab';
import ParticipantsTab from '../../../../../features/tests/ui-shared/test-pages/participants-tab';
import RightLayoutTemplate from '../../../../../components/layouts/RightLayoutTemplate';
import FetchStateCover2 from '../../../../../features/tests/ui/fetch-states/FetchStateCover2';
import { useGetTestsByTestIdQuery } from '../../../../../features/tests/api/test.api-gen-v2';
import TitleSkeleton from '../../../../../features/tests/ui/skeletons/TitleSkeleton';

export type TabMode = 'info' | 'questions' | 'attempts' | 'participants';

export default function ManagerTestPage() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const testQuery = useGetTestsByTestIdQuery({ testId });

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
					onAttemptClick={(attempt) => navigate(paths.manager.tests.in(testId).attempts.in(attempt.id).ROOT)}
				/>;
			case 'participants':
				return <ParticipantsTab />;
		}
	}

	return (
		<RightLayoutTemplate
			header={
				<FetchStateCover2
					fetchState={testQuery}
					loadingComponent={<TitleSkeleton />}
					dataComponent={(data) => (
						<RightLayoutTemplate.Header
							title={data.title}
							description={data.description}
						/>
					)}
				/>

			}
			right={<Sidebar
				testId={testId}
				onModeChange={(mode) => setMode(mode)}
				mode={mode}
			/>}
		>
			{getTab(mode)}
		</RightLayoutTemplate>
	);
}

