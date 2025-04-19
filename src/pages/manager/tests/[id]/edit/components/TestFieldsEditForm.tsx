import { useTestPersistContext } from '../../../../../../features/tests/stores/test-persist.context';
import TestFieldsForm from '../../../create/Steps/Step1/TestFieldsForm';

export default function TestFieldsEditForm() {
	const {
		fields,
		dispatch
	} = useTestPersistContext();

	return (
		<TestFieldsForm
			onChange={({ key, value }) => dispatch({
				type: "UPDATE_TEST_FIELDS",
				payload: {
					[key]: value,
				}
			})}
			testFields={fields}
		/>
	)
}
