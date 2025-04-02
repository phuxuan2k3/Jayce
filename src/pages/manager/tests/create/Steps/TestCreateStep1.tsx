import TestFieldsEditForm from "../../common/TestFieldsEditForm";

export default function TestCreateStep1({
	onNext,
}: {
	onNext: () => void;
}) {
	return (
		<>
			<div className="font-arya text-[28px] font-bold text-center mt-10">
				First, let’s add some general fields about your new test...
			</div>

			<TestFieldsEditForm />

			<div className="pb-12 flex justify-center">
				<button className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " onClick={onNext}>
					Next
				</button>
			</div>
		</>
	)
};
