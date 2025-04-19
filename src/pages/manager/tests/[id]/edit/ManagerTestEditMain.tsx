import { useState } from "react";
import EditTestQuestions from "./components/EditTestQuestions";
import { Snackbar, Alert } from "@mui/material";
import TestFieldsForm from "../../../../../features/tests/ui/TestFieldsForm";
import { useTestPersistContext } from "../../../../../features/tests/stores/test-persist.context";
import { Trash2 } from "lucide-react";
import { useDeleteManagerTestsByTestIdMutation } from "../../../../../features/tests/api/test.api-gen";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";

type Tab = "detail" | "questions";

// TODO: handle error and loading states properly
export default function ManagerTestEditMain() {
	const [tab, setTab] = useState<Tab>("detail");
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
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

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, snackOpen: false });
	};

	const { fields, dispatch } = useTestPersistContext();

	const [deleteTest] = useDeleteManagerTestsByTestIdMutation();
	const handleDeleteTest = async () => {
		try {
			const res = await deleteTest({ testId });
			if (res.error) {
				setSnackbar({
					snackOpen: true,
					snackMessage: "Failed to delete test",
					snackSeverity: "error"
				});
				return;
			}
			setSnackbar({
				snackOpen: true,
				snackMessage: "Test deleted successfully",
				snackSeverity: "success"
			});
			navigate(paths.manager.tests.SELF);
		} catch (error) {
			setSnackbar({
				snackOpen: true,
				snackMessage: "Failed to delete test",
				snackSeverity: "error"
			});
		}
	};

	return (
		<div className="w-full flex-1 flex flex-col mt-16 text-center">
			<div className="">
				<div className="text-3xl font-bold">Edit your test</div>
				<div className="text-xl font-semibold pb-10">Edit some information for your test</div>
			</div>

			<div className="flex flex-row justify-center items-center space-x-4 mb-6">
				<TabButton
					onClick={() => setTab("detail")}
					isActive={tab === "detail"}
					label="Details"
				/>
				<TabButton
					onClick={() => setTab("questions")}
					isActive={tab === "questions"}
					label="Questions"
				/>
				<button
					className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg"
					onClick={handleDeleteTest}>
					<Trash2 className="inline mr-2" size={20} /> Delete Test
				</button>
			</div>

			<div className="w-full flex-1 flex flex-col items-center">
				{tab === "detail" && (
					<TestFieldsForm
						onChange={({ key, value }) => dispatch({
							type: "UPDATE_TEST_FIELDS",
							payload: {
								[key]: value,
							}
						})}
						testFields={fields}
					/>
				)}
				{tab === "questions" && <EditTestQuestions />}
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

function TabButton({
	onClick,
	isActive,
	label,
}: {
	onClick: () => void;
	isActive: boolean;
	label: string;
}) {
	return (
		<button
			className={`font-semibold py-2 px-4 rounded-lg ${isActive ? "bg-primary text-white " : "bg-white text-primary border-primary border"} `}
			onClick={onClick}
		>
			{label}
		</button>
	);
}