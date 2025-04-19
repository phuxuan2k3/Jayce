import { useGetManagerTestsByTestIdQuestionsQuery, useGetTestsByTestIdQuery } from '../../../../../features/tests/api/test.api-gen';
import useGetTestIdParams from '../../../../../features/tests/hooks/useGetTestIdParams';
import { TestPersistProvider } from '../../../../../features/tests/stores/test-persist.context'
import { TestPersistState } from '../../../../../features/tests/stores/test-persist.reducer';
import ManagerTestEditMain from './ManagerTestEditMain'

export default function ManagerTestEditPage() {
	const testId = useGetTestIdParams();
	const { data: fields } = useGetTestsByTestIdQuery({ testId });
	const { data: questions } = useGetManagerTestsByTestIdQuestionsQuery({ testId });

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
