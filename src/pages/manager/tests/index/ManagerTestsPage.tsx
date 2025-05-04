import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeleteManagerTestsByTestIdMutation, useGetManagerTestsQuery } from "../../../../features/tests/api/test.api-gen";
import paths from "../../../../router/paths";
import CandidateTestsTemplate from "../../../../features/tests/ui/layouts/CandidateTestsTemplate";
import TestList from "./components/TestList";
import { FilterProps } from "../../../../features/tests/types/filter";

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
		<CandidateTestsTemplate
			header={{
				title: "Welcome to your Test Manager",
				description: "You can manage all your test here!",
			}}
			right={
				<div className="flex flex-col gap-4">
					<button
						className="w-full bg-primary text-white font-bold px-4 py-2 rounded-lg shadow-md hover:bg-primary-toned-800 transition-colors duration-200"
						onClick={handleClickCreateTest}
					>
						Create Test
					</button>
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
		</CandidateTestsTemplate>
	);
}

export default ManagerTestsPage