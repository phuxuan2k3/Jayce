import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeleteManagerTestsByTestIdMutation, useGetManagerTestsQuery } from "../../../../features/tests/legacy/test.api-gen";
import paths from "../../../../router/paths";
import TestList from "./components/TestList";
import { FilterProps } from "../../../../features/tests/types/filter";
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import CommonButton from "../../../../components/ui/CommonButton";

const ManagerTestsPage = () => {
	const navigate = useNavigate();

	const [filter, setFilter] = useState<FilterProps>({
		page: 1,
		perPage: 10,
	});

	const [deleteTest] = useDeleteManagerTestsByTestIdMutation();
	const { data: tests } = useGetManagerTestsQuery({
		...filter,
	}, {
		refetchOnMountOrArgChange: true
	});

	if (!tests) return null;

	const handleClickEditTest = (testId: number) => {
		navigate(paths.manager.tests.in(testId).EDIT);
	};

	const handleClickDeleteTest = (testId: number) => {
		deleteTest({ testId });
	};

	const handleClickCreateTest = () => {
		navigate(paths.manager.tests.CREATE);
	};

	const handleTestSubmissionsView = (testId: number) => {
		navigate(paths.manager.tests.in(testId).ATTEMPTS);
	};

	return (
		<LeftLayoutTemplate
			header={{
				title: "Welcome to your Test Manager",
				description: "You can manage all your test here!",
			}}
			left={
				<div className="lg:sticky lg:top-[2vh] flex flex-col gap-4 shadow-primary rounded-lg p-4 bg-white">
					<div className="flex flex-col gap-2 mb-4">
						<h2 className="text-lg font-bold">Actions</h2>
						<p className="text-sm text-primary-toned-500">You can create, edit or delete your tests.</p>
					</div>
					<CommonButton
						variant="secondary"
					>
						Avtive Tests
					</CommonButton>
					<CommonButton
						onClick={handleClickCreateTest}
					>
						Create Test
					</CommonButton>
				</div>
			}
		>
			<TestList
				tests={tests}
				totalPages={tests?.totalPages || 0}
				onEdit={handleClickEditTest}
				onDelete={handleClickDeleteTest}
				onViewSubmissions={handleTestSubmissionsView}
				onPageChange={(page) => {
					setFilter((prev) => ({
						...prev,
						page,
					}));
				}}
			/>
		</LeftLayoutTemplate>
	);
}

export default ManagerTestsPage