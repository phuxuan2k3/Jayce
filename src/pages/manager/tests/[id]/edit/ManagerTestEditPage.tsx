import { useEffect, useState } from "react";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import EditTestQuestions from "./EditTestQuestions";
import { useGetTestsByTestIdQuery, useGetTestsByTestIdQuestionsQuery } from "../../../../../features/tests/api/test.api-gen";
import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch } from "../../../../../app/hooks";
import { toErrorMessage } from "../../../../../helpers/fetchBaseQuery.error";
import { testPersistActions } from "../../../../../features/tests/stores/testPersistSlice";
import TestFieldsEditForm from "../../common/TestFieldsEditForm";

type Tab = "detail" | "questions";

// TODO: handle error and loading states properly

export default function ManagerTestEditPage() {
	const testId = useGetTestIdParams();
	const [tab, setTab] = useState<Tab>("detail");
	const [snackbar, setSnackbar] = useState<{
		snackOpen: boolean;
		snackMessage: string;
		snackSeverity: 'error' | 'info' | 'success' | 'warning'
	}>({
		snackOpen: false,
		snackMessage: '',
		snackSeverity: 'info'
	});
	const { snackOpen, snackMessage, snackSeverity } = snackbar;

	const dispatch = useAppDispatch();
	const {
		loadUpdate,
	} = testPersistActions;

	const testQuery = useGetTestsByTestIdQuery({ testId });
	const questionsQuery = useGetTestsByTestIdQuestionsQuery({ testId });

	useEffect(() => {
		if (!testQuery.data || !questionsQuery.data) return;
		dispatch(loadUpdate({
			testQueryData: testQuery.data,
			questionsQueryData: questionsQuery.data,
		}));
	}, [testQuery.data, questionsQuery.data, dispatch]);


	if (testQuery.isLoading || questionsQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (testQuery.error || questionsQuery.error) {
		throw new Error(`Error fetching test data: ${toErrorMessage(testQuery.error)} ${toErrorMessage(questionsQuery.error)}`);
	}

	if (!testQuery.data || !questionsQuery.data) {
		return null;
	}


	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, snackOpen: false });
	};

	return (
		<div>
			<div className="w-full flex-1 flex-col mt-6 ml-16 text-center">
				<div className="w-full text-4xl font-bold">Edit your test</div>
				<div className="w-full text-xl font-semibold pb-10">Edit some information for your test</div>
			</div>

			<div className="tabs">
				<button
					className={`tab ${tab === "detail" ? "active" : ""}`}
					onClick={() => setTab("detail")}
				>
					General
				</button>
				<button
					className={`tab ${tab === "questions" ? "active" : ""}`}
					onClick={() => setTab("questions")}
				>
					Questions
				</button>
			</div>
			<div className="tab-content">
				{componentFromTab(tab)}
			</div>

			<Snackbar
				open={snackOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackSeverity}>
					{snackMessage}
				</Alert>
			</Snackbar>
		</div>
	);
}


const componentFromTab = (tab: Tab) => {
	switch (tab) {
		case "detail":
			return (
				<div className="w-full max-w-7xl py-6 pt-10 space-y-6">
					<TestFieldsEditForm />
				</div>
			);
		case "questions":
			return <EditTestQuestions />;
	}
}