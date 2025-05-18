import { useGetManagerTestsByTestIdQuestionsQuery, useGetTestsByTestIdQuery } from '../../../../../features/tests/legacy/test.api-gen';
import { TestPersistProvider } from '../../../../../features/tests/reducers/test-persist.context'
import { TestPersistState } from '../../../../../features/tests/reducers/test-persist.reducer';
import ManagerTestEditMain from './ManagerTestEditMain'

export default function ManagerTestEditPage() {
	const { data: fields } = useGetTestsByTestIdQuery({ testId: 1 });
	const { data: questions } = useGetManagerTestsByTestIdQuestionsQuery({ testId: 1 });

	if (!fields || !questions) {
		return null;
	}

	const initialState: TestPersistState = {
		data: {
			...fields,
			tagIds: fields.tags.map(tag => tag.id),
			difficulty: fields.difficulty as 'easy' | 'medium' | 'hard',
			questions: questions,
		},
		aiQuestionsThreshold: -1,
	};

	return (
		<TestPersistProvider
			initialState={initialState}
		>
			<ManagerTestEditMain />
		</TestPersistProvider>
	)
}
