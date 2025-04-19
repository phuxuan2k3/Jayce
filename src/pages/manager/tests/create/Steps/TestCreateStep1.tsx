import TestFieldsForm from "./Step1/TestFieldsForm";
import { useTestCreateTab } from "../contexts/test-create-tab.context";
import { useTestPersistContext } from "../../../../../features/tests/stores/test-persist.context";

export default function TestCreateStep1() {
	const {
		fields,
		dispatch,
	} = useTestPersistContext();
	const { setActiveTab } = useTestCreateTab();

	return (
		<div className="flex flex-col items-center justify-center w-full min-h-screen">
			<div className="font-arya text-[28px] font-bold text-center mt-10">
				First, let’s add some general fields about your new test...
			</div>

			<TestFieldsForm
				testFields={fields}
				onChange={(field) => dispatch({
					type: "UPDATE_TEST_FIELDS",
					payload: {
						...fields,
						[field.key]: field.value,
					},
				})}
			/>

			<div className="pb-12 flex justify-center">
				<button className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " onClick={() => setActiveTab(1)}>
					Next
				</button>
			</div>
		</div>
	)
};
